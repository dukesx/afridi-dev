import { Button, Stack, Text } from "@mantine/core";
import { closeAllModals } from "@mantine/modals";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { GeneralStore } from "../../../../data/static/store";
import { getFeedArticles } from "../../feed/functions";
import { WelcomeWizardStepProps } from "./tag-step";

const FinishStep = ({ step, setStep, user }: WelcomeWizardStepProps) => {
  const [step4Loading, setStep4Loading] = useState(false);
  const { isLoading, session, error, supabaseClient } = useSessionContext();

  //
  //
  //
  //

  //
  //
  //
  //
  return (
    <Stack align="center" spacing={0}>
      <Text className="text-center" weight={500} size={40}>
        Thank you ❤️ All Done 🏁
      </Text>
      <Text mb={30} size="sm" color="dimmed">
        You are now at the finish line.
      </Text>

      <Button
        mt={50}
        loading={step4Loading}
        onClick={async () => {
          setStep4Loading(true);
          const { error, data } = await supabaseClient
            .from("authors")
            .update({
              website_tour: false,
            })
            .eq("id", user.id);

          if (!error) {
            setStep4Loading(false);
            closeAllModals();
            document.location = "/";
          }
        }}
        type="submit"
        variant="light"
      >
        Finish Setup
      </Button>
    </Stack>
  );
};

export default FinishStep;
