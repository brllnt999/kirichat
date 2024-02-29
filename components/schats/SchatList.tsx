"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type Schat, CompleteSchat } from "@/lib/db/schema/schats";
import Modal from "@/components/shared/Modal";

import { useOptimisticSchats } from "@/app/(app)/schats/useOptimisticSchats";
import { Button } from "@/components/ui/button";
import SchatForm from "./SchatForm";
import { PlusIcon } from "lucide-react";

type TOpenModal = (schat?: Schat) => void;

export default function SchatList({
  schats,
   
}: {
  schats: CompleteSchat[];
   
}) {
  const { optimisticSchats, addOptimisticSchat } = useOptimisticSchats(
    schats,
     
  );
  const [open, setOpen] = useState(false);
  const [activeSchat, setActiveSchat] = useState<Schat | null>(null);
  const openModal = (schat?: Schat) => {
    setOpen(true);
    schat ? setActiveSchat(schat) : setActiveSchat(null);
  };
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={activeSchat ? "Edit Schat" : "Create Schat"}
      >
        <SchatForm
          schat={activeSchat}
          addOptimistic={addOptimisticSchat}
          openModal={openModal}
          closeModal={closeModal}
          
        />
      </Modal>
      <div className="absolute right-0 top-0 ">
        <Button onClick={() => openModal()} variant={"outline"}>
          +
        </Button>
      </div>
      {optimisticSchats.length === 0 ? (
        <EmptyState openModal={openModal} />
      ) : (
        <ul>
          {optimisticSchats.map((schat) => (
            <Schat
              schat={schat}
              key={schat.id}
              openModal={openModal}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

const Schat = ({
  schat,
  openModal,
}: {
  schat: CompleteSchat;
  openModal: TOpenModal;
}) => {
  const optimistic = schat.id === "optimistic";
  const deleting = schat.id === "delete";
  const mutating = optimistic || deleting;
  const pathname = usePathname();
  const basePath = pathname.includes("schats")
    ? pathname
    : pathname + "/schats/";


  return (
    <li
      className={cn(
        "flex justify-between my-2",
        mutating ? "opacity-30 animate-pulse" : "",
        deleting ? "text-destructive" : "",
      )}
    >
      <div className="w-full">
        <div>{schat.userId}</div>
      </div>
      <Button variant={"link"} asChild>
        <Link href={ basePath + "/" + schat.id }>
          Edit
        </Link>
      </Button>
    </li>
  );
};

const EmptyState = ({ openModal }: { openModal: TOpenModal }) => {
  return (
    <div className="text-center">
      <h3 className="mt-2 text-sm font-semibold text-secondary-foreground">
        No schats
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by creating a new schat.
      </p>
      <div className="mt-6">
        <Button onClick={() => openModal()}>
          <PlusIcon className="h-4" /> New Schats </Button>
      </div>
    </div>
  );
};
