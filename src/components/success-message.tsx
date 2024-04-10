import { CheckCircleIcon } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

interface SuccessMessageProps {
  message?: string;
}

export const SuccessMessage = ({ message }: SuccessMessageProps) => {
  if (!message) return null;

  return (
    <Alert variant="default">
      <CheckCircleIcon className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
