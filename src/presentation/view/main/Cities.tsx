import React, { useEffect, useState, useCallback } from "react";
import {  FlatList, Text, View, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";

import type { CitiesProps } from "./types";
import { useTheme } from "@react-navigation/native";
import { style } from "./styles";

import list from '@/assets/city.list.json'
import { useValidate } from "@/hooks/useValidate";
import { WeatherData } from "@/store/weather/types";


function Cities( { vm, navigation, weather, setCurrent}: CitiesProps ) {

    const [ search, setSearch ] = useState() 
    const [cityList, setCityList] = useState<unknown[]>()
    
    const theme = useTheme().colors
    const styles = style(theme)

    const { errors, setErrors } = useValidate(search)
    
    useEffect(() => {

        setCityList(list)
        
      return () => {
        
      }
    }, [])

    const sendSearch = useCallback(vm.debounce( async function ( text, isSelected? ) {

        let data = await vm.caching.get( text )

        console.log({fromCache: data})

        if( !data ) {
            try {

                data = await weather({
                    cityName: text
                }).unwrap();

                vm.caching.set( (data as WeatherData).name.toLowerCase(), data )

            } catch( { message } ) {

                setErrors({
                    message: message
                })
                return null
            }
            
            
        } 

        if( isSelected ) {
            
            setCurrent(data)
            navigation.navigate('City')

        } else {

            setCityList((prevState) => {
            
                return [data, ...prevState.filter((el) => el.id !== data.id)]
            })

        }
        

    }, 2000), [])
    

    function searchHandler( text ) {

        setSearch(text)

        if( !Object.getOwnPropertyNames(errors).length ) {
            
            sendSearch( text.toLowerCase(), false )
            
        }

    }
    

    function onSelectCity(item) {

        sendSearch(item.name.toLowerCase(), true)

    }   
    

    const renderItem = ({item, separators}) => {
        return (
            <TouchableOpacity  
                style={styles.flatListContainer}
                key={item.id}
                onPress={() => onSelectCity(item)}
            >
                <CityItem
                    styles={styles}
                    item={item}
                ></CityItem>
            </TouchableOpacity >
            
        )
    }
    
    return (<View style={styles.mainContainer}>
        
        <View style={styles.searchContainer}>
            <TextInput
                value={search}
                style={styles.input}
                placeholder="Введите название города"
                placeholderTextColor={theme.textColor}
                onChangeText={searchHandler}
            />
            { Object.values(errors).map((err) => (<View key={err} style={styles.errTextContainer}>
                <Text style={styles.errTextCircle}>!</Text>
                <Text style={styles.errText} > { err } </Text>    
            </View>
            )) }
        </View>
        
        
        <View style={styles.listContainer}>

            <FlatList
                data={cityList}
                ListHeaderComponentStyle={styles.listHeader}
                renderItem={renderItem}
                keyExtractor={vm.keyExtractor} 
                progressViewOffset={10}
            />

        </View>
         
    </View>)
}

function CityItem ({item, styles}) {

    return (
            <View style={styles.textWrapper}>
                <Text style={styles.cityName}>{item.name}</Text>
            </View>
    )
}


export default Cities
