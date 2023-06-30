import type { Meta, StoryObj } from "@storybook/react";
import { SearchDogs } from "./searchDogs";

const meta = {
  title: "Componenets/SearchDogs",
  component: SearchDogs,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof SearchDogs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchDogsStory: Story = {
  args: {},
};
