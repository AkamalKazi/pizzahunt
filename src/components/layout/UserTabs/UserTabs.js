"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  console.log(path);
  return (
    <>
      <div className="flex tabs gap-3 max-w-md mx-auto">
        <ul className="tabs flex gap-3">
          <Link
            href={"/profile"}
            className={path == "/profile" ? "active" : ""}
          >
            {" "}
            Profile
          </Link>
          {isAdmin && (
            <>
              {" "}
              <Link
                href={"/category"}
                className={path == "/category" ? "active" : ""}
              >
                Category
              </Link>
              <Link
                href={"/users"}
                className={path == "/users" ? "active" : ""}
              >
                Users
              </Link>
              <Link
                href={"/menu-items"}
                className={path == "/menu-items" ? "active" : ""}
              >
                Menu Items
              </Link>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
