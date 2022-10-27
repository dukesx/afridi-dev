import {
  Stack,
  Text,
  ThemeIcon,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import { IconUserCircle } from "@tabler/icons";
import { NextSeo } from "next-seo";
import AppWrapper from "../../components/global/wrapper";
import { supabase } from "../../utils/supabaseClient";

const AboutDev = ({ bio }) => {
  console.log(bio);
  return (
    <AppWrapper size="md" activeHeaderKey="">
      <NextSeo
        title="About the DEV | Afridi.dev"
        description="About the DEV behind Afridi.dev"
        canonical="https://afridi.dev/about/dev"
        openGraph={{
          url: "https://afridi.dev/about/acknowledgements",
          title: "About the DEV",
          description: "About the DEV behind Afridi.dev",
          site_name: "Afridi.dev",
          images: [
            {
              url: "https://ik.imagekit.io/afrididotdev/tr:w-800/afridi-dev-og-about-dev.png",
              width: 1200,
              height: 630,
              alt: "About DEV - Afridi.dev",
              type: "image/jpeg",
            },
            {
              url: "https://ik.imagekit.io/afrididotdev/tr:w-800/afridi-dev-dark.png",
              width: 800,
              height: 800,
              alt: "Afridi.DEV Cover Image - Dark",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@afridi.dev",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Stack className="w-full" mt="xl">
        <ThemeIcon
          className="rounded-full mx-auto"
          size={100}
          radius="xl"
          variant="light"
        >
          <IconUserCircle size={40} />
        </ThemeIcon>
        <Title mb="xl" className="mx-auto">
          About The Dev
        </Title>
      </Stack>

      <TypographyStylesProvider>
        <div dangerouslySetInnerHTML={{ __html: bio ?? "" }} />
      </TypographyStylesProvider>
    </AppWrapper>
  );
};

export default AboutDev;

export const getStaticProps = async () => {
  const { data, error } = await supabase
    .from("authors")
    .select("bio")
    .eq("id", "49d746ab-60bf-4b1d-aaab-7524d40bd402");

  console.log(data);
  console.log(error);

  return {
    props: {
      bio: data[0].bio ?? "",
    },
  };
};
