import { Navbar } from "@/components/navigation/navbar";
import { Separator } from "@/components/ui/separator";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <>
        <Navbar />
        <Separator />
      </>
      {children}
    </div>
  );
}
