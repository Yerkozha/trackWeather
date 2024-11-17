export interface WeatherState {
    current: Nullable<WeatherApiResponse>
    error: Nullable<unknown>
    rootError: boolean
    globalLoader: boolean
}



export interface WeatherCredentials {
    cityName: string
}


interface Coord {
    lon: number;
    lat: number;
}

interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface Main {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

interface Wind {
    speed: number;
    deg: number;
}

interface Clouds {
    all: number;
}

interface Sys {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface WeatherData {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    id: number;
    name: string;
    cod: number;
}

export interface WeatherError {
    cod: number;
    message: string;
}

export type WeatherApiResponse = WeatherData | WeatherError;
