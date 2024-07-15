import { getTeacherSchoolsUseCase } from "@/use-cases/teachers";
import { getUserSchoolsUseCase } from "@/use-cases/schools";
import { getStudentSchoolUseCase } from "@/use-cases/students";

import {
  PageActions,
  PageHeader,
  PageHeaderHeading,
} from "@/components/page-header";
import { CreateSchoolSheet } from "./create-school-sheet";
import { assertAuthenticated } from "@/utils/session";
import Image from "next/image";
import { cardStyles, gridStyles } from "@/styles/common";
import { Suspense } from "react";
import { SchoolCard, SchoolCardGridSkeleton } from "./school-card";

export default function SchoolsPage() {
  return (
    <div className="container">
      <PageHeader>
        <PageHeaderHeading>Schools</PageHeaderHeading>
        <PageActions>
          <CreateSchoolSheet />
        </PageActions>
        <div className="mt-4 flex w-full flex-col gap-12">
          <OwnedSchoolsWrapper />
          <TeacherSchoolsWrapper />
          <StudentSchoolWrapper />
        </div>
      </PageHeader>
    </div>
  );
}

async function OwnedSchools() {
  const { user } = await assertAuthenticated();
  const schools = await getUserSchoolsUseCase(user.id);

  if (schools.length === 0) {
    return (
      <div className={cardStyles}>
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
    <div className={gridStyles}>
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

function OwnedSchoolsWrapper() {
  return (
    <div className="w-full space-y-2">
      <h2 className="text-xl font-medium leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
        Owned schools
      </h2>
      <Suspense fallback={<SchoolCardGridSkeleton />}>
        <OwnedSchools />
      </Suspense>
    </div>
  );
}

async function TeacherSchools() {
  const { user } = await assertAuthenticated();

  const schools = await getTeacherSchoolsUseCase(user.id);

  if (schools.length === 0) {
    return (
      <div className={cardStyles}>
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
    <div className={gridStyles}>
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

function TeacherSchoolsWrapper() {
  return (
    <div className="w-full space-y-2">
      <h2 className="text-xl font-medium leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
        Teacher schools
      </h2>
      <Suspense fallback={<SchoolCardGridSkeleton />}>
        <TeacherSchools />
      </Suspense>
    </div>
  );
}

async function StudentSchool() {
  const { user } = await assertAuthenticated();

  const school = await getStudentSchoolUseCase(user.id);

  if (!school) {
    return (
      <div className={cardStyles}>
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

  return (
    <div className={gridStyles}>
      <SchoolCard
        key={school.id}
        school={school}
        studentsCount={school.students.length}
        teachersCount={school.teachers.length}
      />
    </div>
  );
}

function StudentSchoolWrapper() {
  return (
    <div className="w-full space-y-2">
      <h2 className="text-xl font-medium leading-tight tracking-tighter md:text-2xl lg:leading-[1.1]">
        Student school
      </h2>
      <Suspense fallback={<SchoolCardGridSkeleton />}>
        <StudentSchool />
      </Suspense>
    </div>
  );
}
