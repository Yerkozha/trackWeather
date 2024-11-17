import { WeatherController } from '@/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


import type { WeatherState, WeatherCredentials, WeatherData } from './types'


/**
 * @FACADE_SERVICE_STRUCTURE
 * 
 * @TOP_initialState
 * 
 * @BODY_createAsyncThunk_business_logic
 * 
 * @BOTTOM_weatherSlice
 */
class WeatherService {


  static initialState: WeatherState = {
    current: null,
  
    error: [],
    rootError: false,
    globalLoader: false,
  
  }

  static weather = createAsyncThunk('weather/getWeather', 
  async (weatherCredentials: WeatherCredentials, {rejectWithValue, getState}) => {

    try {

      const data = await WeatherController.getWeather(weatherCredentials)

      if( data.cod === 200 ) {

        return data
      }

      console.log('REJECTED', data)

      throw rejectWithValue(data)

    } catch( error ) {

      console.log('THROWN ERROR ', error)

      throw rejectWithValue(error)

    }
    
  })

  static weatherSlice = createSlice({
    name: 'weather',
    initialState: WeatherService.initialState,
    reducers: {
      weatherResetState: (state) => WeatherService.initialState,
      resetError: (state) => { state.error = null },
      setRootError: (state, {payload}) => { state.rootError = payload },
      toggleLoader: (state, {payload}) => { state.globalLoader = payload },
      setCurrent: (state, {payload}) => { state.current = payload },
    },
  
    extraReducers: (builder) => {
      builder.addCase(WeatherService.weather.pending, (state, action) => {
        state.globalLoader = true
      })
  
      builder.addCase(WeatherService.weather.fulfilled, (state, { payload }) => {
  
        console.log( 'UPDATE STATE with FOLLOWING PAYLOAD', payload )
       
        return {
          ...state,
          current: payload,
        }
  
      })

      builder.addCase(WeatherService.weather.rejected, (state, { payload }) => {
  
        state.error = payload
  
      })

      builder.addMatcher(WeatherService.weather.settled, (state, action) => {
        state.globalLoader = false
      })
  
    } 
  })


  static actions = WeatherService.weatherSlice.actions;
  static reducer = WeatherService.weatherSlice.reducer;
}

export default WeatherService;