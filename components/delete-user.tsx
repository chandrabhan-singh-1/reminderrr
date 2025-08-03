"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { toast } from "sonner";

const DeleteUserButton = () => {
  return (
    <Button
      variant="destructive"
      onClick={async () => {
        await authClient.deleteUser({
          fetchOptions: {
            onSuccess: () => {
              toast.success("User deleted successfully");
            },
            onError: ({ error }) => {
              toast.error(error.message ?? "Some Error!");
            },
          },
        });
      }}
    >
      Delete User
    </Button>
  );
};

export default DeleteUserButton;
