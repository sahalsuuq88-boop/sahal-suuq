"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DateFilter() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Last 30 Days
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>Today</DropdownMenuItem>
        <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
        <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
        <DropdownMenuItem>This Year</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}