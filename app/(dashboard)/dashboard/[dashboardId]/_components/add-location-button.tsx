"use client";

import {Button} from "@/components/ui/button";
import {useLocationStore} from "@/store";

function AddlocationButton() {
  const {onOpen} = useLocationStore();
  return <Button onClick={onOpen}>Add Location</Button>;
}

export default AddlocationButton;
