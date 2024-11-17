import React, { useState } from "react";
import { Switch, View, Appearance, useColorScheme } from "react-native";
import { save } from "@/services/AsyncStorage";
import Color from "@/constants/Color";

export function ThemeSwitcher () {
    const theme = useColorScheme()
    const [isEnabled, setIsEnabled] = useState( theme === 'dark' );
    const toggleSwitch = (e) => {
        
        const newTheme = Appearance.getColorScheme() === 'dark' ? 'light' : 'dark'
        Appearance.setColorScheme( newTheme )
        save('theme', newTheme)
        setIsEnabled(previousState => !previousState);
        
    }

    return (<View>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={Color[theme].colors.toggler}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          
        />
    
    </View>)
}