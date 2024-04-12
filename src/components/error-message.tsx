import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <Alert variant="destructive">
      <AlertCircleIcon className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
