import { assertAuthenticated } from "@/utils/session";
import Image from "next/image";

export default async function DashboardPage() {
  const { user } = await assertAuthenticated();

  const schools = [];

  if (schools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 rounded-xl bg-muted py-12">
        <Image
          src="/assets/no-data.svg"
          width="200"
          height="200"
          alt="no schools placeholder image"
        />
        <span className="font-semibold">Uhoh, you are not on any school</span>
      </div>
    );
  }

  return <></>;
}
