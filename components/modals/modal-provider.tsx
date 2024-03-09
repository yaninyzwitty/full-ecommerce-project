"use client";

import {useEffect, useState} from "react";
import DialogModal from "./dialog-modal";
import ThumbnailModal from "./thumbnail-modal";
import PopoverLocationModal from "./popover-location-modal";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <>
      <DialogModal />
      <ThumbnailModal />
      <PopoverLocationModal />
    </>
  );
}

export default ModalProvider;
