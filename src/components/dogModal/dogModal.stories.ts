import { DogModal } from "./dogModal";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Componenets/DogModal",
  component: DogModal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DogModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalAddToFavorites: Story = {
  args: {
    dog: {
      age: 14,
      breed: "Chihuahua",
      id: "WHGFTIcBOvEgQ5OCx40W",
      img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11258.jpg",
      name: "Jenifer",
      zip_code: "11962",
    },
    method: "add",
  },
};

export const ModalRemoveFromFavorites: Story = {
  args: {
    dog: {
      age: 14,
      breed: "Chihuahua",
      id: "WHGFTIcBOvEgQ5OCx40W",
      img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11258.jpg",
      name: "Jenifer",
      zip_code: "11962",
    },
    method: "remove",
  },
};
