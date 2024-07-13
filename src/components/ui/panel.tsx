"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import useMediaQuery from "@/hooks/use-media-query";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface BaseProps {
  children: React.ReactNode;
}

interface RootPanelProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface PanelProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const Panel = ({ children, ...props }: RootPanelProps) => {
  const { isDesktop } = useMediaQuery();
  const Panel = isDesktop ? Sheet : Drawer;

  return <Panel {...props}>{children}</Panel>;
};

const PanelTrigger = ({ className, children, ...props }: PanelProps) => {
  const { isDesktop } = useMediaQuery();
  const PanelTrigger = isDesktop ? SheetTrigger : DrawerTrigger;

  return (
    <PanelTrigger className={className} {...props}>
      {children}
    </PanelTrigger>
  );
};

const PanelClose = ({ className, children, ...props }: PanelProps) => {
  const { isDesktop } = useMediaQuery();
  const PanelClose = isDesktop ? SheetClose : DrawerClose;

  return (
    <PanelClose className={className} {...props}>
      {children}
    </PanelClose>
  );
};

const PanelContent = ({ className, children, ...props }: PanelProps) => {
  const { isDesktop } = useMediaQuery();
  const PanelContent = isDesktop ? SheetContent : DrawerContent;

  return (
    <PanelContent className={className} {...props}>
      {children}
    </PanelContent>
  );
};

const PanelDescription = ({ className, children, ...props }: PanelProps) => {
  const { isDesktop } = useMediaQuery();
  const PanelDescription = isDesktop ? SheetDescription : DrawerDescription;

  return (
    <PanelDescription className={className} {...props}>
      {children}
    </PanelDescription>
  );
};

const PanelHeader = ({ className, children, ...props }: PanelProps) => {
  const { isDesktop } = useMediaQuery();
  const PanelHeader = isDesktop ? SheetHeader : DrawerHeader;

  return (
    <PanelHeader className={className} {...props}>
      {children}
    </PanelHeader>
  );
};

const PanelTitle = ({ className, children, ...props }: PanelProps) => {
  const { isDesktop } = useMediaQuery();
  const PanelTitle = isDesktop ? SheetTitle : DrawerTitle;

  return (
    <PanelTitle className={className} {...props}>
      {children}
    </PanelTitle>
  );
};

const PanelBody = ({ className, children, ...props }: PanelProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const PanelFooter = ({ className, children, ...props }: PanelProps) => {
  const { isDesktop } = useMediaQuery();
  const PanelFooter = isDesktop ? SheetFooter : DrawerFooter;

  return (
    <PanelFooter className={className} {...props}>
      {children}
    </PanelFooter>
  );
};

export {
  Panel,
  PanelTrigger,
  PanelClose,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
  PanelBody,
  PanelFooter,
};
