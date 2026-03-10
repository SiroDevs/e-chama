"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form, FormInput } from "@/presentation/components/ui";
import { newMemberSchema } from "./arrays";
import { SaveIcon, XIcon } from "lucide-react";

export type FormValues = z.infer<typeof newMemberSchema>;

interface NewMemberFormProps {
  onSubmit: (values: FormValues) => Promise<void> | void;
  isLoading?: boolean;
}

export default function NewMemberForm({
  onSubmit,
  isLoading = false,
}: NewMemberFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(newMemberSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
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
        </div>

        <div className="flex flex-row gap-1 ml-auto flex-shrink-0 mt-5">
          <div className="flex flex-row items-center gap-3">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              <XIcon />
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isLoading}
            >
              <SaveIcon />
              Save Member
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
