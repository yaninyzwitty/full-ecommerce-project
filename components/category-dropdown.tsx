"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function CategoryDropdown({children}: {children: React.ReactNode}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-white"
        sideOffset={14}
        side="bottom"
        align="center"
      >
        <DropdownMenuItem className="font-medium hover:bg-slate-300 rounded">
          Change category name
        </DropdownMenuItem>
        <DropdownMenuItem className="font-medium hover:bg-slate-300 rounded">
          Change category description
        </DropdownMenuItem>
        <DropdownMenuItem className="font-medium hover:bg-slate-300 rounded">
          Change category image
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CategoryDropdown;
