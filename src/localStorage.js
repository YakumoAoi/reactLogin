export function save(key,value){
    return window.localStorage.setItem(key,JSON.stringify(value))
}
export function load(key){
    return window.localStorage.getItem(key)
}