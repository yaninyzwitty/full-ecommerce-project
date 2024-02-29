"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";

type Props = {
  dashboardId: string;
};

function AddCategory({dashboardId}: Props) {
  return (
    <Button>
      <Link href={`/dashboard/${dashboardId}/categories/add`}>
        Add Category
      </Link>
    </Button>
  );
}

export default AddCategory;
