import { SignInSide } from "./signin";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Componenets/SignIn",
  component: SignInSide,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SignInSide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignInStory: Story = {
  args: {},
};
