import { Center, SegmentedControl } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import ReactCountryFlag from "react-country-flag";

export function LanguageToggler(): JSX.Element {
  const { locale, locales, route, push } = useRouter();

  const data =
    locales?.map((otherLocale) => ({
      value: otherLocale,
      label: (
        <Center>
          {otherLocale === "pt" ? (
            <ReactCountryFlag countryCode="BR" svg />
          ) : otherLocale === "en" ? (
            <ReactCountryFlag countryCode="US" svg />
          ) : (
            <ReactCountryFlag countryCode="ES" svg />
          )}
        </Center>
      ),
    })) ?? [];

  return (
    <SegmentedControl
      value={locale}
      styles={{
        control: {
          "&:not(:first-of-type)": {
            border: "none",
          },
        },
      }}
      onChange={(val) => push(route, route, { locale: val })}
      data={data}
    />
  );
}
