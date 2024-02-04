"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAuth } from "@/utility/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import CloudinaryImageUploadButton from "@/components/ImageOrFileUplaod/ImageOrFileUpload";
import Link from "next/link";
import UserTabs from "../../components/layout/UserTabs/UserTabs";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;
  const [IsAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [PostalCode, setPostalCode] = useState("");
  const [Country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // New state to store the uploaded image URL
  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session.data.user.name);
      setUploadedImageUrl(session.data.user.image);
      fetch("/api/profile/").then((response) =>
        response.json().then((data) => {
          console.log("Your profile data is :", data);
          setIsAdmin(data.IsAdmin);
          setCity(data.City);
          setCountry(data.Country);
          setStreetAddress(data.streetAddress);
          setPhoneNumber(data.phone);
          setPostalCode(data.postalCode);
        })
      );
    }
  }, [session, status]);

  if (status === "loading") {
    return "Loading...";
  }

  if (status === "unauthenticated" || status === undefined) {
    return redirect("/login");
  }

  const userImage =
    session.data.user?.image ||
    "https://res.cloudinary.com/dbmqiqqri/image/upload/v1705929544/PizzaHunt/User/Profile/sdm14gaimrkxkdgcq72f.png";

  const handleProfileUpdate = async (ev) => {
    ev.preventDefault();
    setIsSaving(true);
    console.log(`Your image from UI:${uploadedImageUrl}`);
    try {
      const SavingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/profile/", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: userName,
            image:
              uploadedImageUrl == null
                ? session.data.user.image
                : uploadedImageUrl,
            City: city,
            country: Country,
            postalCode: PostalCode,
            phone: phoneNumber,
            Country: Country,
            streetAddress: streetAddress,
            IsAdmin: false,
          }),
        });
        if (response.ok) {
          resolve();
        } else {
          reject();
        }
      });
      toast.promise(SavingPromise, {
        success: "Save profile",
        error: "Error saving profile",
      });
    } catch (error) {
      setIsSaving(false);
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
    setIsSaving(false);
  };

  const handleUploadSuccess = async (result) => {
    console.log("Upload successful:", result.info?.secure_url);
    setUploadedImageUrl(result.info?.secure_url);
  };

  return (
    <>
      <section className="mt-8 mb-8">
        <UserTabs isAdmin={true}></UserTabs>
        <h1 className="text-center mt-5 font-bold text-primary text-4xl">
          Profile
        </h1>

        <div className="max-w-md mx-auto mt-0">
          <div className="flex gap-2 ">
            <div className="relative mt-8 mr-4">
              <Image
                src={userImage}
                width={80}
                height={80}
                alt="ProfileImage"
                className="rounded-xl"
              />

              <CloudinaryImageUploadButton
                folderPath={"PizzaHunt/User/Profile"}
                preset="dylkc6cr"
                onSuccess={handleUploadSuccess}
              />
            </div>
            <form onSubmit={handleProfileUpdate}>
              <div className="grow mt-5 mx-2">
                <div>
                  <label>First and last name</label>
                  <input
                    type="text"
                    placeholder="First and last name"
                    value={userName}
                    style={{ margin: 0 }}
                    onChange={(ev) => setUserName(ev.target.value)}
                  />
                </div>
                <div className="mt-1">
                  {" "}
                  <label>Email</label>
                  <input
                    type="text"
                    disabled={true}
                    style={{ margin: 0 }}
                    value={session.data?.user.email}
                    className="text-sm"
                  />
                </div>
                <div className="mt-1">
                  {" "}
                  <label>Phone</label>
                  <input
                    type="tel"
                    style={{ margin: 0 }}
                    className="text-sm"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="mt-1">
                  {" "}
                  <label>Street address</label>
                  <input
                    type="text"
                    style={{ margin: 0 }}
                    className="text-sm"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                </div>

                <div className="mt-2 flex gap-2">
                  {" "}
                  <div>
                    <label>Postal code</label>
                    <input
                      type="tel"
                      style={{ margin: 0 }}
                      className="text-sm"
                      value={PostalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>City</label>
                    <input
                      type="tel"
                      style={{ margin: 0 }}
                      className="text-sm"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label>Country</label>
                  <input
                    type="text"
                    style={{ margin: 0 }}
                    className="text-sm"
                    value={Country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <button type="submit" className="mt-3" disabled={isSaving}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
