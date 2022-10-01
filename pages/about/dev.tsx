import { Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons";
import { NextSeo } from "next-seo";
import MarkDownRenderer from "../../components/global/markdown-renderer";
import AppWrapper from "../../components/global/wrapper";

const AboutDev = () => {
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
        <MarkDownRenderer>
          {`
#### Introduction
I am a developer from Pakistan with expertise in Javascript and Flutter. I am well versed in technologies such as 
* Serverless Environments
* Edge Environments
* Amazon Web Services such as Dynamo DB, Lambda Functions, Amplify
* Apache & NginX
* Docker
* Linux
* Swift & Kotlin
* Javascript (Vanilla & Frameworks such as Svelte, React, Next, Astro, Solid)
* Dart & Flutter

 I have worked on different projects of variable scales, ranging from as small as a personal portfolio to as large as a complete user and project management system. 

I currently hold a bachelors and masters degree in Physical therapy and work as both a Doctor of Physical therapy & an amateur programmer. This website has been designed by me and has been made open source at my Github repository.

##### Follow Me
![GitHub followers](https://img.shields.io/github/followers/dukesx?style=social) ![Twitter Follow](https://img.shields.io/twitter/follow/fitliverehab?style=social)

##### Afridi.Dev Repo Stats
![GitHub package.json dynamic](https://img.shields.io/github/package-json/author/dukesx/afridi-dev) [![GitHub license](https://img.shields.io/github/license/dukesx/afridi-dev)](https://github.com/dukesx/afridi-dev/blob/main/LICENSE) [![GitHub issues](https://img.shields.io/github/issues/dukesx/afridi-dev)](https://github.com/dukesx/afridi-dev/issues) [![GitHub stars](https://img.shields.io/github/stars/dukesx/afridi-dev)](https://github.com/dukesx/afridi-dev/stargazers) ![GitHub watchers](https://img.shields.io/github/watchers/dukesx/afridi-dev?style=social) ![GitHub forks](https://img.shields.io/github/forks/dukesx/afridi-dev?style=social) ![GitHub contributors](https://img.shields.io/github/contributors/dukesx/afridi-dev)

My favourite quote is: 
> Any fool can write code that a computer can understand. Good programmers write code that humans can understand. 
> 
> – Martin Fowler

#### About Github
Don't forget to check it out below:
https://github.com/dukesx/afridi-dev
`}
        </MarkDownRenderer>
      </Stack>
    </AppWrapper>
  );
};

export default AboutDev;
