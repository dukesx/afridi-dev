/* eslint-disable react-hooks/exhaustive-deps */
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Button, ColorScheme, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { SupabaseClient } from "@supabase/supabase-js";
import { IconCheck, IconX } from "@tabler/icons";
import { useEffect, useRef, useState } from "react";

export interface GetStartedProps {
  client: SupabaseClient;
  colorScheme: ColorScheme;
  setTab: Function;
}

const ForgotPasswordTab = ({
  client,
  colorScheme,
  setTab,
}: GetStartedProps) => {
  const [loading, setLoading] = useState(false);
  const forgottenForm = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (val) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(val) == false
          ? "Invalid email"
          : null,
    },
  });
  const forgottenCaptchaRef = useRef(null);
  const [forgottenToken, setForgottenToken] = useState(null);
  const forgottenOnSubmit = () => {
    // this reaches out to the hcaptcha library and runs the
    // execute function on it. you can use other functions as well
    // documented in the api:
    // https://docs.hcaptcha.com/configuration#jsapi
    forgottenCaptchaRef.current.execute();
  };

  useEffect(() => {
    if (forgottenToken) {
      validResult();
    }
  }, [forgottenToken]);

  const validResult = async () => {
    const { error } = await client.auth.resetPasswordForEmail(
      forgottenForm.values.email,
      {
        captchaToken: forgottenToken,
      }
    );

    if (error) {
      showNotification({
        title: "Error!",
        message: error.message,
        icon: <IconX />,
        color: "red",
      });
      setForgottenToken(null);
      forgottenCaptchaRef.current?.resetCaptcha();
      forgottenForm.reset();
      setLoading(false);
    } else {
      showNotification({
        title: "Success!",
        message: "Password has been sent to email",
        icon: <IconCheck />,
        color: "teal",
      });
      forgottenForm.reset();
      setForgottenToken(null);
      forgottenCaptchaRef.current?.resetCaptcha();
      setLoading(false);
    }
  };

  return (
    <form>
      <TextInput
        required
        placeholder="the email you used to register the account with"
        radius="xl"
        label="Your email"
        mb="xl"
        {...forgottenForm.getInputProps("email")}
      />

      <HCaptcha
        size="invisible"
        ref={forgottenCaptchaRef}
        theme={colorScheme == "dark" ? "dark" : "light"}
        sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
        onVerify={(token, ekey) => setForgottenToken(token)}
      />

      <Button
        disabled={loading}
        onClick={() => {
          setLoading(true);
          const result = forgottenForm.validate();
          if (result.hasErrors == false) {
            forgottenCaptchaRef.current?.execute();
          } else {
            setLoading(false);
          }
        }}
        loading={loading}
        radius="xl"
        variant="light"
        mt="sm"
        fullWidth
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
        onClick={() => setTab("sign_in")}
      >
        Already have an account?{" "}
        <Text weight={600} component="span" underline>
          Sign in
        </Text>
      </Text>
    </form>
  );
};

export default ForgotPasswordTab;
