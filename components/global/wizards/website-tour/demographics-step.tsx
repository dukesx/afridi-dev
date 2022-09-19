import { Button, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useState } from "react";
import { WelcomeWizardStepProps } from "./tag-step";
import { countries } from "../../../../data/static/countries";
import { IconArrowLeft } from "@tabler/icons";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { supabase } from "../../../../utils/supabaseClient";

const DemographicsStep = ({
  step,
  setStep,
  session,
  client,
  theme,
}: WelcomeWizardStepProps) => {
  const [step2Loading, setStep2Loading] = useState(false);
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      location: "",
    },

    validate: {
      firstName: (val) =>
        val.length <= 0 ? "First Name cannot be empty" : null,
      lastName: (val) => (val.length <= 0 ? "Last Name cannot be empty" : null),
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

  return (
    <Stack spacing={0} align="center" className="">
      <Text weight={500} size={40}>
        Introduce Yourself 😊
      </Text>
      <Text mb={30} size="sm" color="dimmed">
        These details will later be utilised in freelance contracts, payouts,
        etc.
      </Text>

      <form
        onSubmit={form.onSubmit(async (val) => {
          setStep2Loading(true);
          const { error } = await client
            .from("authors")
            .update({
              firstName: val.firstName,
              lastName: val.lastName,
              location: val.location,
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
          styles={{
            label: {
              fontSize: theme.fontSizes.sm,
            },
          }}
          required
          my="sm"
          label="First Name"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          styles={{
            label: {
              fontSize: theme.fontSizes.sm,
            },
          }}
          required
          mt="md"
          label="Last Name"
          {...form.getInputProps("lastName")}
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
          mb={50}
          {...form.getInputProps("location")}
        />
        <Group className="w-full" position="center" mt={50}>
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
