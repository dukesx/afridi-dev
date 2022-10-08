/* eslint-disable react-hooks/exhaustive-deps */
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Button, PasswordInput, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useEffect, useRef, useState } from "react";
import { GetStartedProps } from "./forgot-password";

const SignupTab = ({ client, colorScheme, setTab }: GetStartedProps) => {
  const [signupToken, setSignupToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const signupForm = useForm({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validate: {
      email: (val) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(val) == false
          ? "Invalid email"
          : null,

      password: (val) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g.test(
          val
        ) == false
          ? "Password must Contain atleast 8 Characters, includes at least one number and includes both lower and uppercase letters and special characters, for example #, ?, !"
          : null,

      repeatPassword: (val) => {
        if (val !== signupForm.values.password) {
          return "Passwords donot match";
        }
      },
    },
  });

  const signupCatchaRef = useRef(null);

  useEffect(() => {
    if (signupToken) {
      validResult();
    }
  }, [signupToken]);

  const validResult = async () => {
    const { error } = await client.auth.signUp({
      email: signupForm.values.email,
      password: signupForm.values.password,
      options: {
        captchaToken: signupToken,
        emailRedirectTo: "https://afridi.dev",
      },
    });

    if (error) {
      showNotification({
        title: "Error!",
        message: error.message,
        icon: <IconX />,
        color: "red",
      });
      signupForm.reset();
      setSignupToken(null);
      signupCatchaRef.current?.resetCaptcha();
      setLoading(false);
    } else {
      showNotification({
        title: "Success!",
        message: "Done! Check your email for instructions",
        icon: <IconCheck />,
        color: "teal",
      });
      signupForm.reset();
      setSignupToken(null);
      signupCatchaRef.current?.resetCaptcha();
      setLoading(false);

      setTab("sign_in");
    }
  };

  return (
    <form>
      <TextInput
        placeholder="email"
        required
        my="lg"
        radius="xl"
        label="Email"
        {...signupForm.getInputProps("email")}
      />
      <PasswordInput
        placeholder="password"
        required
        my="lg"
        radius="xl"
        label="Password"
        {...signupForm.getInputProps("password")}
      />
      <PasswordInput
        placeholder="repeat password"
        required
        my="lg"
        radius="xl"
        label="Repeat Password"
        {...signupForm.getInputProps("repeatPassword")}
      />

      <HCaptcha
        size="invisible"
        ref={signupCatchaRef}
        theme={colorScheme == "dark" ? "dark" : "light"}
        sitekey={process.env.NEXT_PUBLIC_CAPTCHA_KEY}
        onVerify={(token, ekey) => setSignupToken(token)}
      />

      <Button
        disabled={loading}
        onClick={() => {
          setLoading(true);
          const result = signupForm.validate();
          if (result.hasErrors == false) {
            signupCatchaRef.current?.execute();
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

export default SignupTab;
