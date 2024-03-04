"use client";

import {useEffect, useState} from "react";
import DialogModal from "./dialog-modal";
import ThumbnailModal from "./thumbnail-modal";

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
    </>
  );
}

export default ModalProvider;
