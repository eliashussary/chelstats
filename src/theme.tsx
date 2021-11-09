import { extendTheme, ThemeOverride } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const solidBlackOverride = ({ colorMode, colorScheme }) => {
  console.log(colorScheme, colorMode);
  if (colorScheme === "black" && colorMode === "light") {
    return {
      bg: "black",
      textColor: "white",
      _hover: {
        bgColor: "blackAlpha.700",
      },
    };
  }

  if (colorScheme === "black" && colorMode === "dark") {
    return {
      bg: "whiteAlpha.200",
      textColor: "white",
      _hover: {
        bgColor: "whiteAlpha.100",
      },
    };
  }
};

const themeOverride: ThemeOverride = {
  colors: {
    black: "#16161D",
  },
  radii: {
    sm: 0,
    md: 0,
    lg: 0,
    xl: 0,
    base: 0,
  },
  breakpoints,
  components: {
    Button: {
      variants: {
        solid: solidBlackOverride,
      },
    },
    InputRightAddon: {
      variants: {
        solid: solidBlackOverride,
      },
    },
  },
};

export default extendTheme(themeOverride);
