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
    <article
      className={cn("rounded-lg border", {
        "border-destructive": variant === "destructive",
      })}
    >
      <header
        className={cn(
          "rounded-t-md border-b bg-muted/40 px-4 py-2 sm:px-6 md:py-3",
          {
            "bg-destructive text-destructive-foreground":
              variant === "destructive",
          },
        )}
      >
        <span className="mb-4 text-base font-medium sm:text-lg">{title}</span>
      </header>
      <div className="p-4 sm:px-6">
        <div className="mb-4 flex flex-col gap-4 text-sm sm:text-base">
          <div className="flex gap-8">{children}</div>
        </div>
      </div>
    </article>
  );
}
