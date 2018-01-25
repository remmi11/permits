
        function onEachFeatureTownships(feature, layer) {

            var popupContent = "<p>Township: " + feature.properties.NAME;

            if (feature.properties && feature.properties.popupContent) {
                popupContent
            }

            layer.bindPopup(popupContent);
        }

        function onEachFeatureVillages(feature, layer) {

            var popupContent = "<p>Village: " + feature.properties.NAME;

            if (feature.properties && feature.properties.popupContent) {
                popupContent
            }

            layer.bindPopup(popupContent);
        }

        function onEachFeatureRandall(feature, layer) {

            var popupContent = "<p>Abstract No: " + feature.properties.ANUM;

            if (feature.properties && feature.properties.popupContent) {
                popupContent
            }

            layer.bindPopup(popupContent);
        }


        // Pass features and a custom factory function to the map
        // var myLayer = L.mapbox.featureLayer().addTo(map);
        // myLayer.setGeoJSON(geojson);
        // myLayer.on('click', function (e) {

        //     //window.open(e.layer.feature.properties.url);
        // });

        var featureStyle = {
            "color": "#ff7800",
            "weight": 5,
            "opacity": 0.2
        };

        var townships = L.geoJson(geojson, {
            style: featureStyle,
            onEachFeature: onEachFeatureTownships
        });

        var villages = L.geoJson(villages, {
            style: featureStyle,
            onEachFeature: onEachFeatureVillages
        });

        var sections = L.geoJson(randall, {
            style: featureStyle,
            onEachFeature: onEachFeature
        });


        function onEachFeature(feature, layer) {
            //var popupContent = "<p>Abstract No: " + feature.properties.ANUM;
            //bind click
            layer.on({
                click: whenClicked(layer)
            });

        }

        function whenClicked(layer) {
            // e = event
            console.log(layer);
            var popupContent = "<p>Abstract No: " + layer.target.feature.properties.ANUM;
            layer.bindPopup(popupContent);
            // You can make your ajax call declaration here
            //$.ajax(... 
        }

        var map = L.map("map", {
            maxZoom: 18,
            zoomControl: false,
            layers: [outdoors, townships, villages, sections],
            attributionControl: false
        });

        var myFeatureGroup = L.featureGroup([townships, villages, sections]);
        map.fitBounds(myFeatureGroup.getBounds());


        var removeGroup = L.featureGroup();

        removeGroup.addTo(map);

        function onLocationFound(e) {
            var radius = e.latlng
            console.log(e.latlng.lat)
            console.log(e.latlng.lng)
            //fire event 'click' on target layer 
            map.fireEvent('click', { latlng: [e.latlng.lng, e.latlng.lat] });
        }

        function mtr2ft(radius) {
            var feet = radius * 3.2808;
            return feet.toFixed(2);
            // var num = 5.56789;
            // var n = num.toFixed(2);
        }

        map.on('locationfound', onLocationFound);

        function onLocationError(e) {
            alert(e.message);
        }

        map.on('locationerror', onLocationError);

        $("#locator").click(function () {
            map.locate({ setView: true, maxZoom: 16 });
            map.setView(new L.LatLng(40.737, -73.923), 8);
        });

        // $("#reset").click(function () {
        //     console.log('reset')
        //     removeGroup.clearLayers();
        //     map.fitBounds(myFeatureGroup.getBounds());
        // });