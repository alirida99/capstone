import { createTheme } from "@mui/material/styles";
export const Colors = {
    primary: '#1a1a1a', //dark gray
    secondary: '#267326', //green 
    light_green: '#79d279',
    white: '#ffffff',
    danger: '#e62e00',
    /*danger:'',
    warning:'',
    
    black:'',
    dark:'',
    light:'',
*/


};
const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        },
        secondary: {
            main: Colors.secondary
        }
    },
    components: {
        MuiButton: {
            // disableRipple: true,
            // disableElevation: true
        }
    }
});

export default theme;