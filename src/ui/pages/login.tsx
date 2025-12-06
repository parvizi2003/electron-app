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
import { useTranslation } from "react-i18next";

export function Login() {
  const { handleLogin, isPending, error } = useLogin();
  const { t } = useTranslation();

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
          <CardTitle>{t("login.title")}</CardTitle>
          <CardDescription>{t("login.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="loginForm"
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="email">{t("login.email.label")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("login.email.placeholder")}
                  autoFocus
                  tabIndex={1}
                  {...register("email", {
                    required: t("login.email.required"),
                  })}
                />

                <InputError message={errors.email?.message} />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="password">{t("login.password.label")}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t("login.password.placeholder")}
                  tabIndex={2}
                  {...register("password", {
                    required: t("login.password.required"),
                    minLength: {
                      value: 8,
                      message: t("login.password.invalid"),
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
            className="w-full font-bold"
            tabIndex={3}
            loading={isPending}
          >
            {t("buttons.login")}
          </Button>
        </CardFooter>
      </Card>
    </AuthLayout>
  );
}
