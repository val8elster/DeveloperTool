// customTheme.ts
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const customTheme = extendTheme({
  cssVarPrefix: "",
  colorSchemes: {
    light: {
      palette: {
        "bg-text-input": "#ffffff", // Specify color in light mode for "bg-text-input"
      },
    },
    dark: {
      palette: {
        "bg-text-input": "#0f1a2a", // Specify color in dark mode for "bg-text-input"
      },
    },
  },
});
export default customTheme;
