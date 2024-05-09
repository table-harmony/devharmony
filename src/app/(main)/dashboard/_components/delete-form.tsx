import type { UserDto } from "@/infrastructure/users";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { useToast } from "@/components/ui/use-toast";
import { deleteAction } from "../_actions/delete.action";

interface DeleteUserFormProps {
  row: Row<UserDto>;
}

export function DeleteUserForm({ row }: DeleteUserFormProps) {
  const { toast } = useToast();

  const onSubmit = () => {
    deleteAction(row.getValue("id"))
      .then((data) => {
        if (data?.error) {
          toast({
            variant: "destructive",
            description: data.error,
          });
        }
        if (data?.success) {
          toast({ description: data.success });
        }
      })
      .catch(() =>
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        })
      );
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-full justify-start">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the account and remove the data from the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
