import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as React from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema } from "@/schema/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [loading, setLoading] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Card>
              <CardHeader>
                <h1 className="text-4xl pb-5">Login</h1>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Let's get you to the ticket stands.</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <FieldGroup>
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-login-email">
                            Email
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-login-email"
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            autoComplete="off"
                            required
                            type="email"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}

                        </Field>
                      )}
                    />
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-login-password">
                            Password
                          </FieldLabel>
                          <Input
                            {...field}
                            id="form-login-password"
                            aria-invalid={fieldState.invalid}
                            placeholder=""
                            autoComplete="off"
                            required
                            type="password"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}

                        </Field>
                      )}
                    />
                    <Field>
                      <Button type="submit" onClick={() => setLoading(true)}>
                        Login
                      </Button>
                      <Button variant="outline" type="button">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Icon" />
                        Login with Google
                      </Button>
                      <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <a href="/register">Sign up</a>
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
