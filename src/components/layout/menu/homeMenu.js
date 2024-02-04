import MenuItems from "../../../components/menu/menu";
import Image from "next/image";
import SectionHeader from "../SectionHeader/SectionHeader";

Image;

export default function HomeMenu() {
  return (
    <>
      <section>
        <div className="">
          <div className="h-48 absolute left-0 -top-24 -z-40">
            <Image
              src={"/sallad1.png"}
              alt={"Sallad1"}
              width={107}
              height={195}
              objectFit={"contain"}
            />
          </div>
          <div className="h-48 absolute right-0 -top-24 -z-40 ">
            <Image
              src={"/sallad2.png"}
              alt={"sallad2"}
              width={107}
              height={195}
              objectFit={"contain"}
            />
          </div>

          <div className="text-center mb-4 ">
            <SectionHeader mainHeader={"Menu"} subheader={"Checkout"} />
          </div>
          <div className="grid grid-cols-3 mx-3 gap-4 ">
            <MenuItems />
            <MenuItems />
            <MenuItems />
            <MenuItems />
            <MenuItems />
            <MenuItems />
            <MenuItems />
            <MenuItems />
          </div>
        </div>
      </section>
    </>
  );
}
