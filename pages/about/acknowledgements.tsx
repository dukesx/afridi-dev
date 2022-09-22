import { Divider, List, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import AppWrapper from "../../components/global/wrapper";

const Acknowledgements = () => {
  return (
    <AppWrapper size="md" activeHeaderKey="">
      <Stack pb="xl" className="w-full" mt="xl">
        <ThemeIcon
          className="rounded-full mx-auto"
          size={100}
          radius="xl"
          variant="light"
          color="yellow"
        >
          <Text size={30}>🤝</Text>
        </ThemeIcon>
        <Title order={2} mb="xl" className="mx-auto">
          Acknowledgements
        </Title>

        <Text>
          First and foremost{" "}
          <Text underline component="span" className="mr-2" weight={600}>
            Shoutout to the Open source community ❤️
          </Text>
          for the excellent efforts they have made by contributing nifty little
          packages to make our day to day lives easier.
          <Title mt="xl" order={4}>
            Special Thanks 👏
          </Title>
          <Divider mb="xl" mt="xs" />
          <List spacing="xs">
            <List.Item>
              This Website uses <a href="https://supabase.io">Supabase</a> for
              SUPA-FAST Backend Operations
            </List.Item>
            <List.Item>
              All illustrations used in this website are provided by{" "}
              <a href="https://storyset.com">Storyset</a> by
              <a className="ml-1" href="https://freepik.com">
                Freepik
              </a>
            </List.Item>
            <List.Item>
              This Website is based on <a href="https://nextjs.org">NextJS</a>{" "}
              by <a href="https://vercel.com">Vercel</a>
            </List.Item>
            <List.Item>
              This Website&apos;s Design System and Components are Built using{" "}
              <a href="https://mantine.dev">Mantine</a> and
              <a className="ml-1" href="https://ui.mantine.dev">
                Mantine UI
              </a>
            </List.Item>
            <List.Item>
              This Website uses an Excellent Data Table called{" "}
              <Text
                href="https://github.com/icflorescu/mantine-datatable"
                component="a"
                weight={500}
                color="blue"
                underline
              >
                Mantine Data Table
              </Text>{" "}
              Created by <a href="https://github.com/icflorescu">@icflorescu</a>
            </List.Item>
            <List.Item>
              This Website uses
              <Text weight={500} component="span" className="ml-1">
                React Markdown Renderer
              </Text>{" "}
              Created by{" "}
              <a
                className="mr-1"
                href="https://github.com/remarkjs/react-markdown"
              >
                @remarkjs
              </a>
              for Markdown Parsing Articles & Author Bio.
            </List.Item>
            <List.Item>
              This Website uses
              <Text weight={500} component="span" className="ml-1">
                Toast UI Markdown Editor
              </Text>{" "}
              Created by{" "}
              <a className="mr-1" href="https://ui.toast.com/tui-editor">
                @nhn
              </a>
              for Article Edits & Creation
            </List.Item>
            <List.Item>
              Images Optimized and Delivered by
              <a className="ml-1" href="https://imagekit.io">
                ImageKit
              </a>{" "}
              from <a href="https://bunny.net">BunnyCDN</a>
            </List.Item>
            <List.Item>
              This Website&apos;s Development could not be faster without{" "}
              <a href="https://tailwindcss.com">TailwindCSS By Tailwind Labs</a>
            </List.Item>
            <List.Item>
              Seamless End to End Testing done on{" "}
              <a href="https://playwright.dev">
                PlayWright by Microsoft Open Source Team
              </a>
            </List.Item>
            <List.Item>
              This Website uses Beautiful icons created by{" "}
              <a href="https://tabler-icons.io/">Tabler Icons</a>
            </List.Item>
            <List.Item>
              This Website parses and displays Date using a nifty little library
              called <a href="https://github.com/date-fns/date-fns">Date-FNS</a>
            </List.Item>
            <List.Item>
              This website uses{" "}
              <a href="https://github.com/pmndrs/zustand">Zustand</a> as Global
              State Management Library
            </List.Item>
            <List.Item>
              This website uses{" "}
              <a href="https://recharts.org/en-US">ReCharts</a> Library to show
              Charts for Analytics
            </List.Item>
            <List.Item>
              This website uses{" "}
              <a href="https://github.com/iamvishnusankar/next-sitemap">
                Next-Sitemap By @vishnusankar
              </a>{" "}
              For Handling Sitemap Generation
            </List.Item>
            <List.Item>
              This website uses{" "}
              <a href="https://github.com/garmeeh/next-seo">
                Next SEO by @garmeeh
              </a>{" "}
              to handle SEO.
            </List.Item>
            <List.Item>
              This website uses{" "}
              <a href="https://plaiceholder.co/">Plaiceholder</a> Library to
              Resize and Generate Blur Image Placeholders on the Go!
            </List.Item>
            <List.Item>
              This Website uses{" "}
              <a href="https://gitlab.com/catamphetamine/country-flag-icons">
                Country Flag Icons
              </a>{" "}
              Library to display Flags for location
            </List.Item>
            <List.Item>
              This website uses{" "}
              <a href="https://github.com/danbovey/react-infinite-scroller">
                React Infinite Scroller
              </a>{" "}
              library to load infinite articles lists inside article feed.
            </List.Item>
          </List>
        </Text>
      </Stack>
    </AppWrapper>
  );
};

export default Acknowledgements;
