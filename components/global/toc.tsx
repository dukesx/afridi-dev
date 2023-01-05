import { useState } from "react";
import { createStyles, Box, Text, Group, Card, Divider } from "@mantine/core";
import { IconAnchor, IconListDetails, IconListSearch } from "@tabler/icons";
import slugify from "slugify";

const LINK_HEIGHT = 40;
const INDICATOR_SIZE = 10;
const INDICATOR_OFFSET = (LINK_HEIGHT - INDICATOR_SIZE) / 2;

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "block",
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    lineHeight: `${LINK_HEIGHT}px`,
    fontSize: theme.fontSizes.sm,
    height: LINK_HEIGHT,
    borderTopRightRadius: theme.radius.sm,
    borderBottomRightRadius: theme.radius.sm,
    borderLeft: `2px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    fontWeight: 500,
    color: theme.colors.blue[theme.colorScheme === "dark" ? 3 : 7],
  },

  links: {
    position: "relative",
  },

  indicator: {
    transition: "transform 150ms ease",
    border: `2px solid ${
      theme.colors.blue[theme.colorScheme === "dark" ? 3 : 7]
    }`,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    height: INDICATOR_SIZE,
    width: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE,
    position: "absolute",
    left: -INDICATOR_SIZE / 2 + 1,
  },
}));

interface TableOfContentsFloatingProps {
  links: { label: string; link: string; order: number }[];
  activeIndex?: any;
}

export function TableOfContentsFloating({
  links,
}: TableOfContentsFloatingProps) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState<any>(0);

  var indices = [];

  const items = links.map((item, index) => {
    if (item.order == 1) {
      indices.push({ title: item.label, index: index });
    }
    return (
      <Text
        component="a"
        href={item.link}
        onClick={(event) => {
          setActive(index);
        }}
        lineClamp={1}
        key={item.label}
        className={cx(classes.link, {
          [classes.linkActive]: active === index,
        })}
        sx={(theme) => ({ paddingLeft: item.order * theme.spacing.md })}
      >
        <Group spacing="xs">{item.label}</Group>
      </Text>
    );
  });

  return (
    <Card mt={0}>
      <Group mb="md">
        <IconAnchor size={18} stroke={1.5} />
        <Text weight={700}>Navigate to</Text>
      </Group>
      <div className={classes.links}>
        <div
          className={classes.indicator}
          style={{
            transform: `translateY(${
              active * LINK_HEIGHT + INDICATOR_OFFSET
            }px)`,
          }}
        />
        {items}
      </div>
    </Card>
  );
}
