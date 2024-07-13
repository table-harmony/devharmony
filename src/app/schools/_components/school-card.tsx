import { School } from "@/db/schema";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersIcon, GraduationCapIcon, SchoolIcon } from "lucide-react";

export function SchoolCard({
  school,
  teachersCount,
  studentsCount,
}: {
  school: School;
  teachersCount: number;
  studentsCount: number;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{school.name}</CardTitle>
        <CardDescription className="line-clamp-4">
          {school.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
          <div className="flex items-center gap-2">
            <UsersIcon /> {studentsCount} students
          </div>
          <div className="flex items-center gap-2">
            <GraduationCapIcon /> {teachersCount} teachers
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant="secondary" asChild>
          <Link href={`/schools/${school.id}`}>
            <SchoolIcon className="mr-2 size-4" /> View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function SchoolCardSkeleton() {
  return (
    <div className="h-[250px] space-y-6 rounded border p-4">
      <div className="space-y-2">
        <Skeleton className="h-[30px] w-[140px] rounded" />
        <Skeleton className="h-[40px] w-full rounded" />
      </div>
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
        <Skeleton className="h-[30px] w-[140px] rounded" />
        <Skeleton className="h-[30px] w-[140px] rounded" />
      </div>
      <Skeleton className="h-[40px] w-full rounded" />
    </div>
  );
}
