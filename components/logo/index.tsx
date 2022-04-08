import { Text } from "@mantine/core";
import NextLink from "next/link";
import React from "react";

export function Logo(): JSX.Element {
  return (
    <NextLink href="/" passHref>
      <Text
        component="a"
        gradient={{ from: "red", to: "violet", deg: 90 }}
        size="xl"
        variant="gradient"
        weight="bold"
      >
        demonicat
      </Text>
    </NextLink>
  );
}
