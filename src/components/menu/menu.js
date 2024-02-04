import Image from "next/image";

export default function MenuItems() {
  return (
    <div className="bg-gray-200 p-4 group rounded-lg text-center hover:cursor-pointer hover:bg-white transition-all hover:drop-shadow-2xl  hover:-translate-y-1 hover:z-40">
      <div className="text-center">
        <Image
          src="/pizza.png"
          className="max-h-auto max-h-24 mx-auto block"
          alt="Pizza"
          width={100}
          height={100}
        />
      </div>
      <h4 className="font-semibold text-xl my-2">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">
        lorem ipsum dolor sit am ipsum dolor sit am lorem ipsum dolor sit am
        ipsum dol
      </p>
      <button className="bg-primary rounded-full  mt-4 px-8 py-2 text-sm  text-white ">
        Add to cart $12
      </button>
    </div>
  );
}
