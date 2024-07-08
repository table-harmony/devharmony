import { Loader2Icon, LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LoaderButton({
  children,
  isLoading,
  icon: Icon,
  className,
  ...props
}: ButtonProps & { isLoading: boolean; icon?: React.ReactNode }) {
  return (
    <Button
      disabled={isLoading}
      type="submit"
      {...props}
      className={cn("flex justify-center gap-2 px-3", className)}
    >
      {isLoading ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <>{Icon}</>
      )}
      {children}
    </Button>
  );
}
