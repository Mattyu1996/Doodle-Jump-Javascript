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
    return (percentuale/100)*this.sys.canvas.width;
}

export function vHeight(percentuale){
    return (percentuale/100)*this.sys.canvas.height;
}

export function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}