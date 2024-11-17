import { DarkTheme, DefaultTheme } from "@react-navigation/native";



const commonColor = {
    colors: {
      commonWhite: '#FFFFFF',
      commonBlack: '#000000',
    },
  };
  
  const light = {
    ...DefaultTheme,
    colors: {
      backgroundInput: '#f2f1f1',
      displayColor: '#fff8d8',
      textColor: '#000',
      mainBackground: "#fff",
      toggler: '#fff8d8',

      ...commonColor.colors,
      ...DefaultTheme.colors
    },
  };
  
  const dark = {
    ...DarkTheme,
    colors: {
      backgroundInput: '#2b2b2d',
      displayColor: '#544d2f',
      textColor: '#fff',
      mainBackground: "#1b1b1b",
      toggler: '#fff',

      ...commonColor.colors,
      ...DarkTheme.colors
    },
  };
  
  export default { light, dark };