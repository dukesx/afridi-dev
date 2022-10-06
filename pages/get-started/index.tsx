/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Center,
  Checkbox,
  Group,
  Input,
  List,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

import Image from "next/image";
import AppWrapper from "../../components/global/wrapper";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IconCheck, IconX } from "@tabler/icons";
import TeamWork from "../../public/team-work.svg";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import GoogleIcon from "../../public/google.png";
import DiscordIcon from "../../public/discord.png";
import GithubIcon from "../../public/github.svg";
import GitlabIcon from "../../public/gitlab.svg";
import SlackIcon from "../../public/slack.png";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect, useRef, useState } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import ForgotPasswordTab from "../../components/get-started/forgot-password";
import SignupTab from "../../components/get-started/sign-up";
import Custom500 from "../500";

const GetStarted = () => {
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const mobile = useMediaQuery("(min-width: 550px", false);
  const [tab, setTab] = useState("sign_in");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useLocalStorage({
    key: "remember-me",
    defaultValue: "",
  });
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const [signinToken, setSigninToken] = useState(null);
  const signinCaptchaRef = useRef(null);

  useEffect(() => {
    if (signinToken) {
      validResult();
    }
  }, [signinToken]);

  const validResult = async () => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: form.values.email,
      password: form.values.password,
      options: {
        captchaToken: signinToken,
      },
    });

    if (error) {
      showNotification({
        title: "Error!",
        message: error.message,
        icon: <IconX />,
        color: "red",
      });
      form.reset();
      setSigninToken(null);
      signinCaptchaRef.current?.resetCaptcha();
      setLoading(false);
    } else {
      showNotification({
        title: "Success!",
        message: "Done! Check your email for instructions",
        icon: <IconCheck />,
        color: "teal",
      });
      form.reset();
      setSigninToken(null);
      signinCaptchaRef.current?.resetCaptcha();
      setLoading(false);

      document.location = "/";
    }
  };

  useEffect(() => {
    form.setFieldValue("email", rememberMe);
  }, [rememberMe]);

  //
  //
  //
  return (
    <AppWrapper size="md" activeHeaderKey="">
      <Card className="w-full">
        <Group className="w-full" p="sm" grow noWrap>
          {mobile ? (
            <Stack className="max-w-[450px] relative hidden xs:flex">
              <Image
                priority
                alt=""
                layout="responsive"
                width={450}
                height={450}
                src={TeamWork}
              />
            </Stack>
          ) : null}
          <div className="w-full">
            <Group
              className="w-full"
              mt="xl"
              mb={50}
              align="center"
              position="center"
            >
              <Button
                className="rounded-full px-0.5 border-0"
                radius="xl"
                variant="default"
                onClick={async () => {
                  await supabaseClient.auth.signInWithOAuth({
                    provider: "google",
                  });
                }}
              >
                <Image
                  className="mr-0.5"
                  src={GoogleIcon}
                  alt=""
                  priority
                  width={30}
                  height={30}
                />
              </Button>
              <Button
                variant="default"
                className="rounded-full px-0.5 border-0"
                radius="xl"
                onClick={async () => {
                  await supabaseClient.auth.signInWithOAuth({
                    provider: "gitlab",
                  });
                }}
              >
                <Image
                  src={GitlabIcon}
                  alt=""
                  priority
                  width={33}
                  height={33}
                />
              </Button>

              <Button
                className="rounded-full px-2 border-0"
                radius="xl"
                variant={colorScheme == "dark" ? "white" : "default"}
                onClick={async () => {
                  await supabaseClient.auth.signInWithOAuth({
                    provider: "github",
                  });
                }}
              >
                <Image
                  src={GithubIcon}
                  alt=""
                  priority
                  width={colorScheme == "dark" ? 20 : 26}
                  height={colorScheme == "dark" ? 20 : 25}
                />
              </Button>
              <Button
                onClick={async () => {
                  await supabaseClient.auth.signInWithOAuth({
                    provider: "slack",
                  });
                }}
                className="rounded-full px-1.5 border-0"
                radius="xl"
                variant="default"
              >
                <Image src={SlackIcon} alt="" priority width={23} height={23} />
              </Button>
              <Button
                onClick={async () => {
                  await supabaseClient.auth.signInWithOAuth({
                    provider: "slack",
                  });
                }}
                className="rounded-full px-0.5 border-0"
                radius="xl"
                variant="default"
              >
                <Image
                  src={DiscordIcon}
                  alt=""
                  priority
                  width={32}
                  height={32}
                />
              </Button>
            </Group>

            {tab == "sign_in" ? (
              <Stack>
                <form
                  onSubmit={form.onSubmit(async (val) => {
                    const { error, data } =
                      await supabaseClient.auth.signInWithPassword({
                        email: val.email,
                        password: val.password,
                      });

                    if (error) {
                      showNotification({
                        title: "Error!",
                        message: error.message,
                        icon: <IconX />,
                        color: "red",
                      });
                    } else {
                      showNotification({
                        title: "Success!",
                        message: "Logged in successfully",
                        icon: <IconCheck />,
                        color: "teal",
                      });
                    }
                  })}
                >
                  <TextInput
                    placeholder="email"
                    required
                    {...form.getInputProps("email")}
                    mb="xl"
                    radius="xl"
                    label="Email"
                  />
                  <PasswordInput
                    placeholder="password"
                    required
                    {...form.getInputProps("password")}
                    mb="xl"
                    radius="xl"
                    label="Password"
                  />
                  <Group mt={30} mb={30} position="apart">
                    <Checkbox
                      checked={rememberMe ? true : false}
                      onChange={(event) => {
                        if (event.currentTarget.checked) {
                          if (
                            form.values.email &&
                            form.values.email.length > 3
                          ) {
                            setRememberMe(form.values.email);
                          }
                        } else {
                          setRememberMe(null);
                        }
                      }}
                      label="Remember me"
                    />

                    <Text
                      onClick={() => {
                        setTab("forgot");
                      }}
                      color="dimmed"
                      className="cursor-pointer"
                      align="center"
                      // underline
                      size="sm"
                    >
                      Forgot password?
                    </Text>
                  </Group>

                  <HCaptcha
                    size="invisible"
                    ref={signinCaptchaRef}
                    theme={colorScheme == "dark" ? "dark" : "light"}
                    sitekey="b2d3efbe-b36a-43f7-bcfd-785299a19a06"
                    onVerify={(token, ekey) => setSigninToken(token)}
                  />
                  <Button
                    disabled={loading}
                    onClick={() => {
                      setLoading(true);
                      const result = form.validate();
                      if (result.hasErrors == false) {
                        signinCaptchaRef.current?.execute();
                      } else {
                        setLoading(false);
                      }
                    }}
                    fullWidth
                    mt="xl"
                    radius="xl"
                    variant="light"
                    loading={loading}
                  >
                    Submit
                  </Button>

                  <Text
                    color="dimmed"
                    className="cursor-pointer"
                    mt="xl"
                    mb="xl"
                    align="center"
                    // underline
                    size="sm"
                    onClick={() => setTab("sign_up")}
                  >
                    Don&apos;t have an account?{" "}
                    <Text weight={600} component="span" underline>
                      Sign up
                    </Text>
                  </Text>
                </form>
              </Stack>
            ) : tab == "forgot" ? (
              <ForgotPasswordTab
                client={supabaseClient}
                colorScheme={colorScheme}
                setTab={setTab}
              />
            ) : tab == "sign_up" ? (
              <SignupTab
                client={supabaseClient}
                colorScheme={colorScheme}
                setTab={setTab}
              />
            ) : null}
          </div>
        </Group>
      </Card>
    </AppWrapper>
  );
};

export default GetStarted;
