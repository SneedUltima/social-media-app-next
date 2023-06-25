"use client";
import Buzzes from "@components/Buzzes";
import CreateBuzz from "@components/CreateBuzz";
import { useEffect, useState } from "react";

export default function Home() {
  const [buzzes, setBuzzes] = useState([]);

  useEffect(() => {
    (async () => {
      const getBuzzes = await fetch("/api/buzz");
      const getBuzzesJson = await getBuzzes.json();

      setBuzzes(getBuzzesJson);
    })();
  }, []);

  return (
    <div className=" bg-[#f0f0f5] w-full h-full flex flex-col items-center justify-start gap-5 py-5">
      <CreateBuzz setBuzzes={setBuzzes} />
      <Buzzes buzzes={buzzes} setBuzzes={setBuzzes} />
    </div>
  );
}
