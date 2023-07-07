"use client";
import { Circles } from "react-loader-spinner";

export default function Loading() {
  return (
    <Circles
      height="80"
      width="80"
      color="#FF4742"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
}
