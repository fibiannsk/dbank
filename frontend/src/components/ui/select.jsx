import {
  Root as Select,
  Group as SelectGroup,
  Value as SelectValue,
  Trigger as SelectPrimitiveTrigger,
  Icon as SelectPrimitiveIcon,
  ScrollUpButton as SelectPrimitiveScrollUpButton,
  ScrollDownButton as SelectPrimitiveScrollDownButton,
  Portal as SelectPrimitivePortal,
  Content as SelectPrimitiveContent,
  Viewport as SelectPrimitiveViewport,
  Label as SelectPrimitiveLabel,
  Item as SelectPrimitiveItem,
  ItemText as SelectPrimitiveItemText,
  ItemIndicator as SelectPrimitiveItemIndicator,
  Separator as SelectPrimitiveSeparator,
} from "@radix-ui/react-select";

import { Check, ChevronDown, ChevronUp } from "lucide-react";

const SelectTrigger = ({ className = "", children, ...props }) => (
  <SelectPrimitiveTrigger
    className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${className}`}
    {...props}
  >
    {children}
    <SelectPrimitiveIcon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitiveIcon>
  </SelectPrimitiveTrigger>
);

const SelectScrollUpButton = ({ className = "", ...props }) => (
  <SelectPrimitiveScrollUpButton
    className={`flex cursor-default items-center justify-center py-1 ${className}`}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitiveScrollUpButton>
);

const SelectScrollDownButton = ({ className = "", ...props }) => (
  <SelectPrimitiveScrollDownButton
    className={`flex cursor-default items-center justify-center py-1 ${className}`}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitiveScrollDownButton>
);

const SelectContent = ({ className = "", children, position = "popper", ...props }) => (
  <SelectPrimitivePortal>
    <SelectPrimitiveContent
      className={`
        relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md
        data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0
        data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
        data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
        data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
        ${position === "popper" ? "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1" : ""}
        ${className}`}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitiveViewport
        className={`p-1 ${position === "popper" ? "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]" : ""}`}
      >
        {children}
      </SelectPrimitiveViewport>
      <SelectScrollDownButton />
    </SelectPrimitiveContent>
  </SelectPrimitivePortal>
);

const SelectLabel = ({ className = "", ...props }) => (
  <SelectPrimitiveLabel
    className={`py-1.5 pl-8 pr-2 text-sm font-semibold ${className}`}
    {...props}
  />
);

const SelectItem = ({ className = "", children, ...props }) => (
  <SelectPrimitiveItem
    className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitiveItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitiveItemIndicator>
    </span>
    <SelectPrimitiveItemText>{children}</SelectPrimitiveItemText>
  </SelectPrimitiveItem>
);

const SelectSeparator = ({ className = "", ...props }) => (
  <SelectPrimitiveSeparator className={`-mx-1 my-1 h-px bg-muted ${className}`} {...props} />
);

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
