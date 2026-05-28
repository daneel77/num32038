var wms_layers = [];

var lyr_GoogleSatellite_0 = new ol.layer.Tile({
    'title': 'Google Satellite',
    'opacity': 0.700000,
    source: new ol.source.XYZ({
    attributions: ' ',
        url: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
    })
});

var lyr_Ortoimagen_1 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
      url: "http://www.ign.es/wms-inspire/pnoa-ma?",
      attributions: ' ',
      params: {
        "LAYERS": "OI.OrthoimageCoverage",
        "TILED": "true",
        "VERSION": "1.3.0"},
    })),
    title: 'Ortoimagen',
    popuplayertitle: 'Ortoimagen',
    type: '',
    opacity: 0.700000,
});
wms_layers.push([lyr_Ortoimagen_1, 0]);

var lyr_Catastro_2 = new ol.layer.Image({
    source: new ol.source.ImageWMS(({
      url: "https://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx",
      attributions: ' ',
      params: {
        "LAYERS": "Catastro",
        "TILED": "true",
        "VERSION": "1.1.1"},
    })),
    title: 'Catastro',
    popuplayertitle: 'Catastro',
    type: '',
    opacity: 1.000000,
});
wms_layers.push([lyr_Catastro_2, 0]);

// =========================================================================
// DIVISIÓN EN 5 CATEGORÍAS INDEPENDIENTES PARA LA LEYENDA (MISMOS ESTILOS)
// =========================================================================
var format_EibCcl_Numeracion_Catastro_3 = new ol.format.GeoJSON();
var features_EibCcl_Numeracion_Catastro_3 = format_EibCcl_Numeracion_Catastro_3.readFeatures(json_EibCcl_Numeracion_Catastro_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});

var source_Bueno = new ol.source.Vector({ attributions: ' ' });
source_Bueno.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    return f.get('ESTADOS_CONS_Estado_Conservacion') === 'Bueno';
}));

var source_Regular = new ol.source.Vector({ attributions: ' ' });
source_Regular.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    return f.get('ESTADOS_CONS_Estado_Conservacion') === 'Regular';
}));

var source_Malo = new ol.source.Vector({ attributions: ' ' });
source_Malo.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    return f.get('ESTADOS_CONS_Estado_Conservacion') === 'Malo';
}));

var source_Ruina = new ol.source.Vector({ attributions: ' ' });
source_Ruina.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    return f.get('ESTADOS_CONS_Estado_Conservacion') === 'Ruina';
}));

var source_Vacio = new ol.source.Vector({ attributions: ' ' });
source_Vacio.addFeatures(features_EibCcl_Numeracion_Catastro_3.filter(function(f) {
    var val = f.get('ESTADOS_CONS_Estado_Conservacion');
    return val === null || val === undefined || String(val).trim() === '';
}));

var resoluciones = { maxResolution: 14.282277737653603, minResolution: 0.00028004466152261963 };

var lyr_Bueno = new ol.layer.Vector({
    declutter: false, source: source_Bueno, style: style_EibCcl_Numeracion_Catastro_3, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Xunqueira de Espadanedo', title: '<img src="styles/legend/ECONS_BUENO.png" /> Bueno'
});

var lyr_Regular = new ol.layer.Vector({
    declutter: false, source: source_Regular, style: style_EibCcl_Numeracion_Catastro_3, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Xunqueira de Espadanedo', title: '<img src="styles/legend/ECONS_REGULAR.png" /> Regular'
});

var lyr_Malo = new ol.layer.Vector({
    declutter: false, source: source_Malo, style: style_EibCcl_Numeracion_Catastro_3, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Xunqueira de Espadanedo', title: '<img src="styles/legend/ECONS_MALO.png" /> Malo'
});

var lyr_Ruina = new ol.layer.Vector({
    declutter: false, source: source_Ruina, style: style_EibCcl_Numeracion_Catastro_3, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Xunqueira de Espadanedo', title: '<img src="styles/legend/ECONS_RUINA.png" /> Ruina'
});

var lyr_Vacio = new ol.layer.Vector({
    declutter: false, source: source_Vacio, style: style_EibCcl_Numeracion_Catastro_3, interactive: true,
    maxResolution: resoluciones.maxResolution, minResolution: resoluciones.minResolution,
    popuplayertitle: 'Numeración Xunqueira de Espadanedo', title: '<img src="styles/legend/ECONS_VACIO.png" /> Sin especificar'
});

