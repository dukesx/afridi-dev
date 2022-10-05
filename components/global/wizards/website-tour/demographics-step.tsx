/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Group,
  Loader,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useEffect, useState } from "react";
import { WelcomeWizardStepProps } from "./tag-step";
import { countries } from "../../../../data/static/countries";
import { IconArrowLeft, IconAt, IconCheck, IconX } from "@tabler/icons";
import { useDebouncedState } from "@mantine/hooks";

const DemographicsStep = ({
  step,
  setStep,
  session,
  client,
  theme,
}: WelcomeWizardStepProps) => {
  const [step2Loading, setStep2Loading] = useState(false);
  const [username, setUsername] = useDebouncedState("", 200);
  const [usernameAllowed, setUsernameAllowed] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const form = useForm({
    initialValues: {
      full_name: "",
      location: "",
      username: "",
      gender: "",
    },

    validate: {
      full_name: (val) => (val.length <= 0 ? "Name cannot be empty!" : null),
      username: (val) =>
        val.length <= 0
          ? "Username cannot be empty!"
          : !usernameAllowed
          ? "Username not available. Please try again"
          : val.length < 5
          ? "Username must be atleast 5 words"
          : null,
    },
  });

  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    image: string;
    label: string;
    code: string;
  }

  const newCountrues = [];

  countries.map((mapped) =>
    newCountrues.push({
      label: mapped.name,
      code: mapped.code,
      value: mapped.name.toLocaleLowerCase() + "-" + mapped.code,
    })
  );

  // eslint-disable-next-line react/display-name
  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, code, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group>
          <span className={`flag:${code}`} />
          <Text size="sm">{label}</Text>
        </Group>
      </div>
    )
  );

  const checkUsername = async () => {
    setCheckingUsername(true);
    const { error, data, count } = await client
      .from("authors")
      .select("username", {
        count: "exact",
      })
      .eq("username", username);

    if (!error) {
      if (count == 1) {
        setUsernameAllowed(false);
      } else {
        setUsernameAllowed(true);
        form.setFieldValue("username", username);
      }
      setCheckingUsername(false);
    } else {
      setCheckingUsername(false);
      setUsernameAllowed(false);
    }
  };

  useEffect(() => {
    checkUsername();
  }, [username]);

  useEffect(() => {
    if (form.errors.username) {
      setUsernameAllowed(false);
    }
  }, [form.errors.username]);

  return (
    <Stack spacing={0} align="center" className="">
      <Text weight={500} size={40}>
        Introduce Yourself 😊
      </Text>
      <Text mb={30} size="sm" color="dimmed">
        Details will later be utilised in SEO, freelance contracts, payouts,
        etc.
      </Text>

      <form
        onSubmit={form.onSubmit(async (val) => {
          setStep2Loading(true);
          const { error } = await client
            .from("authors")
            .update({
              full_name: val.full_name,
              location: val.location,
              username: val.username,
              gender: val.gender,
            })
            .eq("id", session.user.id);

          if (!error) {
            setStep2Loading(false);
            setStep(2);
          }
        })}
        className="max-w-[400px] w-full"
      >
        <TextInput
          placeholder="John Doe"
          styles={{
            label: {
              fontSize: theme.fontSizes.sm,
            },
          }}
          required
          my="sm"
          label="Full Name"
          {...form.getInputProps("full_name")}
        />

        <Select
          required
          placeholder="Your Gender"
          label="Gender"
          data={["Male", "Female", "Transexual"]}
          {...form.getInputProps("gender")}
        />
        <TextInput
          placeholder="Choose a unique username"
          styles={{
            label: {
              fontSize: theme.fontSizes.sm,
            },
          }}
          error={form.errors.username}
          icon={<IconAt strokeWidth={1.4} size={18} />}
          required
          rightSection={
            !checkingUsername ? (
              usernameAllowed ? (
                <ThemeIcon color="teal" size="sm" radius="xl">
                  <IconCheck size={14} />
                </ThemeIcon>
              ) : (
                <ThemeIcon color="red" size="sm" radius="xl">
                  <IconX size={14} />
                </ThemeIcon>
              )
            ) : (
              <Loader size="xs" color="cyan" />
            )
          }
          my="sm"
          label="Username"
          onChange={(val) => {
            setUsername(val.target.value);
          }}
        />

        <Select
          mt="md"
          required
          label="Country of Origin"
          placeholder="My country is..."
          itemComponent={SelectItem}
          data={newCountrues}
          searchable
          maxDropdownHeight={400}
          nothingFound="Country not found"
          filter={(value, item) =>
            item.label.toLowerCase().includes(value.toLowerCase().trim())
          }
          mb={10}
          {...form.getInputProps("location")}
        />
        <Group className="w-full" position="center" mt={30}>
          <Button
            leftIcon={<IconArrowLeft />}
            onClick={() => setStep(0)}
            variant="subtle"
          >
            Back
          </Button>

          <Button loading={step2Loading} type="submit" variant="light">
            Next Step
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

export default DemographicsStep;
