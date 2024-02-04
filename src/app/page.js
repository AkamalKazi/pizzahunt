import Hero from "../components/layout/Hero/hero";
import SectionHeader from "../components/layout/SectionHeader/SectionHeader";
import Header from "../components/layout/header/header";
import HomeMenu from "../components/layout/menu/homeMenu";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />

      <section className="text-center my-16">
        <SectionHeader subheader={"Our story"} mainHeader={"About us"} />
        <div className="mx-auto max-w-xl mt-4 text-gray-600 flex flex-col gap-2">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
          </p>
        </div>
      </section>

      <section className="text-center my-16">
        <SectionHeader subheader={"Don't hesitate"} mainHeader={"Contact us"} />
        <div className="mt-3 underline ">
          <a className="text-3xl text-gray-600" href="tel:+9198989898">
            +91 98989898
          </a>
        </div>
      </section>
    </>
  );
}
