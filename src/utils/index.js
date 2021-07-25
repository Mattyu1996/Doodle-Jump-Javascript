export function setStyle(element, objProps) {
    const keys = Object.keys(objProps);
    keys.forEach(function(key) {
        element.style[key] = objProps[key];
    });
}

export function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
} 

export function vWidth(percentuale){
    return (percentuale/100)*this.scale.gameSize.width;
}

export function vHeight(percentuale){
    return (percentuale/100)*this.scale.gameSize.height;
}

export function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function setAttributes(element, obj){
    const keys = Object.keys(obj);
    keys.forEach(function(key) {
        element.setAttribute(key, obj[key]);
    });
}