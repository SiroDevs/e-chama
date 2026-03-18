"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/presentation/components/ui";
import { Input, Form, FormField } from "@/presentation/components/ui/inputs";
import {
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/components/ui/inputs";
import { Card, CardTitle, CardContent } from "@/presentation/components/ui";
import { Alert, CardFooter } from "@/presentation/components/ui";
import { AlertDescription } from "@/presentation/components/ui";
import { CardHeader, CardDescription } from "@/presentation/components/ui";
import { signinUser } from "@/application/use-cases/auth/signin";
import { AppDispatch } from "@/application/state/store";
import { useToast } from "@/presentation/components/ui/use-toast";
import LoadingSpinner from "@/presentation/components/ui/states/loading-spinner";
import { handleError } from "@/application/helpers/error-utils";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password is required" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SigninPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      setError(null);

      const signedUser = signinUser(values.email, values.password);
      await dispatch(signedUser);

      router.push("/");
      toast({
        title: "Welcome on board!",
      });
    } catch (err: unknown) {
      const errMsg = handleError(err, {
        tags: { component: "Signin", action: "submit" },
        userMessage:
          "Failed to signin. Please check your credentials and try again.",
      });
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 pt-8 pb-20">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <Input placeholder="email@example.com" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Create your account
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
