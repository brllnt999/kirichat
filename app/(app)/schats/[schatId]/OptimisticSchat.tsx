"use client";

import { useOptimistic, useState } from "react";
import { TAddOptimistic } from "@/app/(app)/schats/useOptimisticSchats";
import { type Schat } from "@/lib/db/schema/schats";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Modal from "@/components/shared/Modal";
import SchatForm from "@/components/schats/SchatForm";


export default function OptimisticSchat({ 
  schat,
   
}: { 
  schat: Schat; 
  
  
}) {
  const [open, setOpen] = useState(false);
  const openModal = (_?: Schat) => {
    setOpen(true);
  };
  const closeModal = () => setOpen(false);
  const [optimisticSchat, setOptimisticSchat] = useOptimistic(schat);
  const updateSchat: TAddOptimistic = (input) =>
    setOptimisticSchat({ ...input.data });

  return (
    <div className="m-4">
      <Modal open={open} setOpen={setOpen}>
        <SchatForm
          schat={optimisticSchat}
          
          closeModal={closeModal}
          openModal={openModal}
          addOptimistic={updateSchat}
        />
      </Modal>
      <div className="flex justify-between items-end mb-4">
        <h1 className="font-semibold text-2xl">{optimisticSchat.userId}</h1>
        <Button className="" onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>
      <pre
        className={cn(
          "bg-secondary p-4 rounded-lg break-all text-wrap",
          optimisticSchat.id === "optimistic" ? "animate-pulse" : "",
        )}
      >
        {JSON.stringify(optimisticSchat, null, 2)}
      </pre>
    </div>
  );
}
