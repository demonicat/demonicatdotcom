import { Anchor, Container, createStyles, Text } from "@mantine/core";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";
import { Copyleft } from "tabler-icons-react";

import { Logo } from "../logo";

const useStyles = createStyles((theme) => ({
  footer: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  logo: {
    maxWidth: 200,

    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: 5,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      alignSelf: "flex-start",
      display: "block",
    },
  },

  wrapper: {
    minWidth: 160,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      marginBottom: theme.spacing.xs,
    },
  },

  link: {
    display: "block",
    color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: 3,
    paddingBottom: 3,

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xs / 2,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      paddingBottom: 0,
    },
  },
}));

export function Footer(): JSX.Element {
  const { classes } = useStyles();

  const commonTL = useTranslation("common");

  const data = [
    {
      title: commonTL.t("footer.projects"),
      links: [
        { label: "Abyss", link: "/projects/abyss" },
        { label: "Karma", link: "/projects/karma" },
        { label: "Sakura", link: "/projects/sakura" },
      ],
    },
    {
      title: commonTL.t("footer.we.title"),
      links: [
        { label: commonTL.t("footer.we.blog"), link: "/blog" },
        { label: commonTL.t("footer.we.team"), link: "/about-us/team" },
        { label: commonTL.t("footer.we.stack"), link: "/about-us/stack" },
      ],
    },
    {
      title: commonTL.t("footer.legal.title"),
      links: [
        { label: commonTL.t("footer.legal.privacy"), link: "/legal/privacy" },
        { label: commonTL.t("footer.legal.cookies"), link: "/legal/cookies" },
      ],
    },
  ];

  const groups = data.map((group) => {
    const links = group.links.map((link, index) => (
      <NextLink key={link.link + index} href={link.link} passHref>
        <Anchor className={classes.link}>{link.label}</Anchor>
      </NextLink>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Logo />
          <Text size="xs" color="dimmed" className={classes.description}>
            {commonTL.t("footer.description")}
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          <Copyleft size={12} /> {new Date().getFullYear()} demonicat.com
        </Text>
      </Container>
    </footer>
  );
}
