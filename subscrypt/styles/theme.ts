import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const breakpoints = {
  sm: "375px",
  md: "1024px",
};

const brand = {
  50: "#e5eaf9",
  100: "#e5eaf9",
  200: "#e5eaf9",
  300: "#becaf0",
  400: "#92a8e6",
  500: "#6085dd",
  600: "#2e6bd6",
  700: "#0051cb",
  800: "#0049c1",
  900: "#003fb4",
};

export const theme = extendTheme(
  {
    colors: {
      brand,
    },
    styles: {
      global: {
        body: {
          backgroundColor: "#D2D5FB",
          color: "#000",
        },
        html: {
          height: "100%",
        },
      },
    },
    breakpoints,
  },
  withDefaultColorScheme({
    colorScheme: "brand",
    components: ["Button", "Input", "Select", "Checkbox", "Radio"],
  })
);
