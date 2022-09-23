import Image from "next/image";

interface GenericAfridiImageProps {
  height: number;
  width: number;
  layout?: "fill" | "intrinsic" | "responsive";
  loading?: "lazy" | "eager";
  path: string;
}

const GenericAfridiImage = ({
  loading,
  layout,
  width,
  height,
  path,
}: GenericAfridiImageProps) => {
  return (
    <Image
      src={path}
      layout={layout}
      loading={loading}
      width={width}
      height={height}
      loader={({ src }) => src}
      alt="an image"
    />
  );
};

export default GenericAfridiImage;
