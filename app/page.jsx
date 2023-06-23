import Image from "next/image";
import CreateBuzz from "@components/CreateBuzz";
import Buzz from "@components/Buzz";

export default function Home() {
  return (
    <div className=" bg-[#f0f0f5] w-full h-screen flex flex-col items-center justify-start gap-5 py-5">
      <CreateBuzz />
      <Buzz />
      <Buzz />
    </div>
  );
}
