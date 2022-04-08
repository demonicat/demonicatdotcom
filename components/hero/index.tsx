import { Button, createStyles, Group, Image, List, Text, ThemeIcon, Title } from "@mantine/core";
import { useTranslation } from "next-i18next";
import React from "react";
import { Check } from "tabler-icons-react";

import image from "./image.svg";

const useStyles = createStyles((theme) => ({
  inner: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55),
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },
}));

export function Hero(): JSX.Element {
  const { classes } = useStyles();

  const commonTL = useTranslation("common");
  const homeTL = useTranslation("home");

  return (
    <div className={classes.inner}>
      <div className={classes.content}>
        <Title className={classes.title}>
          {homeTL.t("hero.we-are")}{" "}
          <span className={classes.highlight}>{commonTL.t("app-name")}</span>
        </Title>
        <Text color="dimmed" mt="md">
          {homeTL.t("hero.description")}
        </Text>

        <List
          mt={30}
          spacing="sm"
          size="sm"
          icon={
            <ThemeIcon size={20} radius="xl">
              <Check size={12} />
            </ThemeIcon>
          }
        >
          <List.Item>
            <b>{homeTL.t("hero.list.beauty.title")}</b> — {homeTL.t("hero.list.beauty.description")}
          </List.Item>
          <List.Item>
            <b>{homeTL.t("hero.list.static.title")}</b> — {homeTL.t("hero.list.static.description")}
          </List.Item>
          <List.Item>
            <b>{homeTL.t("hero.list.help.title")}</b> — {homeTL.t("hero.list.help.description")}
          </List.Item>
        </List>

        <Group mt={30}>
          <Button radius="xl" size="md" className={classes.control}>
            {homeTL.t("hero.contact-us")}
          </Button>
          <Button variant="default" radius="xl" size="md" className={classes.control}>
            {homeTL.t("hero.portfolio")}
          </Button>
        </Group>
      </div>
      <Image src={image.src} className={classes.image} />
    </div>
  );
}
