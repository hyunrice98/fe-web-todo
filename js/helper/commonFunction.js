const addEvent = ($target, callBackArray, eventType="click") => {
    callBackArray.forEach((callBack) => {
        $target.addEventListener(eventType, callBack)
    })
}

const pipe = (...functionArray) => (firstParam) => {
    return functionArray.reduce((curValue, curFunc) => {
        return curFunc(curValue);
    }, firstParam);
}

const changeCSS = ($target, key, value) => $target.style[key] = value;

export { addEvent, pipe, changeCSS }