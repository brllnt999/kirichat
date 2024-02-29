import { Suspense } from "react";

import Loading from "@/app/loading";
import SchatList from "@/components/schats/SchatList";
import { getSchats } from "@/lib/api/schats/queries";


export const revalidate = 0;

export default async function SchatsPage() {
  return (
    <main>
      <div className="relative">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl my-2">Schats</h1>
        </div>
        <Schats />
      </div>
    </main>
  );
}

const Schats = async () => {
  
  const { schats } = await getSchats();
  
  return (
    <Suspense fallback={<Loading />}>
      <SchatList schats={schats}  />
    </Suspense>
  );
};
