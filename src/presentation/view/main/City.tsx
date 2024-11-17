import React from "react";
import {
  Text,
  View,
  Image,

} from "react-native";

import { useTheme } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { style } from "./styles";


function City({vm, route, navigation}) {

  const city = useAppSelector((state) => state.weather.current)

  const theme = useTheme().colors
  const styles = style(theme)

  const dispatch = useAppDispatch()

  return ( <View style={styles.container}>

    <View style={styles.list}>
    
      { city.weather.map((weatherEL) => (<View style={styles.listItem} key={weatherEL.id}>

        <View style={styles.topDisplay}>
          <Text style={styles.title}>{weatherEL.main}</Text>
          <Text style={styles.title}>{weatherEL.description}</Text>
            <Text style={styles.temp}>{city.main.temp + " " + '\u2103'}</Text>
        </View>

          <Image
            source={{ 
              uri: `http://openweathermap.org/img/wn/${weatherEL.icon}@4x.png`
          }}
            style={{width: 200, height: 200, }}
            onError={({nativeEvent: {error}}) => console.log('Error loading image:', error)}
            onLoad={() => console.log('Image loaded successfully')}
          />

      </View>)
      )}
      
    </View>
    
   </View>
  );
};


export default City
