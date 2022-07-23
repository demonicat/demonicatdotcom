import {
  Anchor,
  Burger,
  Container,
  createStyles,
  Group,
  Header as MantineHeader,
  Paper,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import React from "react";

import { LanguageToggler } from "../language-toggler";
import { Logo } from "../logo";
import { ThemeToggler } from "../theme-toggler";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
      marginLeft: theme.spacing.sm,
      marginRight: theme.spacing.sm
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 3 : 7],
    },
  },

  login: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.75),
    color: theme.colors[theme.primaryColor][0],

    "&:hover": {
      backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.95),
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
      marginLeft: theme.spacing.sm,
      marginRight: theme.spacing.sm
    },
  },
}));

export function Header(): JSX.Element {
  const { data: session } = useSession();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes, cx } = useStyles();
  const { route } = useRouter();
  const theme = useMantineTheme();

  const commonTL = useTranslation("common");

  const links = [
    { label: commonTL.t("header.home"), link: "/" },
    { label: commonTL.t("header.projects"), link: "/projects" },
    session?.user.email ? { label: commonTL.t("header.my-account"), link: "/account" } : undefined,
  ];

  const items = links.map((link) => {
    if (link === undefined) {
      return null;
    }

    return (
      <NextLink key={link.label} href={link.link} passHref>
        <Anchor
          underline={false}
          className={cx(classes.link, { [classes.linkActive]: route === link.link })}
          onClick={() => {
            toggleOpened(false);
          }}
        >
          {link.label}
        </Anchor>
      </NextLink>
    );
  });

  return (
    <MantineHeader height={HEADER_HEIGHT} className={classes.root}>
      <NextNProgress
        options={{ showSpinner: false }}
        color={theme.colors[theme.primaryColor][5]}
        startPosition={0.5}
        stopDelayMs={100}
        height={5}
      />
      <Container className={classes.header}>
        <Logo />
        <Group spacing={5} className={classes.links}>
          {items}
          {!session?.user.email && (
            <Anchor
              align="center"
              underline={false}
              className={cx(classes.login)}
              onClick={() => {
                signIn("google", { redirect: false });
                toggleOpened(false);
              }}
            >
              {commonTL.t("header.login")}
            </Anchor>
          )}
          <Group mx="sm" spacing={5}>
            <LanguageToggler />
            <ThemeToggler />
          </Group>
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
              {!session?.user.email && (
                <Anchor
                  align="center"
                  underline={false}
                  className={cx(classes.login)}
                  onClick={() => {
                    signIn("google", { redirect: false });
                    toggleOpened(false);
                  }}
                >
                  {commonTL.t("header.login")}
                </Anchor>
              )}
              <Group my="sm" spacing={5} position="center">
                <LanguageToggler />
                <ThemeToggler />
              </Group>
            </Paper>
          )}
        </Transition>
      </Container>
    </MantineHeader>
  );
}
