import {
  createStyles,
  Text,
  Container,
  ActionIcon,
  Group,
  Box,
  Title,
  Divider,
  Stack,
  useMantineTheme,
  Paper,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons";
import { InstagramLogo, TwitterLogo, YoutubeLogo } from "phosphor-react";
import { playfair } from "../../pages/_app";

const useStyles = createStyles((theme) => ({
  footer: {
    paddingLeft: theme.spacing.xl * 2,
    marginLeft: theme.spacing.xl * 2,
    [theme.fn.smallerThan("sm")]: {
      paddingLeft: 0,
      marginLeft: 0,
    },
    paddingTop: theme.spacing.xl * 2,
    // backgroundColor:
    //   theme.colorScheme === "dark"
    //     ? theme.colors.dark[6]
    //     : theme.colors.dark[0],
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: 160,
  },

  link: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

interface FooterLinksProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

export function FooterLinks({ data }: FooterLinksProps) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text<"a">
        key={index}
        className={classes.link}
        component="a"
        href={link.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <Paper shadow="xl">
      <footer className={classes.footer}>
        <Container className={classes.inner}>
          <div className={classes.logo}>
            <Stack
              // ml="xl"
              spacing={0}
              className="mr-auto text-center"
              align="center"
            >
              <Title order={2}>Afridi.dev</Title>
              <Divider my={5} className="w-[200px]" />
              <Text color="dimmed" size="xs">
                The Coder&apos;s Handbook
              </Text>
              <Text
                style={{
                  fontFamily: playfair.style.fontFamily,
                }}
                mt="xl"
                color="dimmed"
                size="xs"
              >
                <Text
                  weight={800}
                  style={{
                    fontFamily: playfair.style.fontFamily,
                  }}
                  component="span"
                >
                  Afridi.DEV{" "}
                </Text>
                is your favorite{" "}
                <Text
                  mr={6}
                  weight={600}
                  style={{
                    fontFamily: playfair.style.fontFamily,
                  }}
                  italic
                  component="span"
                >
                  go-to
                </Text>
                source for coding{" "}
                <Text
                  weight={600}
                  style={{
                    fontFamily: playfair.style.fontFamily,
                  }}
                  italic
                  component="span"
                >
                  news, tutorials & courses.
                </Text>
              </Text>
            </Stack>
          </div>
          <div className={classes.groups}>{groups}</div>
        </Container>
        <Container className={classes.afterFooter}>
          <Text color="dimmed" size="sm">
            © 2020 mantine.dev. All rights reserved.
          </Text>

          <Group spacing={0} className={classes.social} position="right" noWrap>
            <ActionIcon radius="xl" size="lg">
              <TwitterLogo
                size={18}
                weight="fill"
                color={theme.colors.blue[6]}
              />
            </ActionIcon>
            <ActionIcon radius="xl" size="lg">
              <YoutubeLogo
                weight="fill"
                color={
                  colorScheme == "dark"
                    ? theme.colors.red[6]
                    : theme.colors.red[6]
                }
                size={18}
              />
            </ActionIcon>
          </Group>
        </Container>
      </footer>
    </Paper>
  );
}
