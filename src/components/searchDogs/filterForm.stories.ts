import type { Meta, StoryObj } from "@storybook/react";
import { FilterForm } from "./filterForm";

const meta = {
  title: "Componenets/FilterForm",
  component: FilterForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof FilterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilterFormStory: Story = {
  args: {
    breeds: ["Chihuahua", "Affenpinscher", "Airedale", "Boxer"],
    setDogs: () => window.alert("setting dogs"),
    setSort: () => window.alert("setting sort"),
    setNext: () => window.alert("setting next url"),
    setPrev: () => window.alert("setting previous url"),
    setTotal: () => window.alert("setting total dogs"),
  },
};
