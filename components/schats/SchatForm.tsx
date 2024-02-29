import { z } from "zod";

import { useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useValidatedForm } from "@/lib/hooks/useValidatedForm";

import { type Action, cn } from "@/lib/utils";
import { type TAddOptimistic } from "@/app/(app)/schats/useOptimisticSchats";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useBackPath } from "@/components/shared/BackButton";



import { type Schat, insertSchatParams } from "@/lib/db/schema/schats";
import {
  createSchatAction,
  deleteSchatAction,
  updateSchatAction,
} from "@/lib/actions/schats";


const SchatForm = ({
  
  schat,
  openModal,
  closeModal,
  addOptimistic,
  postSuccess,
}: {
  schat?: Schat | null;
  
  openModal?: (schat?: Schat) => void;
  closeModal?: () => void;
  addOptimistic?: TAddOptimistic;
  postSuccess?: () => void;
}) => {
  const { errors, hasErrors, setErrors, handleChange } =
    useValidatedForm<Schat>(insertSchatParams);
  const editing = !!schat?.id;
  
  const [isDeleting, setIsDeleting] = useState(false);
  const [pending, startMutation] = useTransition();

  const router = useRouter();
  const backpath = useBackPath("schats");


  const onSuccess = (
    action: Action,
    data?: { error: string; values: Schat },
  ) => {
    const failed = Boolean(data?.error);
    if (failed) {
      openModal && openModal(data?.values);
      toast.error(`Failed to ${action}`, {
        description: data?.error ?? "Error",
      });
    } else {
      router.refresh();
      postSuccess && postSuccess();
      toast.success(`Schat ${action}d!`);
      if (action === "delete") router.push(backpath);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setErrors(null);

    const payload = Object.fromEntries(data.entries());
    const schatParsed = await insertSchatParams.safeParseAsync({  ...payload });
    if (!schatParsed.success) {
      setErrors(schatParsed?.error.flatten().fieldErrors);
      return;
    }

    closeModal && closeModal();
    const values = schatParsed.data;
    const pendingSchat: Schat = {
      updatedAt: schat?.updatedAt ?? new Date().toISOString().slice(0, 19).replace("T", " "),
      createdAt: schat?.createdAt ?? new Date().toISOString().slice(0, 19).replace("T", " "),
      id: schat?.id ?? "",
      ...values,
    };
    try {
      startMutation(async () => {
        addOptimistic && addOptimistic({
          data: pendingSchat,
          action: editing ? "update" : "create",
        });

        const error = editing
          ? await updateSchatAction({ ...values, id: schat.id })
          : await createSchatAction(values);

        const errorFormatted = {
          error: error ?? "Error",
          values: pendingSchat 
        };
        onSuccess(
          editing ? "update" : "create",
          error ? errorFormatted : undefined,
        );
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(e.flatten().fieldErrors);
      }
    }
  };

  return (
    <form action={handleSubmit} onChange={handleChange} className={"space-y-8"}>
      {/* Schema fields start */}
              <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.userId ? "text-destructive" : "",
          )}
        >
          User Id
        </Label>
        <Input
          type="text"
          name="userId"
          className={cn(errors?.userId ? "ring ring-destructive" : "")}
          defaultValue={schat?.userId ?? ""}
        />
        {errors?.userId ? (
          <p className="text-xs text-destructive mt-2">{errors.userId[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.threadId ? "text-destructive" : "",
          )}
        >
          Thread Id
        </Label>
        <Input
          type="text"
          name="threadId"
          className={cn(errors?.threadId ? "ring ring-destructive" : "")}
          defaultValue={schat?.threadId ?? ""}
        />
        {errors?.threadId ? (
          <p className="text-xs text-destructive mt-2">{errors.threadId[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.role ? "text-destructive" : "",
          )}
        >
          Role
        </Label>
        <Input
          type="text"
          name="role"
          className={cn(errors?.role ? "ring ring-destructive" : "")}
          defaultValue={schat?.role ?? ""}
        />
        {errors?.role ? (
          <p className="text-xs text-destructive mt-2">{errors.role[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
        <div>
        <Label
          className={cn(
            "mb-2 inline-block",
            errors?.message ? "text-destructive" : "",
          )}
        >
          Message
        </Label>
        <Input
          type="text"
          name="message"
          className={cn(errors?.message ? "ring ring-destructive" : "")}
          defaultValue={schat?.message ?? ""}
        />
        {errors?.message ? (
          <p className="text-xs text-destructive mt-2">{errors.message[0]}</p>
        ) : (
          <div className="h-6" />
        )}
      </div>
      {/* Schema fields end */}

      {/* Save Button */}
      <SaveButton errors={hasErrors} editing={editing} />

      {/* Delete Button */}
      {editing ? (
        <Button
          type="button"
          disabled={isDeleting || pending || hasErrors}
          variant={"destructive"}
          onClick={() => {
            setIsDeleting(true);
            closeModal && closeModal();
            startMutation(async () => {
              addOptimistic && addOptimistic({ action: "delete", data: schat });
              const error = await deleteSchatAction(schat.id);
              setIsDeleting(false);
              const errorFormatted = {
                error: error ?? "Error",
                values: schat,
              };

              onSuccess("delete", error ? errorFormatted : undefined);
            });
          }}
        >
          Delet{isDeleting ? "ing..." : "e"}
        </Button>
      ) : null}
    </form>
  );
};

export default SchatForm;

const SaveButton = ({
  editing,
  errors,
}: {
  editing: Boolean;
  errors: boolean;
}) => {
  const { pending } = useFormStatus();
  const isCreating = pending && editing === false;
  const isUpdating = pending && editing === true;
  return (
    <Button
      type="submit"
      className="mr-2"
      disabled={isCreating || isUpdating || errors}
      aria-disabled={isCreating || isUpdating || errors}
    >
      {editing
        ? `Sav${isUpdating ? "ing..." : "e"}`
        : `Creat${isCreating ? "ing..." : "e"}`}
    </Button>
  );
};
