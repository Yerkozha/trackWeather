import Color from "@/constants/Color";
import { useAppSelector } from "@/hooks/useStore";
import React from "react";
import {ActivityIndicator, StyleSheet, View, useColorScheme, Appearance} from 'react-native';

export function Loader() {
      const theme = useColorScheme()
      const globalLoader = useAppSelector((state) => state.weather.globalLoader)
    return (<>
    {globalLoader &&
      <View style={
         {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F5FCFF88',
            pointerEvents: 'box-only',
         }
      }>
         <ActivityIndicator size="large" color={Color[ theme ?? Appearance.getColorScheme() ].colors.textColor} />
      </View>}
    </>)
  }