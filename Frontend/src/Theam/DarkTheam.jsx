import { createTheme } from "@mui/material";

export const darkTheam = createTheme({

    palette: {

        mode: "dark",
        primary: {
            main: "#C61C0E"
        },
        green: {
            main: "#68d391"
        },
        secondary: {
            main: "#5A20CB"
        },
        black: {
            main: "#242B2E"
        },
        background: {
            main: "#000000",
            default: "#0D0D0D",
            paper: "#0D0D0D"
        },
        textColor: {
            main: "#111111"
        }

    }
});