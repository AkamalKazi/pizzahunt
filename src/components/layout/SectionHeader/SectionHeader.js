export default function SectionHeader({ subheader, mainHeader }) {
  return (
    <>
      <h3 className="uppercase text-gray-600 font-semibold">{subheader}</h3>
      <h2 className="text-primary font-bold text-4xl"> {mainHeader}</h2>
    </>
  );
}
