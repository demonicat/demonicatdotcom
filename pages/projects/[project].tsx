import { Badge, Container, Group, Image, Text, ThemeIcon, Title, useMantineTheme } from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Biohazard, BuildingLighthouse, Plant2 } from "tabler-icons-react";
import { useRouter } from "next/router";

const projects = {
  "sakura": {
    tags: ["C/C++", "Lua", "Game", "Fork"],
    Icon: Plant2,
    color: "pink",
  },
  "abyss": {
    tags: ["JavaScript/TypeScript", "Next.js", "Template", "Original"],
    Icon: BuildingLighthouse,
    color: "lime",
  },
  "karma": {
    tags: ["JavaScript/TypeScript", "Expo", "Template", "Original"],
    Icon: Biohazard,
    color: "violet",
  },
};

export default function Project(): JSX.Element {
  const { t } = useTranslation(["common", "projects"]);
  const router = useRouter();
  const { project } = router.query;

  const theme = useMantineTheme();

  return (
    <Container size="lg">
      <Head>
        <title>
          {t(`projects:${project}.title`)} &bull; {t("common:app-name")}
        </title>
      </Head>

      <Group align="center" position="center" spacing="xs">
        <ThemeIcon size="xl" variant="outline" color={projects[project as "abyss" | "karma" | "sakura"].color}>
          {project === "abyss" ? (
            <BuildingLighthouse color={theme.colors[projects[project as "abyss" | "karma" | "sakura"].color][5]} />
          ) : null}

          {project === "sakura" ? (
            <Plant2 color={theme.colors[projects[project as "abyss" | "karma" | "sakura"].color][5]} />
          ) : null}

          {project === "karma" ? (
            <Biohazard color={theme.colors[projects[project as "abyss" | "karma" | "sakura"].color][5]}/>
          ) : null}
        </ThemeIcon>
        <Title
          order={2}
          sx={{
            color: theme.colors[projects[project as "abyss" | "karma" | "sakura"].color][5]
          }}
        >
          {t(`projects:${project}.title`)}
        </Title>
      </Group>

      <Image radius="md" height={320} mt="lg" src="https://placekitten.com/1980/320" />

      <Group position="center">
        {projects[project as "abyss" | "karma" | "sakura"].tags.map((tag) => (
          <Badge color={projects[project as "abyss" | "karma" | "sakura"].color} mt="md" key={tag}>{tag}</Badge>
        ))}
      </Group>

      <Text align="center" mt="md">
        {t(`projects:${project}.description`)}
      </Text>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ ctx: context });

  return {
    props: {
      session,
      ...(await serverSideTranslations(context.locale ?? "en", ["common", "projects"])),
    },
  };
};
