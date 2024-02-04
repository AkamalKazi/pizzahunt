// import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
// import { CloudinaryStorage } from "multer-storage-cloudinary";

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure Multer and Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "YourFolderName", // Replace with your desired folder name
//     format: async (req, file) => "png", // Adjust file format as needed
//   },
// });

// const upload = multer({ storage });

// // API route handler
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default upload.single("file", async function handler(req, res) {
//   try {
//     // Access the uploaded file using req.file
//     const image = req.file;

//     if (!image) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Upload the file to Cloudinary
//     const cloudinaryResponse = await cloudinary.uploader.upload(image.path);

//     console.log("Cloudinary response:", cloudinaryResponse);

//     // Handle the rest of your logic here, e.g., save Cloudinary URL to a database, send a response, etc.
//     return res.status(200).json({
//       message: "Image uploaded successfully",
//       cloudinaryResponse,
//     });
//   } catch (error) {
//     console.error("Error uploading image to Cloudinary:", error);

//     // Handle error response
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });
