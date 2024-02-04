"use client";
import { useProfile } from "../../../components/UseProfile";
import CloudinaryImageUploadButton from "@/components/ImageOrFileUplaod/ImageOrFileUpload.js";
import { useState } from "react";
import Image from "next/image.js";
import toast from "react-hot-toast";
import Link from "next/link";

export default function NewMenuItem() {
  const { loading, data } = useProfile();
  const [image, setImage] = useState(null); // New state to store the uploaded image URL
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState("");
  if (loading) {
    return "User profile loading...";
  }
  if (!data.IsAdmin) {
    return "Not An Admin";
  }

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = { image, name, description, basePrice };
    console.log("Coming from frontend", { data });
    const SavingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (response.ok) resolve();
      else reject();
    });
    toast.promise(SavingPromise, {
      loading: "Creating..",
      success: "Created successfully",
      error: "Error in Creating",
    });
  }

  const handleUploadSuccess = async (result) => {
    console.log("Upload successful:", result.info?.secure_url);
    setImage(result.info?.secure_url);
  };

  return (
    <>
      <section className="mt-8 max-w-md mx-auto ">
        {/* <UserTabs isAdmin={data.IsAdmin} /> */}
        <div className="flex items-center text-center rounded-lg text-white  px-3 py-2 bg-primary text-sm   w-36 ">
          <Link href={"/menu-items"}>Go Back to List</Link>
        </div>
        <form action="" className="mt-4" onSubmit={handleFormSubmit}>
          <div className="flex gap-4 items-start">
            <div>
              {" "}
              <div className="relative mt-8 mr-4 max-w-[200px] mx-auto">
                {image != null && (
                  <>
                    <Image
                      src={image}
                      width={80}
                      height={80}
                      alt="Image"
                      className="rounded-xl"
                    />

                    <CloudinaryImageUploadButton
                      folderPath={"PizzaHunt/User/MenuItems"}
                      preset="dylkc6cr"
                      onSuccess={handleUploadSuccess}
                    />
                  </>
                )}

                {image == null && (
                  <>
                    <div className="p-4 mx-auto text-center bg-gray-300 rounded-lg text-gray-600">
                      <span>No Image :(</span>
                    </div>

                    <CloudinaryImageUploadButton
                      folderPath={"PizzaHunt/User/MenuItems"}
                      preset="dylkc6cr"
                      onSuccess={handleUploadSuccess}
                    />
                  </>
                )}
              </div>
            </div>
            <div className="grow">
              <label htmlFor="">Items name</label>
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label htmlFor="">Description</label>
              <input
                type="text"
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
              />
              <label htmlFor="">Base Price</label>
              <input
                type="text"
                value={basePrice}
                onChange={(ev) => setBasePrice(ev.target.value)}
              />
              <button className="max-w-md mx-auto" type="submit">
                Create
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
