/*
 * 初始化地图数据，mapUtils中110行调用此函数
 */
function initMapData() {
	
	var videoList = [
		{
			'id':1,
			'longitude':119.0047,
			'latitude':28.9363
		},
		{
			'id':2,
			'longitude':119.0031,
			'latitude':28.9313
		},
		{
			'id':3,
			'longitude':119.0070,
			'latitude':28.9423
		},
		{
			'id':4,
			'longitude':119.0081,
			'latitude':28.9307
		}
		,
		{
			'id':5,
			'longitude':118.9908,
			'latitude':28.9326
		}
	];
	
	var typeList = [
		{
			'id':1,
			'longitude':118.9909,
			'latitude':28.9312
		},
		{
			'id':1,
			'longitude':118.9979,
			'latitude':28.9329
		},
		{
			'id':2,
			'longitude':119.0099,
			'latitude':28.9302
		},
		{
			'id':2,
			'longitude':119.0021,
			'latitude':28.9317
		}
		,
		{
			'id':3,
			'longitude':119.0080,
			'latitude':28.9417
		}
	];
	
	
	var projectLayer = new esri.layers.GraphicsLayer({id: "video"});
    map.addLayer(projectLayer);
    
    for (var i=0;i<videoList.length;i++) {
    	var pt = new esri.geometry.Point(parseFloat(videoList[i].longitude), parseFloat(videoList[i].latitude), map.spatialReference);
    	var Symbol = new esri.symbol.PictureMarkerSymbol({
			url: '/hezhanzhi/static/lib/map/img/icon-sp.png',
			width: 20,
			height: 20
		});
		var attr = {
			id: videoList[i].id,
			Longitude : videoList[i].longitude,
			Latitude : videoList[i].latitude
		}
		var graphic = new esri.Graphic(pt, Symbol, attr);
		projectLayer.add(graphic);
    }
    
    for (var i=0;i<typeList.length;i++) {
    	var pt = new esri.geometry.Point(parseFloat(typeList[i].longitude), parseFloat(typeList[i].latitude), map.spatialReference);
    	var Symbol = new esri.symbol.PictureMarkerSymbol({
			url: '/hezhanzhi/static/img/icon/icon_map_'+typeList[i].id+'.png',
			width: 15,
			height: 15
		});
		var attr = {
			id: typeList[i].id,
			Longitude : typeList[i].longitude,
			Latitude : typeList[i].latitude
		}
		var graphic = new esri.Graphic(pt, Symbol, attr);
		projectLayer.add(graphic);
    }
    
    projectLayer.on("click", function (result) {
		var pt = new esri.geometry.Point(parseFloat(result.graphic.attributes.Longitude), parseFloat(result.graphic.attributes.Latitude), map.spatialReference);
		map.infoWindow.setTitle("<div style='color:white'>实时监控信息 </div>");
		
		var infoHtml = `<img src="/hezhanzhi/static/img/jk.png" style="width:100%;height:auto;">
						<p><strong>乌引灌区下山溪河道实时监控</strong></p>
						<p>地理位置 : 320国道附近</p>
						<p>水质状况 : VII级</p>
						<p>负责人 &nbsp&nbsp&nbsp: 李郭新</p>
						<p>负责电话 : 13067833564</p>`;
		map.infoWindow.setContent(infoHtml);
        map.infoWindow.show(pt);
		
		map.centerAndZoom(pt, 16);

	});
    
}
