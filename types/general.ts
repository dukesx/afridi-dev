import type { MantineColor } from "@mantine/core";
import type { SelectItemsProps } from "@mantine/core/lib/Select/SelectItems/SelectItems";
import { IconProps } from "phosphor-react";

export type AfridiNavLinkProps = {
  LeftIcon?:
    | React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
      >
    | any;
  RightIcon?: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  imageIcon?: boolean;
  className?: string;
  label: string;
  active?: boolean;
  children?: any;
  sub?: boolean;
  href: string;
};

export interface SearchItemProps extends SelectItemsProps {
  title: string;
  description: string;
  cover: string;
  value?: string;
}

export type AppWrapperProps = {
  children: any;
  aside?: boolean;
  activeKey: string;
};

export interface AfridiEmptyPlaceholderProps {
  width?: number;
  height?: number;
  title?: string;
  description?: string;
}

export interface AfridiLoadingProps {
  title?: string;
  description?: string;
}

export interface AfridiSearchArticleListItemProps {
  title: string;
  description: string;
  cover: string;
}
