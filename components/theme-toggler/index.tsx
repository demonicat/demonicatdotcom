import { Center, ColorScheme, SegmentedControl, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { Moon, Sun } from "tabler-icons-react";

export function ThemeToggler(): JSX.Element {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <SegmentedControl
      value={colorScheme}
      onChange={(val) => toggleColorScheme(val as ColorScheme)}
      data={[
        {
          value: "light",
          label: (
            <Center>
              <Sun size={14} />
            </Center>
          ),
        },
        {
          value: "dark",
          label: (
            <Center>
              <Moon size={14} />
            </Center>
          ),
        },
      ]}
    />
  );
}
