import { Button, Stack, Text } from "@mantine/core";
import { WelcomeWizardStepProps } from "./tag-step";

const WelcomeStep = ({ setStep, step }: WelcomeWizardStepProps) => {
  return (
    <Stack spacing={0} align="center" className="">
      <Text weight={500} size={50}>
        Welcome Aboard 🎉
      </Text>
      <Text mb={50} size="sm" color="dimmed">
        Lets get you started. This will only take a minute
      </Text>
      <Button onClick={() => setStep(1)} variant="light">
        Start Tour
      </Button>
    </Stack>
  );
};

export default WelcomeStep;
