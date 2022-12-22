import { NavLink, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Image from "next/image";
import Link from "next/link";
import { CaretRight, House } from "phosphor-react";
import { AfridiNavLinkProps } from "../../types/general";

const AfridiNavLink: React.FC<AfridiNavLinkProps> = ({
  LeftIcon,
  RightIcon,
  className,
  label,
  active,
  children,
  imageIcon,
  href,
  sub,
}) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  return (
    <NavLink
      href={href ?? "#"}
      component={children ? "div" : Link}
      className={(className ?? " ") + sub ? "" : active ? " font-medium " : " "}
      active={active ?? false}
      p={sub ? "xs" : "sm"}
      variant="light"
      icon={
        imageIcon ? (
          <Image src={LeftIcon} alt="" height={20} width={20} />
        ) : sub ? null : LeftIcon ? (
          <LeftIcon weight={active ? "regular" : "light"} size={18} />
        ) : null
      }
      rightSection={
        RightIcon ? (
          <RightIcon weight="regular" size={12} />
        ) : sub ? null : (
          <CaretRight
            weight="regular"
            color={
              colorScheme == "dark"
                ? theme.colors.gray[4]
                : theme.colors.dark[4]
            }
            size={12}
          />
        )
      }
      label={label}
    >
      {children}
    </NavLink>
  );
};

export default AfridiNavLink;