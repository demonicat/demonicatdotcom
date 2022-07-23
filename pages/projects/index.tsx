import {
  Badge,
  Box,
  Container,
  Group,
  Image,
  Paper,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { GetServerSideProps } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Activity, Biohazard, BuildingLighthouse, Plant2 } from "tabler-icons-react";

export default function Projects(): JSX.Element {
  const commonTL = useTranslation("common");
  const projectsTL = useTranslation("projects");

  const theme = useMantineTheme();

  const projects = [
    {
      title: "Sakura",
      description: projectsTL.t("sakura.description"),
      tags: ["C/C++", "Lua", "Game", "Fork"],
      Icon: Plant2,
      color: "pink",
    },
    {
      title: "Abyss",
      description: projectsTL.t("abyss.description"),
      tags: ["JavaScript/TypeScript", "Next.js", "Template", "Original"],
      Icon: BuildingLighthouse,
      color: "lime",
    },
    {
      title: "Karma",
      description: projectsTL.t("karma.description"),
      tags: ["JavaScript/TypeScript", "Expo", "Template", "Original"],
      Icon: Biohazard,
      color: "violet",
    },
  ];

  return (
    <Container size="lg">
      <Head>
        <title>
          {projectsTL.t("title")} &bull; {commonTL.t("app-name")}
        </title>
      </Head>

      <Group position="center" spacing={5}>
        <Activity color={theme.colors[theme.primaryColor][5]} size={38} />
        <Title
          order={1}
          sx={{
            color: theme.colors[theme.primaryColor][5],
          }}
        >
          {projectsTL.t("title")}
        </Title>
      </Group>
      <Text align="center">{projectsTL.t("description")}</Text>

      <Group mt="md">
        {projects.map((project) => (
          <NextLink key={project.title} href={`/projects/${project.title.toLowerCase()}`} passHref>
            <Paper
              component="a"
              p="md"
              sx={{
                width: "100%",
                position: "relative",
              }}
              withBorder
            >
              <Group spacing="md">
                <Image radius="md" height={128} src="https://placekitten.com/1920/128" />
                <Box>
                  <Group spacing="xs">
                    <project.Icon color={theme.colors[project.color][5]} />
                    <Title
                      order={2}
                      sx={{
                        color: theme.colors[project.color][5],
                      }}
                    >
                      {project.title}
                    </Title>
                  </Group>
                  <Text sx={{
                    flex: 1,
                  }}>
                    {project.description}
                  </Text>
                  <Group
                    sx={{
                      bottom: theme.spacing.md,
                    }}
                    spacing="xs"
                  >
                    {project.tags.map((tag) => (
                      <Badge color={project.color} sx={{
                        cursor: "pointer"
                      }} key={tag}>{tag}</Badge>
                    ))}
                  </Group>
                </Box>
              </Group>
            </Paper>
          </NextLink>
        ))}
      </Group>
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
