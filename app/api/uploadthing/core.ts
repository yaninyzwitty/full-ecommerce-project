import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@clerk/nextjs"
 
const f = createUploadthing();
 
export const ourFileRouter = {
  uploadImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1  } })
    .middleware(async () => {
      const { userId } = auth();
 
      if (!userId) throw new UploadThingError("Unauthorized");
 
      return { userId  };
    })
    .onUploadComplete(async ({  file }) => {
 
 
      return { fileUrl: file.url  };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;