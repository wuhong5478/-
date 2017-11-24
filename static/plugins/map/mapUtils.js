/*文件说明：这是关于地图操作的全部代码*/
dojo.require("esri.map");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.dijit.Measurement");
var map, dynamicMapServiceLayer;
var chusshi = true;
var arcgis_url = "http://192.193.194.5:6080/arcgis/rest/services/";
//var arcgis_url = "http://server.arcgisonline.com/ArcGIS/rest/services";
var selectedAttr;//设置选中的全局变量，便于详情取值
var mapToCenter = function () {//地图居中全局方法变量
    var CenterPoint = new esri.geometry.Point({
    	latitude: 28.9306,
    	longitude: 119.0018
    });
    map.centerAndZoom(CenterPoint, 15);
    //var find = new esri.tasks.FindTask(arcgis_url + "XZQH/MapServer");
    //var find = new esri.tasks.FindTask(arcgis_url + "ESRI_Imagery_World_2D/MapServer");
    //var find = new esri.tasks.FindTask(arcgis_url + "QuJiang2/QuJiang/MapServer");
    var find = new esri.tasks.FindTask(arcgis_url + "WuYin/WuYinGuanQu/MapServer");
    
    var params = new esri.tasks.FindParameters();
    params.layerIds = [1, 0];
    params.searchFields = ["ADCD"];
    params.returnGeometry = true;
    
    //params.searchText = "330800";
    find.execute(params, naviToADCD);
}
var ADCDLayer;
function naviToADCD(features) {
    if (features.length != 0) {
        var ADCDLayer = map.getLayer("ADCDLayer");
        if (ADCDLayer == undefined) {
            ADCDLayer = new esri.layers.GraphicsLayer({ id: "ADCDLayer" });
            map.addLayer(ADCDLayer);
        }
        var feature = features[0];
        var symbol = new esri.symbol.SimpleFillSymbol(
            esri.symbol.SimpleFillSymbol.STYLE_NULL,
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([0, 255, 0, 0.25]));
        feature.feature.setSymbol(symbol);
        ADCDLayer.add(feature.feature);
        map.setExtent(feature.feature.geometry.getExtent().setSpatialReference(new esri.SpatialReference({ wkid: 4326 })).expand(1.5));
    }
}

function switchBaseMap(type) {
    switch (type) {
        case 0:
            $("#Dtmap").attr('class', 'dituWH on');
            $("#Wxmap").attr('class', 'dituWH');
            ttdEMapLayer.setVisibility(true);
            ttdEMapLayerWenzi.setVisibility(true);
            ttdMapLayer.setVisibility(false);
            ttdMapLayerWenzi.setVisibility(false);
            break;
        case 1:
            $("#Dtmap").attr('class', 'dituWH');
            $("#Wxmap").attr('class', 'dituWH on');
            ttdEMapLayer.setVisibility(false);
            ttdEMapLayerWenzi.setVisibility(false);
            ttdMapLayer.setVisibility(true);
            ttdMapLayerWenzi.setVisibility(true);
            break;
    }
}
dojo.ready(initMap)//dojo成功加载才执行所有map相关代码
function initMap() {
    if (chusshi) {//仅初始化一次
        var popup = new esri.dijit.Popup({
            lineSymbol: new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2),
            fillSymbol: new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]))
        }, dojo.create("div"));
        map = new esri.Map("MyMapDiv", { logo: false, sliderStyle: "large", sliderPosition: "top-left", infoWindow: popup });
        ttdMapLayer = new TDTImgLayer();
        ttdMapLayerWenzi = new TDTImgWordLayer();

        ttdEMapLayer = new TDTVecLayer();
        ttdEMapLayerWenzi = new TDTEWordLayer();

        mapToCenter();//设置初次加载时的地图默认状态
    }
    else {
        map.removeLayer(ttdMapLayer);
        map.removeLayer(ttdMapLayerWenzi);
        map.removeLayer(ttdEMapLayer);
        map.removeLayer(ttdEMapLayerWenzi);
    }
    map.addLayer(ttdEMapLayer);
    map.addLayer(ttdEMapLayerWenzi);
    map.addLayer(ttdMapLayer);
    map.addLayer(ttdMapLayerWenzi);
    ttdEMapLayer.setVisibility(false);
    ttdEMapLayerWenzi.setVisibility(false);
    chusshi = false;
    dojo.connect(map, "onMouseMove", showCoordinates);
    dojo.connect(map, "onMouseDrag", showCoordinates);
    dynamicMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(arcgis_url + "WuYin/WuYinguanqu/MapServer");
    map.addLayer(dynamicMapServiceLayer);
    //dynamicMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(arcgis_url + "bcf/BackGround/MapServer", { id: "background" });
    //dynamicMapServiceLayer.setOpacity(0.5);
    //map.addLayer(dynamicMapServiceLayer);
 
   //dynamicMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(arcgis_url + "bcf/BackGround_Xian/MapServer", { id: "backgroundline", opacity: 0.5 });
    //var layerDefinitions = [];
    //layerDefinitions[0] = "名称<>'" + MapName + "'";
    //layerDefinitions[0] = "名称 not in (" + MapName + ")";
    //dynamicMapServiceLayer.setLayerDefinitions(layerDefinitions);
    //map.addLayer(dynamicMapServiceLayer);


    initMapData();
}

/*————显示坐标—————*/
function showCoordinates(evt) {
    mp = evt.mapPoint;
    dojo.byId("coordinate").innerHTML = "当前坐标：" + mp.x.toFixed(4) + "，" + mp.y.toFixed(4);
}
$(function () {
    $(document).on("click", ".maptype-card", function () {
        if (!$(this).hasClass("maptype-choosed")) {
            $(this).addClass("maptype-choosed").siblings().removeClass("maptype-choosed");
            var type = $(this).attr("data-name");
            switch (type) {
                case "normalMap":
                    switchBaseMap(0);
                    break;
                case "satellite":
                    switchBaseMap(1);
                    break;
            }
        }
    });
});
