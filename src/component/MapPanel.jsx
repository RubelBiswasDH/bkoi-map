// import './App.css';
// import { bkoiConfig } from 'bkoi-gl/src/util/config';
import React, { useEffect, useRef, useState } from "react"
import bkoigl from "bkoi-gl"
import "bkoi-gl/dist/style/bkoi-gl.css"

const MapPanel = () => {

    
    // console.log("Bkoi")
  
    // console.log(Bkoi)
    // console.log("sssss")
    // const container = useRef(null)
    // let map;
    let map;
    useEffect(()=> {
        bkoigl.accessToken = 'MzE0MTowQzJLM0VQRTJV' // required
         map = new bkoigl.Map({
            container: 'map',  
            center: [ 90.3938010872331, 23.821600277500405 ],  
            zoom: 13,
            // controlPositions: 'topLeft',
            // style: 'https://map.barikoi.com/styles/barikoi-dark/style.json'
        });
        console.log(map);  
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
            // const marker = new bkoigl.Marker({ draggable: true })
            // .setLngLat([ 90.3938010872331, 29.821600277500405 ])
            // .addTo(map)
        }
        window.addEventListener("load", controlLoader) ;

  
        return () =>{ 
        console.log("Exit")
        window.removeEventListener("load", controlLoader)
        }
    },[])

    
    

   

return(
    <div >
        <div id="map">

        </div>
    </div>
)
}

export default MapPanel;

 
