"use client";

import React, { useState } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "lucide-react";

const CopyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
      navigator.clipboard.writeText("value");
      setCopied(true);

      setTimeout(() => setCopied(false), 1000);
    };

    return (
      <Button {...props} onClick={onCopy} ref={ref}>
        {!copied ? (
          <CopyIcon className="h-4 w-4 transition-all" />
        ) : (
          <CheckIcon className="h-4 w-4 transition-all" />
        )}
      </Button>
    );
  },
);
CopyButton.displayName = "CopyButton";

export { CopyButton };
