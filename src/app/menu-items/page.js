"use client";
import { useProfile } from "@/components/UseProfile.js";
import UserTabs from "@/components/layout/UserTabs/UserTabs";
import Link from "next/link";
import RightIcon from "@/components/icons/right";

export default function MenuItemPage() {
  const { loading, data } = useProfile();

  if (loading) {
    return "User information loading...";
  }
  if (!data.IsAdmin) {
    return "Not an Admin";
  }

  return (
    <>
      <section className=" mt-8 max-w-md mx-auto ">
        <UserTabs isAdmin={data.IsAdmin}></UserTabs>
        <div className="mt-8">
          <Link
            href={"/menu-items/new"}
            className="flex bg-primary rounded-lg p-4 text-white gap-3 items-center justify-center max-w-xs mb-4 "
          >
            Create new menu item
            <RightIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
