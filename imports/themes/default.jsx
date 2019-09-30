import { createMuiTheme } from "@material-ui/core/styles";

export const defaultTheme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        minWidth: '0px !important',
        textTransform: 'none',
      },
    },
  },
});
