"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Alert, Button, Card } from "@/presentation/components/ui";
import { CardTitle, CardContent } from "@/presentation/components/ui";
import { CardHeader, CardFooter } from "@/presentation/components/ui";
import {
  AlertDescription,
  CardDescription,
} from "@/presentation/components/ui";
import { Form, FormInput } from "@/presentation/components/ui/form";
import { signupUser } from "@/application/use-cases/auth/signup";
import { AppDispatch } from "@/application/state/store";
import { handleError } from "@/application/helpers/error-utils";

const formSchema = z
  .object({
    first_name: z.string().min(2, { message: "Your first name is too short" }),
    last_name: z.string().min(2, { message: "Your last name is too short" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export default function SignupPage() {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      await dispatch(
        signupUser(
          values.first_name,
          values.last_name,
          "",
          values.email,
          values.password,
        ),
      );

      router.push("/");
    } catch (err: unknown) {
      const errMsg = handleError(err, {
        tags: { component: "Contribution", action: "submit" },
        userMessage:
          "Failed to signup. Please check your credentials and try again.",
      });
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center p-4 pt-8 pb-20">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center py-8">
              <div className="animate-pulse">Loading...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 pt-8 pb-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your details to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                <FormInput
                  control={form.control}
                  name="first_name"
                  label="First Name"
                  placeholder="Oyonde"
                />
                <FormInput
                  control={form.control}
                  name="last_name"
                  label="Last Name"
                  placeholder="Obande"
                />
              </div>

              <FormInput
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="oyonde@obande.com"
                type="email"
              />

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                <FormInput
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                />
                <FormInput
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>

              <div className="pt-5">
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account ..." : "Create Your Account"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Just Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
