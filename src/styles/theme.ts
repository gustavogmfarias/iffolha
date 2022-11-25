import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  colors: {
    project: {
      main: "#3B8C66",
      main_light: "#60BF81",
      main_lighter: "#b1fccb",
      text: "#223240",
      text_light: "#347355",
      secondary: "#93D94E",
    },
  },
  styles: {
    global: {
      body: {
        bg: "blackAlpha.100",
        color: "green.600",
      },
    },
  },
});
