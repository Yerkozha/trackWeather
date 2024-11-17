import React from 'react';
import { 
    NavigationContainer, 
 } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, useColorScheme  } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connect} from 'react-redux';

import { Colors } from "@/constants";
import { navigationRef } from './utils';

import { RootState } from '@/store';

import type { RootStackParamList } from "./types";

import {Cities, City} from '@/presentation/view';

import style from './styles';
import WeatherService from '@/store/weather';
import { MainViewModel } from '../view-model/main/MainViewModel';
import { ThemeSwitcher } from '@/services/ThemeSwitcher';

const Stack = createNativeStackNavigator<RootStackParamList>();

const vm = new MainViewModel()

function AppNavigators ({current, ...props}) {
   
   const theme = useColorScheme();
   const isDark = theme === 'dark'

   const styles = style(theme)

    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer theme={ isDark ? Colors.dark : Colors.light } ref={navigationRef}>
                <StatusBar animated={true} barStyle={ isDark ? 'dark-content' : 'light-content'} 
                backgroundColor={ Colors[theme].colors.mainBackground } /> 


                <Stack.Navigator initialRouteName="Cities">
                    <Stack.Screen 
                        name="Cities" 
                        options={(route) => ({
                            headerStyle: {
                                backgroundColor: Colors[theme].colors.mainBackground,
                            },
                            headerTintColor: Colors[theme].colors.textColor,
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerRight: () => <ThemeSwitcher />
                        })} 
                    >
                        {childProps => <Cities {...childProps} {...props} vm={vm} />}
                    </Stack.Screen>
                    <Stack.Screen 
                        name="City" 
                        options={(route) => ({
                            title: current.name,
                            headerStyle: {
                                backgroundColor: Colors[theme].colors.mainBackground,
                            },
                            headerTintColor: Colors[theme].colors.textColor,
                            headerTitleStyle: {
                                fontWeight: 'bold',
                            },
                            headerTitleAlign: 'center',
                            headerRight: () => <ThemeSwitcher />
                        })} 
                    >
                        {childProps => <City {...childProps} {...props} vm={vm} />}
                    </Stack.Screen>
                    

                </Stack.Navigator>
                
            </NavigationContainer>
        </SafeAreaView>
    )
}


export const connector = connect(
     (state: RootState) => ({
        current: state.weather.current,
    }), { weather: WeatherService.weather, setCurrent: WeatherService.actions.setCurrent }
)

export default connector(AppNavigators)


