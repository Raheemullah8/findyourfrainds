"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SearchDropdown({ categories = [], onSelectCategory }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const categoriesArray = Array.isArray(categories) 
    ? categories.map((category) => ({
        label: category.title,
        value: category._id,
      }))
    : [];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categoriesArray.find((category) => category.value === value)?.label
            : "Select category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {categoriesArray.map((category) => (
              <CommandItem
                key={category.value}
                value={category.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                  onSelectCategory(currentValue);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === category.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {category.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

