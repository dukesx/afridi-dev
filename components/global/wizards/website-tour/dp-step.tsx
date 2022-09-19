import {
  Button,
  Group,
  Input,
  Loader,
  Stack,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import { IconArrowLeft } from "@tabler/icons";
import { useState } from "react";
import AfridiImage from "../../afridi-image";
import AfridiImageUploader, { ImageUploaderType } from "../../image_uploader";
import { WelcomeWizardStepProps } from "./tag-step";

const DPStep = ({ step, setStep, session, client }: WelcomeWizardStepProps) => {
  const [step6Loading, setStep6Loading] = useState(false);
  const [dp, setDp] = useState(null);
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      dp: "",
    },

    validate: {
      dp: (val) => (val.length <= 0 ? "Please upload a picture" : null),
    },
  });

  const setDPImage = (image) => {
    setDp(image);
    form.setFieldValue("dp", image);
  };

  //
  //
  //
  //

  //
  //
  //
  //
  return (
    <Stack spacing={0}>
      <Text className="text-6xl text-center">😎</Text>
      <Text className="text-center" weight={500} size={40}>
        One More Thing
      </Text>
      <Text mb={20} size="sm" color="dimmed">
        Upload a DP so that users can identify you
      </Text>
      <form
        onSubmit={form.onSubmit(async (val) => {
          if (dp) {
            console.log(dp);
            form.setFieldValue("dp", dp);
          }
          setStep6Loading(true);

          //
          //

          setStep6Loading(false);
          setStep(4);
        })}
      >
        <Input.Wrapper
          label="Your Display Picture"
          description="Can be one of JPG/PNG/SVG/GIF"
          error={form.errors.dp}
        >
          <AfridiImageUploader
            className={
              (form.errors.dp
                ? "border border-dashed border-2 border-red-600 mb-2"
                : "") + " mt-5"
            }
            client={client}
            setImage={setDPImage}
            placeholder={
              dp ? <AfridiImage path={dp} width={300} height={200} /> : null
            }
            height={220}
            user={session.user}
            type={ImageUploaderType.DP}
            theme={theme}
          />
        </Input.Wrapper>
        <Group className="w-full" position="center" mt={20}>
          <Button
            leftIcon={<IconArrowLeft />}
            onClick={() => setStep(step - 1)}
            variant="subtle"
          >
            Back
          </Button>

          <Button loading={step6Loading} type="submit" variant="light">
            Next Step
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

export default DPStep;
