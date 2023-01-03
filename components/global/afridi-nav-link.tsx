import { NavLink, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Image from "next/image";
import Link from "next/link";
import { CaretRight, House } from "phosphor-react";
import { useGeneralStore } from "../../data/static/store";
import { AfridiNavLinkProps } from "../../types/general";

const AfridiNavLink: React.FC<AfridiNavLinkProps> = ({
  LeftIcon,
  RightIcon,
  className,
  label,
  color,
  active,
  children,
  imageIcon,
  href,
  sub,
}) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const toggleUnauthenticatedModal = useGeneralStore(
    (store) => store.toggleUnauthenticatedModal
  );

  return (
    <NavLink
      sx={{
        cursor: "pointer",
      }}
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
          <LeftIcon
            color={color ? theme.fn.themeColor(color) : null}
            weight={active ? "regular" : color ? "duotone" : "light"}
            size={18}
          />
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
