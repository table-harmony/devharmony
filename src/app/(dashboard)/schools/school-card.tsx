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
import {
  UsersIcon,
  GraduationCapIcon,
  EllipsisVerticalIcon,
  SettingsIcon,
  TrashIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { gridStyles } from "@/styles/common";
import { getSession } from "@/utils/session";
import { DeleteSchoolAlert } from "./delete-school-alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export async function SchoolCard({
  school,
  teachersCount,
  studentsCount,
}: {
  school: School;
  teachersCount: number;
  studentsCount: number;
}) {
  const { user } = await getSession();

  return (
    <div className="relative duration-200 hover:shadow-lg">
      <Link href={`/schools/${school.id}`}>
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
        </Card>
      </Link>
      <div className="absolute right-4 top-4 flex flex-row items-center">
        {user?.id === school.creatorId && (
          <div className="flex items-center">
            <MenuButton schoolId={school.id} />
          </div>
        )}
      </div>
    </div>
  );
}

function MenuButton({ schoolId }: { schoolId: number }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="menu">
          <EllipsisVerticalIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-1">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:!text-muted-foreground"
          asChild
        >
          <Link href="#">
            <SettingsIcon className="mr-2 size-4" /> Settings
          </Link>
        </Button>
        <Separator className="my-1" />
        <DeleteSchoolAlert schoolId={schoolId}>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start text-destructive hover:!text-destructive"
          >
            <TrashIcon className="mr-2 size-4" /> Delete school
          </Button>
        </DeleteSchoolAlert>
      </PopoverContent>
    </Popover>
  );
}

function SchoolCardSkeleton() {
  return (
    <div className="h-[125px] space-y-6 rounded border p-4">
      <div className="space-y-2">
        <Skeleton className="h-[20px] w-[140px] rounded" />
        <Skeleton className="h-[15px] w-full rounded" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-[25px] w-[250px] rounded" />
      </div>
    </div>
  );
}

export function SchoolCardGridSkeleton() {
  return (
    <div className={gridStyles}>
      {new Array(9).fill("").map((v, idx) => (
        <SchoolCardSkeleton key={idx} />
      ))}
    </div>
  );
}
