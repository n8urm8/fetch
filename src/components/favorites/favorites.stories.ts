import { Favorites } from "./favorites";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Componenets/Favorites",
  component: Favorites,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Favorites>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FavoritesStory: Story = {
  args: {},
};
