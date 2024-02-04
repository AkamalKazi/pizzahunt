import { CldUploadButton } from "next-cloudinary";

export default function CloudinaryImageUploadButton({
  folderPath,
  onSuccess,
  preset,
}) {
  console.log({ folderPath, preset });
  return (
    <>
      <CldUploadButton
        className="mt-4 mx-auto"
        uploadPreset={preset}
        options={{
          folder: folderPath,
        }}
        onSuccess={
          onSuccess
          //     (result) => {
          //   setImageConfirmMessage(true);
          //   console.log("Upload successful:", result.info?.secure_url);
          //   // Store the uploaded image URL in the state
          //   setUploadedImageUrl(result.info?.secure_url);
          // }
        }
      />
    </>
  );
}
