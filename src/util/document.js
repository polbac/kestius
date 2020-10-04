import { isServer } from './universal'
export const document = (() => {
    if (!isServer()) {
        return document
    }
    return {
        querySelector:() => {},
        querySelectorAll:() => {},
        getElementById:() => {},
        getElementsByClassName:() => {},
        body: {
            clientWidth: 0,
            clientHeight: 0,
        }
    }
})()