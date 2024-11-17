
import { store } from "@/store";
import WeatherService from "@/store/weather";

import type { WeatherApiResponse, WeatherCredentials, WeatherData } from "@/store/weather/types";
import { get } from "@/services/AsyncStorage";


abstract class FetchBase {

    protected static originURL: Nullable<string> = 'https://api.openweathermap.org/'; // https://openweathermap.org/img/wn/10d@2x.png

    protected static fetchOptions: RequestInit = {
        method: "GET", 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            
        },
        body: undefined as BodyInit_ | undefined
    }

    // protected static status: Nullable<"success" | "error"> = null;

    
}

export class Base extends FetchBase {
    private _requestInterceptors = new Set()
    private _responseInterceptors = new Set()
    
    private static _instance = null
    requestEngine = null
    responseEngine = null

    addRequestInterceptors( requestInterceptorHandler ) {
        this._requestInterceptors.add(requestInterceptorHandler)
    }

    addResponseInterceptors( responseInterceptorHandler ){
        this._responseInterceptors.add(responseInterceptorHandler)
    }

    attachInterceptorEngine(engine){
        
        for ( const interceptor of engine ) {
            
            if( engine.type === 'request' && interceptor ) {
                this.requestEngine = engine
                this.addRequestInterceptors(interceptor)

            } else if( engine.type === 'response'  && interceptor ) {
                this.responseEngine = engine
                this.addResponseInterceptors(interceptor)
                
            }
            
        }
        return this
    }

    get requestInterceptors() {
        return this._requestInterceptors
    }
    get responseInterceptors() {
        
        return this._responseInterceptors
    }

    static getInstance() {
        if(!this._instance){
            this._instance = new Base()
        }
        return this._instance
    }

    static makeRequestBasedOnOptions( url, baseOptions, customOptions ) {
        
        /**
         * new Header()
         */
        
        const headers = new Headers({
            ...baseOptions['headers'],
            ...customOptions['headers'],
        })

        const request = new Request(url, {
            ...baseOptions,
            ...customOptions,
            headers
        });

        console.log('MAKEQUEST', request)
        return request
    }
    
    /**
     * @argument restEndpoint client-end url 
     *
     * @argument fetchOptions request
     *
     */
    static async fetch( restEndpoint, fetchOptions?: RequestInit ): Promise<unknown> {
        
        const access = await get('access')

        const request = this.makeRequestBasedOnOptions( this.originURL + restEndpoint,  super.fetchOptions, fetchOptions )
        
        console.log("MERGED REQUEST OPTIONS", request)

        const httpBase = this.getInstance()

        for(const interceptor of httpBase.requestInterceptors){

            interceptor.call(httpBase.requestEngine, request, access)

        }

        console.log('FINAL MAKE REQUEST ', request )

        let response: Awaited<ReturnType<typeof fetch>> = await this.makeRequest(request)

        console.log( 'RESPONSE =>', response)

        for(const interceptor of httpBase.responseInterceptors){
            response = await interceptor.call(httpBase.responseEngine, response, request)
            
        }
        
        console.log(response, 'response')
        return response
    }
    

    static async makeRequest( request, retryOption = {
        count: 2,
        delay: (time) => time * 1000,
        delayCount: 0
    } ) {

        let
            response: Awaited<ReturnType<typeof fetch>>;
        try{

            response = await new Promise((resolve, reject) => {
                setTimeout( () => {
                    
                    resolve( fetch( request.clone()) )
                    
                }, retryOption.delay(retryOption.delayCount++) ) ;
            });


        } catch(error) {

            this.networkError(error)

            throw error
        }
         
        
        console.log('makeRequest RESPONSE', response)

        if( response.ok ) {

            return response

        } else if( response.status === 401 && --retryOption.count > 0 ) {
            /**
             * 2 times only, not recursive
             */
            const response = await this.retryRequest(request, retryOption)
            return response

        }

        const serializedResponse = await this.serializerResponse(response);
        
        throw serializedResponse
    }

    static networkError(error) {

        if( error instanceof TypeError && /network/i.test(error.message) ) {

            console.log('NETWORK MESSAGE ', error.message)
            console.log('NETWORK NAME!!!! ', error.name)
            /**
             * perform try again UI
             */
            store.dispatch(WeatherService.actions.setRootError(true))
            
          }

    }

    static async serializerResponse(response) {

        if( response instanceof Response && !response.bodyUsed ) {
            return await response.json()

        }

        return response

    }

    static async retryRequest(prevRequest: InstanceType<typeof Request>, retryOption) {

        return await this.makeRequest(prevRequest, retryOption)

    }

}


export class WeatherController extends Base {

    static async getWeather<T extends WeatherApiResponse>( credentials: WeatherCredentials ): Promise<T>{
        
        const data = <T>await this.fetch(`data/2.5/weather?units=metric&q=${credentials.cityName}`, {
            method: 'GET'
        })

        return data

    }

}
