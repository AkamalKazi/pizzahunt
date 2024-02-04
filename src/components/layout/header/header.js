"use client";
"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import $ from "jquery";
import { useEffect } from "react";
export default function Header() {
  const session = useSession();
  const status = session.status;
  let userEmail = "";
  if (session.data != null || session.data != undefined) {
    userEmail = session.data.user?.email || session.data.user?.name;
  }
  useEffect(() => {
    const menuElement = document.getElementById("Menu");
    const menuCloseElement = document.getElementById("close-menu");
    const toggleClass =
      "max-md:hidden z-50 flex-col !transition-transform !mt-5 drop-shadow	mx-auto 	rounded-md translate-x-4 z-100 relative bg-white  -top-4   !w-dvw pb-10";
    if (menuElement) {
      menuElement.addEventListener("click", () => {
        console.log("menu clicked");

        // Toggle classes for opening/closing the header
        $(".main-header").toggleClass("flex-col gap-5");
        $("#Menu").addClass("top-0 z-100 absolute");
        $("#close-menu").removeClass("hidden");
        $("#close-menu").addClass("flex justify-end p-2");
        $(".header").toggleClass(toggleClass);
      });
    }
    if (menuCloseElement) {
      menuCloseElement.addEventListener("click", () => {
        console.log("menu clicked");

        // Toggle classes for opening/closing the header
        $(".main-header").toggleClass("flex-col gap-5");

        $("#close-menu").addClass("hidden");

        $(".header").toggleClass(toggleClass);
      });
    }
    // Cleanup the event listener when the component is unmounted
    return () => {
      if (menuElement) {
        menuElement.removeEventListener("click", () => {
          console.log("menu clicked");
        });
      }
    };
  }, []);
  return (
    <>
      <div
        id="Menu"
        className="xl:hidden md:hidden mt-4   max-sm:block container cursor-pointer flex items-center justify-end"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          className="injected-svg"
          data-src="/icons/menu-01-stroke-rounded.svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          role="img"
          color="#000000"
        >
          <path
            d="M4 5L20 5"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M4 12L20 12"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M4 19L20 19"
            stroke="#000000"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
      <div className="container header font-semibold mt-3 max-md:hidden">
        <div id="close-menu" className="hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19 5L5 19M5 5L19 19"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <header className="flex main-header items-center justify-between ">
          <nav className="flex nav gap-5  items-center">
            <div className="logo text-primary font-bold text-2xl">
              <a href="/"> PizzaHunt</a>
            </div>
            <Link href={"/"}>Home</Link>
            <Link href={""}>Menu</Link>
            <Link href={""}>About</Link>
            <Link href={""}>Contact</Link>
          </nav>
          <nav className="flex items-center gap-3 font-semibold">
            {status === "authenticated" && (
              <>
                <Link href={"/profile"}>{"Hello," + userEmail}</Link>
                <button
                  onClick={() => signOut()}
                  className="rounded-full bg-primary text-white text-sm px-6 py-2 hover:bg-red-500"
                >
                  Logout
                </button>
              </>
            )}
            {status === "unauthenticated" && (
              <>
                <Link href={"/login"}>Login</Link>
                <Link
                  href={"/register"}
                  className="rounded-full bg-primary text-white text-sm px-6 py-2 hover:bg-red-500"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </header>
      </div>
    </>
  );
}
