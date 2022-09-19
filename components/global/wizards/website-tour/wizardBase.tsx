import { Stack, Center, type MantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
// import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import TagPickingStep from "./tag-step";
import WelcomeStep from "./welcome-step";
import DemographicsStep from "./demographics-step";
import FinishStep from "./finish-step";
import { type Session } from "@supabase/supabase-js";

interface WebsiteTourWizardBaseProps {
  theme: MantineTheme;
  session: Session;
  client: any;
}

const WebsiteTourWizardBase = ({
  theme,
  client,
  session,
}: WebsiteTourWizardBaseProps) => {
  const [step, setStep] = useState(0);
  // const { isLoading, session, error, supabaseClient } = useSessionContext();
  const importFlags = async () =>
    //@ts-ignore
    await import("country-flag-icons/3x2/flags.css");
  useEffect(() => {
    if (step == 1) {
      importFlags();
    }
  }, [step]);
  return (
    <Stack className="!h-[500px]">
      <Center className="h-full !w-full">
        <Stack className="w-full" spacing={0} align="center">
          {step == 0 ? (
            <Fade key={0}>
              <WelcomeStep setStep={setStep} step={step} />
            </Fade>
          ) : step == 1 ? (
            <Fade key={1}>
              <DemographicsStep
                setStep={setStep}
                theme={theme}
                step={step}
                session={session}
                client={client}
              />
            </Fade>
          ) : step == 2 ? (
            <Fade key={2}>
              <TagPickingStep
                setStep={setStep}
                step={step}
                session={session}
                client={client}
              />
            </Fade>
          ) : step == 3 ? (
            <Fade key={3}>
              <FinishStep
                setStep={setStep}
                step={step}
                session={session}
                client={client}
              />
            </Fade>
          ) : null}
        </Stack>
      </Center>
    </Stack>
  );
};

export default WebsiteTourWizardBase;
