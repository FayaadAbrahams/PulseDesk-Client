import { Spinner } from "@/components/ui/spinner";
import * as React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center">
      <Spinner className="size-14" />
    </div>
  );
};
export default LoadingSpinner;
