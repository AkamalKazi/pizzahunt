import RightIcon from "../../../components/icons/right";
import Image from "next/image";
export default function Hero() {
  return (
    <>
      <section className="grid  pl-4 mx-auto grid-cols-2 mt-8">
        <div className="py-12 leading-7">
          <h1 className="text-4xl font-semibold">
            Everything is better with{" "}
            <span className="font-bold text-primary font-lg ">Pizza</span>
          </h1>
          <p className="my-4 text-gray-600">
            Pizza is the missing piece that makes every day complete, a simple
            yet delicious joy in life
          </p>
          <div className="flex gap-2">
            <a
              href=""
              className="rounded-full uppercase flex items-center gap-2 bg-primary text-white text-sm py-3 px-6 hover:bg-red-600"
            >
              Order Now
              <RightIcon />
            </a>
            <a
              href=""
              className="rounded-full flex items-center gap-2 text-white px-4 py-2 bg-gray-400 text-sm hover:bg-gray-500"
            >
              Learn More
              <RightIcon />
            </a>
          </div>
        </div>
        <div className="relative">
          <Image
            src={"/pizza.png"}
            layout="fill"
            objectFit={"contain"}
            alt={"Pizza"}
          />
        </div>
      </section>
    </>
  );
}
