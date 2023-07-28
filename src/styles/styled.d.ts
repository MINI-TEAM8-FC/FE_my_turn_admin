import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      orange: {
        main: string;
        dark: string;
        light: string;
      };
      green: {
        main: string;
        dark: string;
        light: string;
      };
      white: string;
      black: string;
      gray: { [key: string] };
    };
  }
}
