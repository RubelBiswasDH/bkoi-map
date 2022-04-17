// import './App.css';
// import { bkoiConfig } from 'bkoi-gl/src/util/config';
import React, { useEffect, useState } from "react"
import bkoigl from "bkoi-gl"
import "bkoi-gl/dist/style/bkoi-gl.css"
import { useSelector } from "react-redux"
import axios from "axios"

const MapPanel = () => {

    const [mapMarker, setMapMarker] = useState();
    const [mapObject, setMapObject] = useState();
    const [mapStyle, setMapStyle] = useState();

    const mapData = useSelector(prevState => prevState);

    const accessToken = process.env.REACT_APP_BKOI_API;

    useEffect(()=>{
        const fetchStyle = async () => {
            const bkoi_data = {
                id: "bkoi",
                type: "symbol",
                source: "data",
                "source-layer": "ucode",
                minzoom: 5,
                filter: ["all", ["==", "$type", "Point"], ["in", "ucode", "BKOI2017"]],
                layout: {
                    "icon-image": "office_11",
                    "text-anchor": "left",
                    "text-field": "{name_en}",
                    "text-font": ["Roboto Condensed Italic"],
                    "text-max-width" : 9,
                    "text-offset" : [0.8,0.2],
                    "text-size" : 16,
                    "visibility":"visible",
                },
                paint:{
                    "text-color" : "red",
                    "text-halo-blur" : 0.5,
                    "text-halo-color" : "#ffffff",
                    "text-halo-width" : 1
                }
            }


            try {
                const response = await axios.get('https://map.barikoi.com/styles/osm-bright/style.json?key='+`${accessToken}`);
                
                response.data.layers[92].minzoom = 19;
                response.data.layers[91].minzoom = 10;
                response.data.layers[14].paint['fill-color'] = "gray";

                response.data.layers[2].paint['fill-color'] = "red";
                response.data.layers[38].paint['fill-color'] = "orangered";
                response.data.layers[45].paint['line-color'] = "black";
                response.data.layers[45].paint['line-color'] = "black";
                response.data.layers[96].paint['text-color'] = "red";
                response.data.layers[39].paint['fill-extrusion-color'] = "yellow";
                response.data.layers[39].minzoom= 18;
                response.data.layers[12].paint['line-color'] = "blue";
                response.data.layers[13].paint['line-color'] = "blue";
                response.data.layers[58].paint['line-color'] = "red";
                response.data.layers.push(bkoi_data)

                //response.data.layers[96].paint['text-halo-color'] = "red";
                //console.log(response.data.layers.slice(0,5))
                setMapStyle(prevState => prevState = response.data);
                console.log("response")
                console.log(response.data.layers[91])

            } catch (error) {
                throw(error)
            }
        }
        fetchStyle()
    },[])


    // creating map and navigation control 
    useEffect(()=> {
       console.log("entered")
        bkoigl.accessToken = process.env.REACT_APP_BKOI_API // required
         const map = new bkoigl.Map({
            container: 'map',  
            center: mapData.currentLocation ? [  mapData.currentLocation.long,  mapData.currentLocation.lat ] : [ 90.3938010872331, 23.821600277500405 ],  
            zoom: 13,
            // controlPositions: 'topLeft',
            style: mapData.themeType === 'dark' ? 'https://map.barikoi.com/styles/barikoi-dark/style.json' :  mapStyle
            // style: mapStyle
        });

        // Navigation Control Loader
        const controlLoader = () =>{ 
            
            map.addControl( 
                new bkoigl.FullscreenControl() 
            ) 
            map.addControl( 
                new bkoigl.NavigationControl()
            ) 
            map.addControl(
                new bkoigl.ScaleControl() 
            ) 
          
        }
        

        window.addEventListener("load", controlLoader) ;
        setMapObject(prevState => prevState = map);

  
        return () =>{ 
        console.log("Exit") 
        window.removeEventListener("load", controlLoader)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[mapData.themeType, mapStyle])
 
   

// Marking and jumping to map section on new location
    useEffect(()=>{
        if(mapData.currentLocation && mapObject ){
            const {currentLocation} = mapData;
            const markerColor = setMarkerColor(currentLocation.locationType);
  
            mapMarker && mapMarker.remove();
     
            mapObject.flyTo({
                center: [  mapData.currentLocation.long,  mapData.currentLocation.lat ],
                zoom: 13 
            })

            const marker = new bkoigl.Marker({color: markerColor})
            .setLngLat([  mapData.currentLocation.long,  mapData.currentLocation.lat ])
            .addTo(mapObject)
            setMapMarker(prevState=> prevState = marker)
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[mapData.currentLocation])


    // setting Location Marker color
    const setMarkerColor = (propertyType) => {
   
        const property = propertyType.substring().toLowerCase();

        if(property === "admin") return "orange";
        else if(property === "office") return "yellow";
        else if(property === "industry") return "red";
        else if(property === "education") return "brown";
        else if(property === "commercial") return "blue";
        else if(property === "shop") return "pink";
        else return "green"
    }

    // handlers
    mapObject && mapObject.on('style.load', function() {

        mapObject.on('click', function(e) {
        let l = mapObject.getStyle().layers;

         
            var features = mapObject.queryRenderedFeatures(e.point);
            console.log({ features })
        
      
            new bkoigl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('you clicked here: <br/>' + features[0].properties.ucode)
                .addTo(mapObject);
                console.log(features[0].properties)
        });
      });

  
return(
    <div >
        <div id="map">

        </div>
        {/* <button onClick={a}>Click</button> */}
    </div>
)
}

export default MapPanel;

 
