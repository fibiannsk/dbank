import {
  Root as DropdownMenu,
  Trigger as DropdownMenuTrigger,
  Group as DropdownMenuGroup,
  Portal as DropdownMenuPortal,
  Sub as DropdownMenuSub,
  RadioGroup as DropdownMenuRadioGroup,
  SubTrigger as DropdownMenuPrimitiveSubTrigger,
  SubContent as DropdownMenuPrimitiveSubContent,
  Content as DropdownMenuPrimitiveContent,
  Item as DropdownMenuPrimitiveItem,
  CheckboxItem as DropdownMenuPrimitiveCheckboxItem,
  RadioItem as DropdownMenuPrimitiveRadioItem,
  Label as DropdownMenuPrimitiveLabel,
  Separator as DropdownMenuPrimitiveSeparator,
  ItemIndicator,
} from "@radix-ui/react-dropdown-menu";

import { Check, ChevronRight, Circle } from "lucide-react";

const DropdownMenuSubTrigger = ({ className = "", inset, children, ...props }) => (
  <DropdownMenuPrimitiveSubTrigger
    className={`flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent ${inset ? "pl-8" : ""} ${className}`}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitiveSubTrigger>
);

const DropdownMenuSubContent = ({ className = "", ...props }) => (
  <DropdownMenuPrimitiveSubContent
    className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
    {...props}
  />
);

const DropdownMenuContent = ({ className = "", sideOffset = 4, ...props }) => (
  <DropdownMenuPortal>
    <DropdownMenuPrimitiveContent
      sideOffset={sideOffset}
      className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
      {...props}
    />
  </DropdownMenuPortal>
);

const DropdownMenuItem = ({ className = "", inset, ...props }) => (
  <DropdownMenuPrimitiveItem
    className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${inset ? "pl-8" : ""} ${className}`}
    {...props}
  />
);

const DropdownMenuCheckboxItem = ({ className = "", children, checked, ...props }) => (
  <DropdownMenuPrimitiveCheckboxItem
    checked={checked}
    className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Check className="h-4 w-4" />
      </ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitiveCheckboxItem>
);

const DropdownMenuRadioItem = ({ className = "", children, ...props }) => (
  <DropdownMenuPrimitiveRadioItem
    className={`relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitiveRadioItem>
);

const DropdownMenuLabel = ({ className = "", inset, ...props }) => (
  <DropdownMenuPrimitiveLabel
    className={`px-2 py-1.5 text-sm font-semibold ${inset ? "pl-8" : ""} ${className}`}
    {...props}
  />
);

const DropdownMenuSeparator = ({ className = "", ...props }) => (
  <DropdownMenuPrimitiveSeparator
    className={`-mx-1 my-1 h-px bg-muted ${className}`}
    {...props}
  />
);

const DropdownMenuShortcut = ({ className = "", ...props }) => (
  <span className={`ml-auto text-xs tracking-widest opacity-60 ${className}`} {...props} />
);

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
