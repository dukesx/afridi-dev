import dynamic from "next/dynamic";

export const AfridiPrism = dynamic(
  () => import("@mantine/prism").then((res) => res.Prism),
  {
    ssr: false,
  }
);
