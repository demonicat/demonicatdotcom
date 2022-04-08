import { Container } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Hero } from "../components/hero";

export default function Home(): JSX.Element {
  const commonTL = useTranslation("common");
  const homeTL = useTranslation("home");

  return (
    <Container size="lg">
      <Head>
        <title>
          {homeTL.t("title")} &bull; {commonTL.t("app-name")}
        </title>
      </Head>
      <Hero />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ ctx: context });

  return {
    props: {
      session,
      ...(await serverSideTranslations(context.locale ?? "en", ["common", "home"])),
    },
  };
};
