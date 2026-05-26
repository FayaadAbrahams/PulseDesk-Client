import { Spinner } from "@/components/ui/spinner";
import * as React from "react";

const sizeMap: Record<string, string> = {
  sm: "size-4",
  md: "size-8",
  lg: "size-12",
};

const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  return (
    <div className="flex justify-center">
      <Spinner className={sizeMap[size]} />
    </div>
  );
};

export default LoadingSpinner;