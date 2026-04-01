import * as React from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PasswordInputProps } from "@/types/types";

const PasswordInput = ({ id, ...props }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="relative">
        <Input id={id} type={showPassword ? "text" : "password"} {...props} />
        <Button
          className="absolute top-0 right-0 h-full px-3 hover:bg-transparent cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
          size="icon"
          type="button"
          variant="ghost"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default PasswordInput;
