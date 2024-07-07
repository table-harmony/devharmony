import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function ConfigurationPanel({
  title,
  children,
  variant = "default",
}: {
  title: string;
  children: ReactNode;
  variant?: "destructive" | "default";
}) {
  return (
    <div className="rounded-lg border">
      <div
        className={cn(
          "rounded-t-md border-b bg-muted px-4 py-2 sm:px-6 md:py-3",
          {
            "bg-red-500 text-destructive-foreground dark:bg-red-800":
              variant === "destructive",
          },
        )}
      >
        <span className="mb-4 text-base font-medium sm:text-lg">{title}</span>
      </div>
      <div className="p-4 sm:px-6">
        <div className="mb-4 flex flex-col gap-4 text-sm sm:text-base">
          <div className="flex gap-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