// Agrupamos los checkboxes dentro de su grupo original NUMERACION
var group_Eib_Numeracion = new ol.layer.Group({
    layers: [lyr_Bueno, lyr_Regular, lyr_Malo, lyr_Ruina, lyr_Vacio],
    fold: 'close',
    title: 'NUMERACION'
});

var group_Auxiliares = new ol.layer.Group({
    layers: [],
    fold: 'open',
    title: 'Auxiliares'
});

var group_Eib_Trabajo_Vacio = new ol.layer.Group({
    layers: [],
    fold: 'open',
    title: 'Eib_Trabajo'
});

var group_Varios = new ol.layer.Group({
    layers: [lyr_GoogleSatellite_0, lyr_Ortoimagen_1, lyr_Catastro_2],
    fold: 'open',
    title: 'AUXILIARES'
});

var group_Cartografia = new ol.layer.Group({
    layers: [],
    fold: 'close',
    title: 'Cartografia'
});

var format_Eib_Lugares_0 = new ol.format.GeoJSON();
var features_Eib_Lugares_0 = format_Eib_Lugares_0.readFeatures(json_Eib_Lugares_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Eib_Lugares_0 = new ol.source.Vector({ attributions: ' ' });
jsonSource_Eib_Lugares_0.addFeatures(features_Eib_Lugares_0);

var lyr_Eib_Lugares_0 = new ol.layer.Vector({
    declutter: false,
    source: jsonSource_Eib_Lugares_0, 
    style: style_Eib_Lugares_0,
    popuplayertitle: 'Vías/Lugares Xunqueira de Espadanedo',
    interactive: true,
    opacity: 0.40000,
    title: 'Vías/Lugares Xunqueira de Espadanedo<br />\
    <img src="styles/legend/Eib_Lugares_0_124.png" />  5 - LG / PARADELA<br />\
    <img src="styles/legend/Eib_Lugares_0_104.png" />  10 - LG / PARDECONDE<br />\
    <img src="styles/legend/Eib_Lugares_0_105.png" />  12 - AL / ABELLEIRA<br />\
    <img src="styles/legend/Eib_Lugares_0_106.png" />  13 - CS / CASANOVA<br />\
    <img src="styles/legend/Eib_Lugares_0_107.png" />  14 - LG / MARCELLE<br />\
    <img src="styles/legend/Eib_Lugares_0_108.png" />  17 - LG / SAN MIGUEL<br />\
    <img src="styles/legend/Eib_Lugares_0_109.png" />  19 - LG / BARRIO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_110.png" />  20 - LG / CARBALLEIRA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_111.png" />  21 - AL / CARBUIZ<br />\
    <img src="styles/legend/Eib_Lugares_0_112.png" />  24 - LG / ESPADANEDO<br />\
    <img src="styles/legend/Eib_Lugares_0_113.png" />  25 - LG / GRAÑA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_114.png" />  26 - LG / MATO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_115.png" />  27 - LG / REBOREDA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_116.png" />  28 - AL / SAN PEDRO<br />\
    <img src="styles/legend/Eib_Lugares_0_117.png" />  29 - LG / VEIGA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_118.png" />  30 - LG / VILARIÑO<br />\
    <img src="styles/legend/Eib_Lugares_0_119.png" />  32 - LG / VEIGACHA<br />\
    <img src="styles/legend/Eib_Lugares_0_120.png" />  37 - PZ / AMIGOS (DOS)<br />\
    <img src="styles/legend/Eib_Lugares_0_121.png" />  38 - RU / BARREIRA (DA)<br />\
    <img src="styles/legend/Eib_Lugares_0_122.png" />  46 - RU / RELOXEIRO<br />\
    <img src="styles/legend/Eib_Lugares_0_123.png" />  48 - RU / CELAREIRA<br />\
    <img src="styles/legend/Eib_Lugares_0_125.png" />  50 - PZ / FONTE (DA)<br />\
    <img src="styles/legend/Eib_Lugares_0_143.png" />  52 - CR / GRAÑA (DA)<br />\
    <img src="styles/legend/Eib_Lugares_0_144.png" />  55 - RU / OBELLARIZA<br />\
    <img src="styles/legend/Eib_Lugares_0_145.png" />  59 - RU / SAN SALVADOR<br />\
    <img src="styles/legend/Eib_Lugares_0_146.png" />  65 - RU / CARBALLO (DO)<br />\
    <img src="styles/legend/Eib_Lugares_0_147.png" />  68 - RU / DON HERMOGENES GONZALEZ BLANCO<br />\
    <img src="styles/legend/Eib_Lugares_0_148.png" />  69 - AV / XUNQUEIRA DE ESPADANEDO<br />\
    <img src="styles/legend/Eib_Lugares_0_149.png" />  70 - RU / MANUEL GARRIDO<br />\
    <img src="styles/legend/Eib_Lugares_0_150.png" />  71 - RU / CASETAS<br />\
    <img src="styles/legend/Eib_Lugares_0_151.png" />  72 - LG / RAMIL<br />\
    <img src="styles/legend/Eib_Lugares_0_152.png" />  73 - RU / BARBEITOS<br />\
    <img src="styles/legend/Eib_Lugares_0_153.png" />  74 - RU / PENEDIÑO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_154.png" />  75 - RU / VEIGAS (AS)<br />\
    <img src="styles/legend/Eib_Lugares_0_126.png" />  5001 - RU / CAMPO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_127.png" />  5002 - CR / COMARCAL 536<br />\
    <img src="styles/legend/Eib_Lugares_0_128.png" />  5003 - RU / ICHO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_129.png" />  5004 - RU / NIÑODAGUIA<br />\
    <img src="styles/legend/Eib_Lugares_0_130.png" />  5005 - RU / PICOTA O MAIO (DA)<br />\
    <img src="styles/legend/Eib_Lugares_0_131.png" />  5006 - RU / PUMAR (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_132.png" />  5007 - RU / QUINTAIRAS (AS)<br />\
    <img src="styles/legend/Eib_Lugares_0_133.png" />  5008 - RU / BARRIO (DO)<br />\
    <img src="styles/legend/Eib_Lugares_0_134.png" />  5009 - RU / LAGAS (DAS)<br />\
    <img src="styles/legend/Eib_Lugares_0_135.png" />  5010 - RU / PARDECONDE<br />\
    <img src="styles/legend/Eib_Lugares_0_136.png" />  5011 - RU / RIAL<br />\
    <img src="styles/legend/Eib_Lugares_0_137.png" />  5012 - RU / VAZQUEZ PORTOMEÑE<br />\
    <img src="styles/legend/Eib_Lugares_0_138.png" />  5013 - RU / MOSTEIROS (OS)<br />\
    <img src="styles/legend/Eib_Lugares_0_139.png" />  5014 - TR / XUNQUEIRA DE ESPADANEDO<br />\
    <img src="styles/legend/Eib_Lugares_0_140.png" />  5015 - RU / RIO (O)<br />\
    <img src="styles/legend/Eib_Lugares_0_141.png" />  5016 - CR / REBOREDA (A)<br />\
    <img src="styles/legend/Eib_Lugares_0_142.png" />  5017 - CR / CERAMICAS (DAS)<br />\
    <img src="styles/legend/Eib_Lugares_0_155.png" /> <br />'
});

var group_Eib_Trabajo = new ol.layer.Group({
    layers: [lyr_Eib_Lugares_0],
    fold: 'close',
    title: 'NUCLEOS'
});

// Visibilidades iniciales
lyr_GoogleSatellite_0.setVisible(true);
lyr_Ortoimagen_1.setVisible(false);
lyr_Catastro_2.setVisible(true);
lyr_Bueno.setVisible(true); lyr_Regular.setVisible(true); lyr_Malo.setVisible(true); lyr_Ruina.setVisible(true); lyr_Vacio.setVisible(true);

var layersList = [group_Varios, group_Eib_Numeracion, group_Eib_Trabajo];

// =========================================================================
// CAPA GLOBAL INVISIBLE PARA EL BUSCADOR DE QGIS2WEB
// =========================================================================
var source_Completo = new ol.source.Vector({ attributions: ' ' });
source_Completo.addFeatures(features_EibCcl_Numeracion_Catastro_3);
var lyr_EibCcl_Numeracion_Catastro_3 = new ol.layer.Vector({ source: source_Completo });

// Asignación en bloque de metadatos, alias y labels a las 5 subcapas
var subCapas = [lyr_Bueno, lyr_Regular, lyr_Malo, lyr_Ruina, lyr_Vacio];
subCapas.forEach(function(lyr) {
    lyr.set('fieldAliases', {'fid': 'fid', 'REFCAT': 'REF. CATASTRAL', 'EibCcl_Callejero_eibEntAgp': 'PARROQUIA', 'ENH_CV_00': 'ENH_CV_00', 'ENH_N1_00': 'ENH_N1_00', 'ENH_L1_00': 'ENH_L1_00', 'ENH_MARCA': 'ENH_MARCA', 'ENC_CV_00': 'ENC_CV_00', 'ENC_N1_00': 'ENC_N1_00', 'ENC_L1_00': 'ENC_L1_00', 'ENC_MARCA': 'ENC_MARCA', 'ENA_CV_00': 'ENA_CV_00', 'ENA_N1_00': 'ENA_N1_00', 'ENA_L1_00': 'ENA_L1_00', 'ENA_MARCA': 'ENA_MARCA', 'ENP_CV_00': 'ENP_CV_00', 'ENP_N1_00': 'ENP_N1_00', 'ENP_L1_00': 'ENP_L1_00', 'ENP_MARCA': 'ENP_MARCA', 'END_CV_00': 'END_CV_00', 'END_N1_00': 'NUMERO', 'END_L1_00': 'LETRA', 'END_MARCA': 'END_MARCA', 'EN1_TIPO': 'EN1_TIPO', 'NOMVIA': 'EN1_NOMVIA', 'EN1_PRQ': 'EN1_PRQ', 'EN1_SGVIA': 'EN1_SGVIA', 'Copia_5': 'Copia_5', 'Copia_6': 'Copia_6', 'Copia_7': 'Copia_7', 'Copia_8': 'Copia_8', 'DUPLICADOS': 'DUPLICADOS', 'rotation': 'rotation', 'EibCcl_Callejero_eibTipVia': 'SIGLA', 'EibCcl_Callejero_eibNomVia': 'VIA/LUGAR', 'CV_NUM': 'CV_NUM', 'ID_CV_NA': 'ID_CV_NA', 'ID_CV_NP': 'ID_CV_NP', 'ID_MODIF': 'MODIFICACION', 'ID_CV_ND': 'ID_CV_ND', 'DIRECCION': 'DIRECCION', 'FOTOS_codmun': 'FOTOS_codmun', 'FOTOS_foto_01': 'Foto_01', 'FOTOS_foto_02': 'Foto_02', 'FOTOS_foto_03': 'Foto_03', 'FOTOS_foto_04': 'Foto_04', 'FOTOS_foto_05': 'Foto_05', 'FOTOS_foto_06': 'Foto_06', 'FOTOS_foto_07': 'Foto_07', 'FOTOS_foto_08': 'Foto_08', 'FOTOS_foto_09': 'Foto_09', 'ESTADOS_CONS_Estado_Conservacion': 'Est. Conserv.', });
    lyr.set('fieldImages', {'fid': 'TextEdit', 'REFCAT': 'TextEdit', 'EibCcl_Callejero_eibEntAgp': 'TextEdit', 'ENH_CV_00': 'Range', 'ENH_N1_00': 'Range', 'ENH_L1_00': 'TextEdit', 'ENH_MARCA': 'TextEdit', 'ENC_CV_00': 'Range', 'ENC_N1_00': 'Range', 'ENC_L1_00': 'TextEdit', 'ENC_MARCA': 'TextEdit', 'ENA_CV_00': 'Range', 'ENA_N1_00': 'Range', 'ENA_L1_00': 'TextEdit', 'ENA_MARCA': 'TextEdit', 'ENP_CV_00': 'Range', 'ENP_N1_00': 'Range', 'ENP_L1_00': 'TextEdit', 'ENP_MARCA': 'TextEdit', 'END_CV_00': 'Range', 'END_N1_00': 'Range', 'END_L1_00': 'TextEdit', 'END_MARCA': 'TextEdit', 'EN1_TIPO': 'TextEdit', 'EN1_NOMVIA': 'TextEdit', 'EN1_PRQ': 'TextEdit', 'EN1_SGVIA': 'TextEdit', 'Copia_5': 'TextEdit', 'Copia_6': 'TextEdit', 'Copia_7': 'TextEdit', 'Copia_8': 'TextEdit', 'DUPLICADOS': 'TextEdit', 'rotation': 'TextEdit', 'EibCcl_Callejero_eibTipVia': 'TextEdit', 'EibCcl_Callejero_eibNomVia': 'TextEdit', 'CV_NUM': 'TextEdit', 'ID_CV_NA': 'Range', 'ID_CV_NP': 'Range', 'ID_MODIF': 'TextEdit', 'ID_CV_ND': 'Range', 'DIRECCION': 'TextEdit', 'FOTOS_codmun': 'TextEdit', 'FOTOS_foto_01': 'TextEdit', 'FOTOS_foto_02': 'TextEdit', 'FOTOS_foto_03': 'TextEdit', 'FOTOS_foto_04': 'TextEdit', 'FOTOS_foto_05': 'TextEdit', 'FOTOS_foto_06': 'TextEdit', 'FOTOS_foto_07': 'TextEdit', 'FOTOS_foto_08': 'TextEdit', 'FOTOS_foto_09': 'TextEdit', 'ESTADOS_CONS_Estado_Conservacion': '', });
    lyr.set('fieldLabels', {'fid': 'hidden field', 'REFCAT': 'inline label - always visible', 'EibCcl_Callejero_eibEntAgp': 'inline label - always visible', 'ENH_CV_00': 'hidden field', 'ENH_N1_00': 'hidden field', 'ENH_L1_00': 'hidden field', 'ENH_MARCA': 'hidden field', 'ENC_CV_00': 'hidden field', 'ENC_N1_00': 'hidden field', 'ENC_L1_00': 'hidden field', 'ENC_MARCA': 'hidden field', 'ENA_CV_00': 'hidden field', 'ENA_N1_00': 'hidden field', 'ENA_L1_00': 'hidden field', 'ENA_MARCA': 'hidden field', 'ENP_CV_00': 'hidden field', 'ENP_N1_00': 'hidden field', 'ENP_L1_00': 'hidden field', 'ENP_MARCA': 'hidden field', 'END_CV_00': 'hidden field', 'END_N1_00': 'inline label - always visible', 'END_L1_00': 'inline label - always visible', 'END_MARCA': 'hidden field', 'EN1_TIPO': 'inline label - always visible', 'EN1_NOMVIA': 'hidden field', 'EN1_PRQ': 'hidden field', 'EN1_SGVIA': 'hidden field', 'Copia_5': 'hidden field', 'Copia_6': 'hidden field', 'Copia_7': 'hidden field', 'Copia_8': 'hidden field', 'DUPLICADOS': 'hidden field', 'rotation': 'hidden field', 'EibCcl_Callejero_eibTipVia': 'inline label - always visible', 'EibCcl_Callejero_eibNomVia': 'inline label - always visible', 'CV_NUM': 'hidden field', 'ID_CV_NA': 'hidden field', 'ID_CV_NP': 'hidden field', 'ID_MODIF': 'inline label - always visible', 'ID_CV_ND': 'hidden field', 'DIRECCION': 'inline label - always visible', 'FOTOS_codmun': 'hidden field', 'FOTOS_foto_01': 'inline label - visible with data', 'FOTOS_foto_02': 'inline label - visible with data', 'FOTOS_foto_03': 'inline label - visible with data', 'FOTOS_foto_04': 'inline label - visible with data', 'FOTOS_foto_05': 'inline label - visible with data', 'FOTOS_foto_06': 'inline label - visible with data', 'FOTOS_foto_07': 'inline label - visible with data', 'FOTOS_foto_08': 'inline label - visible with data', 'FOTOS_foto_09': 'inline label - visible with data', 'ESTADOS_CONS_Estado_Conservacion': 'inline label - visible with data', });
    
    lyr.on('precompose', function(evt) {
        evt.context.globalCompositeOperation = 'normal';
    });
});

lyr_Eib_Lugares_0.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});

// Control estricto del orden del renderizado en pantalla (Z-Index)
lyr_Eib_Lugares_0.setZIndex(10);
lyr_Bueno.setZIndex(100);
lyr_Malo.setZIndex(100);
lyr_Regular.setZIndex(100);
lyr_Ruina.setZIndex(100);
lyr_Vacio.setZIndex(100);