import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbmqiqqri",
  api_key: "521687919437716",
  api_secret: "i0IpYsy3YiU0X6U7MGBnvwddFro",
});

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "your-folder-name", // Optional: specify a folder in your Cloudinary account
    });

    // Return an object with the imageURL
    return { imageURL: result.secure_url, status: "success" };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);

    // Return an object with an error status
    return { status: "error", error: error.message };
  }
};

export default uploadToCloudinary;
