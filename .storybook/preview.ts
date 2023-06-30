import type { Preview } from "@storybook/react";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-styling";
import theme from "../src/theme";

/* TODO: update import for your custom Material UI themes */
// import { lightTheme, darkTheme } from '../path/to/themes';

// Import your fontface CSS files here
// Don't have any? We recommend installing and using @fontsource/roboto

const preview: Preview = {
  loaders: [
    // @ts-expect-error
    () => {
      const data = JSON.stringify(mockSession);
      sessionStorage.setItem("currentFetchSession", data);
    },
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },

  decorators: [
    // Adds global styles and theme switching support.
    withThemeFromJSXProvider({
      GlobalStyles: CssBaseline,
      // Uncomment for theme switching
      Provider: ThemeProvider,
      themes: {
        //Provide your custom themes here
        light: theme,
        dark: theme,
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;

const mockSession = {
  name: "mememe",
  expires: 13212313213213,
  favoriteDogs: [
    {
      age: 14,
      breed: "Chihuahua",
      id: "WHGFTIcBOvEgQ5OCx40W",
      img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11258.jpg",
      name: "Jenifer",
      zip_code: "11962",
    },
    {
      age: 4,
      breed: "Chihuahua",
      id: "aXGFTIcBOvEgQ5OCx40W",
      img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1346.jpg",
      name: "Keagan",
      zip_code: "35574",
    },
    {
      age: 13,
      breed: "Chihuahua",
      id: "cXGFTIcBOvEgQ5OCx40W",
      img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1558.jpg",
      name: "Tracy",
      zip_code: "71725",
    },
    {
      age: 1,
      breed: "Chihuahua",
      id: "c3GFTIcBOvEgQ5OCx40W",
      img: "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1617.jpg",
      name: "Kylie",
      zip_code: "44222",
    },
  ],
};
