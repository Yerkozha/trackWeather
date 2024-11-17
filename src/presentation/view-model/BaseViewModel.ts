import { WeatherData } from "@/store/weather/types";

export type TTLCache<K, V> = Omit<SimpleCahce<K, V>, 'set'> & {
    set(key: K, value: V, opt?: TTLOptions): Promise<boolean>;
    setTTL(): void;
}
export interface SimpleCahce<K, V> {
    get(key): Promise<null | WeatherData>;
    save(key: K, value: V): Promise<boolean>;
    deleteItem(key: K): Promise<void>;
}
export type UpdateView = () => void
export interface IBaseViewModel {

    debounce: (cb: () => void, timer: number) => Function

    caching: TTLCache<string, unknown>
    keyExtractor: (item: unknown) => string

    addTTL: <K,V>(cache: SimpleCahce<K,V>, ttl) => TTLCache<K, V>
}


export interface TTLOptions {
    ttl?: number
}

