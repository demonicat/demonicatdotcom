import React from 'react';
import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import NextLink from "next/link";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

export default function NotFoundTitle() {
  const { classes } = useStyles();
  const { t } = useTranslation(["common", "errors"]);
  const router = useRouter();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>{t("errors:404.title")}</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        {t("errors:404.description")}
      </Text>
      <Group position="center">
        <NextLink href="/" passHref>
            <Button component="a" variant="subtle" size="md">
            {t("errors:404.go-back")}
            </Button>
        </NextLink>
      </Group>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {
      props: {
        ...(await serverSideTranslations(context.locale ?? "en", ["common", "errors"])),
      },
    };
};