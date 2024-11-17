

export class RequestEngine {

    type = 'request';

    *[Symbol.iterator]() {
        const funcs = Object.getOwnPropertyNames(RequestEngine.prototype)
        for( let i = funcs.length; i > 0; i-- ) {
            yield this[funcs[i]]
        }
        
    }

    attachAccessToken( request, access ) {

        
        request.url += `&appid=${access}`
       
        return request
    }
    
}

export class ResponseEngine {

    type = 'response';
    
    

    *[Symbol.iterator]() {
        const funcs = Object.getOwnPropertyNames(ResponseEngine.prototype)
        for( let i = funcs.length; i > 0; i-- ) {
            yield this[funcs[i]]
        }
    }

    async responseParse( response, prevRequest ){

        console.log('response.ok', response )

        if( response.ok && !response.bodyUsed) {

            const data = await response.json()
            
            
            return data

        } else if ( response.status == 401 ) {
            


        }
        
        console.log( 'THROW FETCH ERROR ================>', response)
        
        throw response
    }

}