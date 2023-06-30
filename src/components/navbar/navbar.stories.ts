import type { Meta, StoryObj } from "@storybook/react";
import { ResponsiveAppBar } from "./navbar";

const meta = {
  title: "Componenets/NavBar",
  component: ResponsiveAppBar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof ResponsiveAppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    name: "Jane Doe",
  },
};

export const LoggedOut: Story = {
  args: {
    name: null,
  },
};
