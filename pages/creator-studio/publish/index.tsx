import { Text } from "@mantine/core";
import { NextSeo } from "next-seo";
import AppWrapper from "../../../components/global/wrapper";

const CreatorStudioPublisher = () => {
  return (
    <AppWrapper activeHeaderKey="">
      <NextSeo nofollow noindex />

      <Text>Hello</Text>
    </AppWrapper>
  );
};

export default CreatorStudioPublisher;
