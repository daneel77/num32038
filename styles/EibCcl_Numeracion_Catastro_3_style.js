var size = 0;
var placement = 'point';

var style_EibCcl_Numeracion_Catastro_3 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var valueNUM = feature.get("END_N1_00");
    var valueLETRA = feature.get("END_L1_00");
    var valueTIPO = feature.get("EN1_TIPO");
    var valueESTCONS = feature.get("ESTADOS_CONS_Estado_Conservacion");
    if (valueNUM == null) { 
       valueNUM = ""; 
    }
    if (valueLETRA == null) { 
       valueLETRA = ""; 
    }
    var labelFont = "16px, sans-serif";
    var labelFill = "#000000";
    var circleFill = "#4fc3f7";
    var bufferColor = "#aaaaaa";
    if (valueTIPO == "00_N1") {
    	circleFill = "#0d47a1";
    }
    if (valueESTCONS == "Bueno") {
    	bufferColor = "#2ca02c";
    	labelFill = "#ffffff"
    }
    if (valueESTCONS == "Regular") {
    bufferColor = "#ff7f00";
    labelFill = "#ffffff"
    }
    if (valueESTCONS == "Malo") {
    	bufferColor = "#e31a1c";
    	labelFill = "#ffffff"
    }
    if (valueESTCONS == "Ruina") {
    	bufferColor = "#984ea3";
    	labelFill = "#ffffff"
    }
    var bufferWidth = 7;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    if ("" !== null) {
        labelText = String(valueNUM + valueLETRA);
    }
    

switch (labelText.length) {
    case 1:
        console.log("La cadena tiene 1 carácter");
        // Tu código aquí
        offsetX=11;
        offsetY=-3;
        break;
        
    case 2:
        console.log("La cadena tiene 2 caracteres");
        // Tu código aquí
        offsetX=16;
        offsetY=-3;
        break;
        
    case 3:
        console.log("La cadena tiene 3 caracteres");
        // Tu código aquí
        offsetX=22;
        offsetY=-3;
        break;
        
    case 4:
        console.log("La cadena tiene 4 caracteres");
        // Tu código aquí
        offsetX=26;
        offsetY=-3;
        break;
        
    case 5:
        console.log("La cadena tiene 5 caracteres");
        // Tu código aquí
        offsetX=30;
        offsetY=-3;
        break;
        
    default:
        console.log("La cadena es vacía o tiene más de 5 caracteres");
        // Código opcional por si no cumple ninguna de las anteriores
        break;
}


    
    
        var style = [ 
        new ol.style.Style({
        image: new ol.style.Circle({
            radius: 10,
            displacement: [offsetX, offsetY],
            stroke: new ol.style.Stroke({
            color: circleFill,
            width: 3.5
        })
        })
    }),
    new ol.style.Style({
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor, bufferWidth)
    })];;
    
    
    
    /*var style = [ new ol.style.Style({
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor, bufferWidth)
    })];;*/
    return style;
};
