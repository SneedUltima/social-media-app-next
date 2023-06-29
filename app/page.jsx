"use client";
import Buzzes from "@components/Buzzes";
import Loading from "./loading";
import CreateBuzz from "@components/CreateBuzz";
import { useEffect, useState } from "react";
import { getProviders, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const [buzzes, setBuzzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("START");
    (async () => {
      const getBuzzes = await fetch("/api/buzz");
      const getBuzzesJson = await getBuzzes.json();

      setBuzzes(getBuzzesJson);
      console.log("SUCCESS");
      setLoading(false);
    })();
  }, []);

  return (
    <div
      className={
        loading
          ? " bg-[#f0f0f5] w-full h-screen flex flex-col items-center justify-start gap-5 py-5"
          : " bg-[#f0f0f5] w-full h-full flex flex-col items-center justify-start gap-5 py-5"
      }
    >
      {session?.user && <CreateBuzz setBuzzes={setBuzzes} />}
      {loading && <Loading />}
      <Buzzes buzzes={buzzes} setBuzzes={setBuzzes} />
    </div>
  );
}
