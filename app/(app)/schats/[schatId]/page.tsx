import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getSchatById } from "@/lib/api/schats/queries";
import OptimisticSchat from "./OptimisticSchat";


import { BackButton } from "@/components/shared/BackButton";
import Loading from "@/app/loading";


export const revalidate = 0;

export default async function SchatPage({
  params,
}: {
  params: { schatId: string };
}) {

  return (
    <main className="overflow-auto">
      <Schat id={params.schatId} />
    </main>
  );
}

const Schat = async ({ id }: { id: string }) => {
  
  const { schat } = await getSchatById(id);
  

  if (!schat) notFound();
  return (
    <Suspense fallback={<Loading />}>
      <div className="relative">
        <BackButton currentResource="schats" />
        <OptimisticSchat schat={schat}  />
      </div>
    </Suspense>
  );
};
