import { getUserSchools } from "@/data-access/schools";
import { getStudentSchool } from "@/data-access/students";

import { assertAuthenticated } from "@/utils/session";

import Image from "next/image";
import { SchoolCard } from "../schools/_components/school-card";
import { GraduationCapIcon, SchoolIcon, UsersIcon } from "lucide-react";
import { PageHeaderHeading } from "@/components/page-header";
import { getTeacherSchools } from "@/data-access/teachers";
import { Suspense } from "react";
import { SchoolListSkeleton } from "../schools/_components/school-list";

export default async function DashboardPage() {
  const { user } = await assertAuthenticated();

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <PageHeaderHeading className="text-xl md:text-2xl">
          <span className="flex items-center">
            <SchoolIcon className="mr-2 size-8" /> Owned Schools
          </span>
        </PageHeaderHeading>
        <Suspense fallback={<SchoolListSkeleton />}>
          <OwnedSchools userId={user.id} />
        </Suspense>
      </div>

      <div className="space-y-4">
        <PageHeaderHeading className="text-xl md:text-2xl">
          <span className="flex items-center">
            <GraduationCapIcon className="mr-2 size-8" /> Teaching Schools
          </span>
        </PageHeaderHeading>
        <Suspense fallback={<SchoolListSkeleton />}>
          <TeachSchools userId={user.id} />
        </Suspense>
      </div>

      <div className="space-y-4">
        <PageHeaderHeading className="text-xl md:text-2xl">
          <span className="flex items-center">
            <UsersIcon className="mr-2 size-8" /> Student Schools
          </span>
        </PageHeaderHeading>
        <Suspense fallback={<SchoolListSkeleton />}>
          <StudentSchool userId={user.id} />
        </Suspense>
      </div>
    </div>
  );
}

async function OwnedSchools({ userId }: { userId: number }) {
  const ownedSchools = await getUserSchools(userId);

  if (!ownedSchools) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 rounded-xl bg-muted p-12">
        <Image
          src="/assets/no-data.svg"
          width="200"
          height="200"
          alt="no schools placeholder image"
        />
        <span className="font-semibold">Uhoh, you do not own any school</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {ownedSchools.map((school) => (
        <SchoolCard
          key={school.id}
          school={school}
          studentsCount={school.students.length}
          teachersCount={school.teachers.length}
        />
      ))}
    </div>
  );
}

async function TeachSchools({ userId }: { userId: number }) {
  const schools = await getTeacherSchools(userId);

  if (!schools) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 rounded-xl bg-muted p-12">
        <Image
          src="/assets/no-data.svg"
          width="200"
          height="200"
          alt="no schools placeholder image"
        />
        <span className="font-semibold">
          Uhoh, you do not teach at any school
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {schools.map((school) => (
        <SchoolCard
          key={school.id}
          school={school}
          studentsCount={school.students.length}
          teachersCount={school.teachers.length}
        />
      ))}
    </div>
  );
}

async function StudentSchool({ userId }: { userId: number }) {
  const school = await getStudentSchool(userId);

  if (!school) {
    return (
      <div className="flex flex-col items-center justify-center gap-8 rounded-xl bg-muted p-12">
        <Image
          src="/assets/no-data.svg"
          width="200"
          height="200"
          alt="no schools placeholder image"
        />
        <span className="font-semibold">
          Uhoh, you do not study at any school
        </span>
      </div>
    );
  }
  console.log(school);

  return (
    <SchoolCard
      key={school.id}
      school={school}
      studentsCount={school.students.length}
      teachersCount={school.teachers.length}
    />
  );
}
