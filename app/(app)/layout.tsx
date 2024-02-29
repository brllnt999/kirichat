import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NextUINavbar from "@/components/shared/NextUiNavbar";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  
  return (
    <main>
      <div className="flex h-screen">
        {/* <Sidebar /> */}
        <main className="flex-1 overflow-y-auto">
          {/* <NextUINavbar session={session} /> */}
          <div >
          {children}
          </div>
        </main>
      </div>
      <Toaster richColors />
    </main>
  );
}
