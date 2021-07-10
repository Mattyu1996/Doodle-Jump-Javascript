export function setStyle(element, objProps) {
    const keys = Object.keys(objProps);
    keys.forEach(function(key) {
        element.style[key] = objProps[key];
    });
}