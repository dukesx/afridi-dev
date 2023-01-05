import { Loader } from "@mantine/core";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import ClientOnly from "../client-only";
import AfridiFlick from "./carousel";

const AfridiFlickCarousel = () => {
  const AfridiFlick = dynamic(() => import("./carousel"), {
    ssr: false,
  });
  return (
    <Suspense>
      <AfridiFlick />
    </Suspense>
  );
};

export default AfridiFlickCarousel;
