import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { InputError } from "@/components/shared";
import { Button, Input, Label } from "@/components/ui";
import { AuthLayout } from "@/layouts/auth-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui";
import type { LoginFormValues } from "@/types";
import { useLogin } from "@/api/auth/use-login";
import { useEffect } from "react";

export function Login() {
  const { handleLogin, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    handleLogin(data);
  };

  useEffect(() => {
    if (error) {
      console.error("Login error:", error.message);
    }
  }, [error]);
  return (
    <AuthLayout>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email and password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="loginForm"
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  autoFocus
                  tabIndex={1}
                  {...register("email", { required: "Email is required" })}
                />

                <InputError message={errors.email?.message} />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  tabIndex={2}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <InputError message={errors.password?.message} />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            type="submit"
            form="loginForm"
            className="w-full"
            tabIndex={3}
            // loading={isPending}
          >
            Log in
          </Button>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
