import { MainLayout } from "./main";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Componenets/MainLayout",
  component: MainLayout,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SignInStory: Story = {
  args: {
    name: "mememe",
    children: <div>mockChild</div>,
  },
};
