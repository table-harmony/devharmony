import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";

export default function InformationPage() {
  return (
    <div className="container relative">
      <PageHeader>
        <PageHeaderHeading>FAQ</PageHeaderHeading>
        <PageHeaderDescription>
          Explore these frequently asked questions
        </PageHeaderDescription>
      </PageHeader>
      <Card>
        <CardContent>
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>What does TableHarmony do ?</AccordionTrigger>
              <AccordionContent>
                TableHarmony offers project management, code editing, and a
                social environment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What was used to build the front-end ?
              </AccordionTrigger>
              <AccordionContent>
                The front-end was built using React and Next.js.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What was used to build the back-end ?
              </AccordionTrigger>
              <AccordionContent>
                The back-end was built using Node.js with Drizzle middleware
                connected to a Postgres sql database.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
