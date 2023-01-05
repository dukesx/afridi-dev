import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import Head from "next/head";
import { Arrow, Fade } from "@egjs/flicking-plugins";
// import "@egjs/flicking-plugins/dist/arrow.css";
import "@egjs/react-flicking/dist/flicking.css";
import "@egjs/flicking-plugins/dist/flicking-plugins.css";

import { createRef, Fragment, useState } from "react";
import { ArrowLeft, CaretLeft, CaretRight, Plus } from "phosphor-react";

const AfridiFlick = () => {
  const [index, setIndex] = useState(0);
  console.log(index);
  const fade = new Fade();
  fade.scale = 1.1;
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Group maw="97%" mx="auto" sx={{}} className="flick-bod">
        <Flicking
          style={{}}
          plugins={[new Arrow(), fade]}
          moveType="freeScroll"
          onChanged={(e) => {
            setIndex(e.index);
            console.log(index);
          }}
          onPanelChange={(e) => {
            console.log(e.added);
          }}
          circular
          defaultIndex={0}
          hideBeforeInit={true}
        >
          <Text
            weight={600}
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            For You
          </Text>
          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Artificial Intelligence
          </Text>

          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Productivity
          </Text>

          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Neuroscience
          </Text>

          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Cryptocurrency
          </Text>

          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>

          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>

          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>

          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>
          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>
          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>
          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>
          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>
          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>
          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>
          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>
          <Text
            size="sm"
            color="dark.3"
            mt="sm"
            className="button mr-2 is-white"
          >
            Following
          </Text>

          <ViewportSlot>
            {index == 0 ? (
              <span className="flicking-arrow-prev !top-0">
                <ActionIcon variant="transparent" color="gray.6" mt={41}>
                  <Plus size={20} />
                </ActionIcon>
              </span>
            ) : (
              <span className="flicking-arrow-prev !top-0">
                <ActionIcon variant="transparent" color="gray.6" mt={41}>
                  <CaretLeft size={20} />
                </ActionIcon>
              </span>
            )}
            <span className="flicking-arrow-next !top-0">
              <ActionIcon variant="transparent" color="gray.6" mt={41}>
                <CaretRight size={20} />
              </ActionIcon>
            </span>
          </ViewportSlot>
        </Flicking>
      </Group>
      <Divider
        mt={15}
        color={"gray.2"}
        mr="7%"
        ml="4%"
        sx={{
          maxWidth: "95%",
        }}
      />
    </div>
  );
};

export default AfridiFlick;
