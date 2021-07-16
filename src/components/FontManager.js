
function FontManager(){
    
    this.addFont = addFont;

    function addFont(name, path){
        let link = document.createElement('link');
        link.setAttribute('rel', 'preload');
        link.setAttribute('as', 'font');
        link.setAttribute('href', path);
        link.setAttribute('type','font/ttf');
        link.setAttribute('crossorigin', '');
        document.head.append(link);
        document.styleSheets[0].addRule();
        addCssFontRule(name, path)
    }

    function addCssFontRule(name, path){
        let sheet = document.styleSheets[0];
        sheet.insertRule(
            `@font-face{
                font-family: ${name};
                src: url('${path}');
            }`, 
            sheet.cssRules.length);
    }
}

export default FontManager;