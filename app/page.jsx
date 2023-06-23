import Image from "next/image";
import CreateBuzz from "@components/CreateBuzz";

export default function Home() {
  return (
    <div className=" bg-[#f0f0f5] w-full h-screen flex items-start justify-center py-5">
      <CreateBuzz />
    </div>
  );
}
