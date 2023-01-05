import type { MantineColor } from "@mantine/core";
import { ReactNode } from "react";

export interface AfridiArticleFeedSquareWidgetListItemProps {
  views?: number;
  title: string;
  textColor?: MantineColor;
}

export interface AfridiArticleFeedSquareWidgetProps {
  title: ReactNode | string;
  data: Array<any>;
  color: MantineColor;
  textColor?: MantineColor;
}
