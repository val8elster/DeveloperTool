// theme.d.ts
import { PaletteOptions, Palette } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    "bg-text-input": string;
  }
  interface PaletteOptions {
    "bg-text-input": string;
  }
}