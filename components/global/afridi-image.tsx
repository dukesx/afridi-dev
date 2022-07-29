import { ClassNames } from "@emotion/react";
import { createStyles, useMantineTheme } from "@mantine/core";
import { IKImage } from "imagekitio-react";

export enum AfridiImageLoadingEnum {
  LAZY = "lazy",
  NORMAL = "",
}

interface AfridiImageProps {
  width: number;
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
  return (
    <div className={classes.wrapper + " " + className} style={style}>
      <IKImage
        height={height}
        width={width}
        path={path}
        loading={loading ?? ""}
        transformation={[
          {
            height: height + "px",
            width: width + "px",
          },
        ]}
        lqip={{ active: true, quality: 30, blur: 20 }}
        style={{
          width: width + "px",
          height: height + "px",
          ...style,
        }}
      />
    </div>
  );
};

export default AfridiImage;
