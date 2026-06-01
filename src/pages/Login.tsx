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
import * as z from "zod";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "sonner";
import { User, UserRole } from "@/types/types";
import { validateEmail } from "@/utils/emailUtil";
import Navbar from "@/components/Navbar";


const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [loading, setLoading] = React.useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    setLoading(true);
    try {
      const user: User = await auth.loginUser(data.email, data.password);

      if (user.email.length > 0 &&
        Object.values(UserRole).includes(user.role) &&
        validateEmail(user.email)) {
        toast.info("Logging in!", { position: "top-center" });

        setTimeout(() => navigate("/dashboard"), 300);
      } else {
        toast.error("Invalid account data. Please try again.");
      }
    } catch (error) {
      let message = "Login failed";
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        message = "Invalid Email/Password";
        toast.error("Login failed.", { description: message, position: "top-center" });
        console.error(error);
      } else {
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <Navbar />
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
              <CardHeader>
                <h1 className="text-4xl pb-5">Login</h1>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>Let's get you back to the ticket stand.</CardDescription>
              </CardHeader>
              <CardContent>
                <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Button type="submit" form="form-login" disabled={loading}>
                        {loading ? <LoadingSpinner size="sm" /> : "Login"}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
