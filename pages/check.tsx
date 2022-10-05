import DynamicArticleCover from "../components/global/dynamic-covers/article";

const CheckCover = () => {
  return (
    <DynamicArticleCover
      description="Searching for cool HTML elements, especially if you don't know what you're looking for, is often like being thrown into a pile of garbage"
      title="7 Cool HTML Elements Nobody Uses"
      tags={[
        {
          title: "posthog",
          color: "indigo",
        },
        {
          title: "react",
          color: "blue",
        },
        {
          title: "angular",
          color: "red",
        },
      ]}
      views={100000000}
      author={{
        full_name: "Bob Thorton",
        cover: "/pyjefzpyT5.webp",
        username: "dukes",
      }}
      colorScheme="light"
      cover="/dKa3htvso3.png"
    />
  );
};

export default CheckCover;
