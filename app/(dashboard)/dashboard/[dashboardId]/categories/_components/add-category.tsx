"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";

type Props = {
  dashboardId: string;
  has_no_location: boolean;
};

function AddCategory({dashboardId, has_no_location}: Props) {
  return (
    <Button disabled={has_no_location}>
      <Link href={`/dashboard/${dashboardId}/categories/new`}>
        Add Category
      </Link>
    </Button>
  );
}

export default AddCategory;
