
import { type Schat, type CompleteSchat } from "@/lib/db/schema/schats";
import { OptimisticAction } from "@/lib/utils";
import { useOptimistic } from "react";

export type TAddOptimistic = (action: OptimisticAction<Schat>) => void;

export const useOptimisticSchats = (
  schats: CompleteSchat[],
  
) => {
  const [optimisticSchats, addOptimisticSchat] = useOptimistic(
    schats,
    (
      currentState: CompleteSchat[],
      action: OptimisticAction<Schat>,
    ): CompleteSchat[] => {
      const { data } = action;

      

      const optimisticSchat = {
        ...data,
        
        id: "optimistic",
      };

      switch (action.action) {
        case "create":
          return currentState.length === 0
            ? [optimisticSchat]
            : [...currentState, optimisticSchat];
        case "update":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, ...optimisticSchat } : item,
          );
        case "delete":
          return currentState.map((item) =>
            item.id === data.id ? { ...item, id: "delete" } : item,
          );
        default:
          return currentState;
      }
    },
  );

  return { addOptimisticSchat, optimisticSchats };
};
