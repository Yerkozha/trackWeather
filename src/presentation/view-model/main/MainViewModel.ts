import storage from "@/services/AsyncStorage";
import { IBaseViewModel, SimpleCahce, TTLCache, TTLOptions, UpdateView } from "../BaseViewModel";


export class MainViewModel implements IBaseViewModel {

    constructor() {}

    caching = this.addTTL<string, unknown>( storage , { ttl: 1 * 60 * 60 * 1000 });

    debounce( cb, timer ) {

        let timerId;

        return function ( ...args ) {

            if( timerId ) {
                clearTimeout(timerId)
            }

            timerId = setTimeout(() => {

                cb.apply(this, args)

            }, timer)

        }
    }

    /**
     * 
     * @param cache_AsyncStorage
     * @param opt_timer
     * @returns API cache
     */
    addTTL<K, V>(cache: SimpleCahce<K, V>, opt?: TTLOptions): TTLCache<K, V> {
        const timers = new Map<K, {timerId: number, started: number}>();
    
        let ttl: number | undefined
    
        return Object.create(cache, {
            set: {
                configurable: true,
                writable: true,
    
                value: async function (k: K, v: V): Promise<boolean> {

                    const success = await cache.save(k, v);

                    /**
                     * REFRESH CACHING TIME EVERY 30 MIN
                     * IN CASE WHERE SAME VALUE IS STORED AGAIN
                     */
                    if ( timers.has(k) && Math.round( (new Date().getTime() - timers.get(k).started) / 1000 / 60 ) >= 30 )
                        clearTimeout(timers.get(k).timerId)
                    
                    
                    if ( (opt?.ttl != null || ttl != null) && success ) {
                        timers.set(k, {
                            timerId: <number><unknown>setTimeout(() => {
                                cache.deleteItem(k)
                            }, opt.ttl),
                            started: new Date().getTime()                        
                        })
                    }

                    return success
                }
            },

            get: {
                configurable: true,
                writable: true,
    
                value: async function( k ): Promise<null | unknown> {

                    return await cache.get(k)
                }
            },
    
            setTTL: {
                value: function(v) {
                    ttl = v;
                },
    
                configurable: true,
                writable: true
            }
        })
    }

    keyExtractor(item){
        return item.id.toString()
    }
    
}






