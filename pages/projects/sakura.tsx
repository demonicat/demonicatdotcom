import { Container, Group, Title, useMantineTheme } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Plant2 } from "tabler-icons-react";

export default function Home(): JSX.Element {
  const commonTL = useTranslation("common");
  const sakuraTL = useTranslation("project-sakura");

  const theme = useMantineTheme();

  return (
    <Container size="lg">
      <Head>
        <title>
          {sakuraTL.t("title")} &bull; {commonTL.t("app-name")}
        </title>
      </Head>

      <Group position="center" spacing={5}>
        <Plant2 color={theme.colors.pink[5]} size={38} />
        <Title
          order={1}
          sx={{
            color: theme.colors.pink[5],
          }}
        >
          {sakuraTL.t("title")}
        </Title>
      </Group>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ ctx: context });

  return {
    props: {
      session,
      ...(await serverSideTranslations(context.locale ?? "en", ["common", "project-sakura"])),
    },
  };
};
