import { ClassNames } from "@emotion/react";
import {
  createStyles,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IKImage } from "imagekitio-react";

export enum AfridiImageLoadingEnum {
  LAZY = "lazy",
  NORMAL = "",
}

interface AfridiImageProps {
  width: number | string;
  height: number;
  path: string;
  loading?: AfridiImageLoadingEnum;
  style?: object;
  className?: string;
}
const AfridiImage: React.FC<AfridiImageProps> = ({
  width,
  height,
  loading,
  path,
  style,
  className,
}) => {
  const theme = useMantineTheme();
  const AfridiImageClasses = createStyles((theme) => ({
    wrapper: {
      height: height,
      width: width,
    },
  }));

  const { classes } = AfridiImageClasses();
  const { colorScheme } = useMantineColorScheme();
  return (
    <div className={classes.wrapper + " " + (className ?? "")} style={style}>
      <IKImage
        height={height}
        width={width}
        path={path}
        loading={loading ?? ""}
        transformation={[
          typeof width == "string"
            ? {
                height: height + "px",
                crop: "maintain_ratio",
              }
            : {
                height: height + "px",
                width: width + "px",
                crop: "maintain_ratio",
              },
        ]}
        lqip={{ active: true, quality: 50, blur: 60 }}
        style={{
          width: typeof width == "string" ? width : width + "px",
          height: height + "px",
          objectFit: "cover",
          ...style,
        }}
      />
    </div>
  );
};

export default AfridiImage;
