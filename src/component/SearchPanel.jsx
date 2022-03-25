import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as dispatchFunction from '../redux-states/actionCreator';
// import bkoigl from "bkoi-gl"
import "../App.css";


const SearchPanel = () => {
  
  const {Bkoi} = window;
  const [data,setData] = useState("")
  const [search, setSearch] = useState("");
 

  const dispatch = useDispatch();
  const mapData = useSelector(prevState => prevState)

  const styleDark = {
    backgroundColor: "black",
    color: "white"
  }
  const styleLight = {
    backgroundColor: "white",
    color: "black"
  }


    useEffect(()=>{
      Bkoi.search(search, response => 
      { 
        setData(response);
      })
     
    },[search])
    // console.log("mapData")
    // console.log(mapData)
    

    const selectedItemHandler = (item) => {
      dispatch(dispatchFunction.setLocationState(item))
    }

    const toggleThemehandler =() =>{
      console.log("entered +++++++++++++++")
      // // console.log(mapData)
      // // console.log(mapData.themeType)
      const {themeType} = mapData;
      // console.log("+++++++++++++++++++")
      console.log(themeType)
      if(themeType === 'dark'){
        
         dispatch(dispatchFunction.setTheme("light"))
      }
      else{
        dispatch(dispatchFunction.setTheme("dark"))
      }
    }
 

return(
    <div className="Search-panel-container"  style={mapData.themeType === 'dark' ? styleDark : styleLight}>
       <button onClick={toggleThemehandler}>Change Theme</button>
      <input className="bksearch" onChange={(e)=> setSearch(prevState => prevState = e.target.value)} placeholder="Search Location" value={search}/>
      <div className="autocomplete-content">
          <ul className="scroll">
            {data && data.map((item,index) => (
                <li key={item.id} onClick={() => selectedItemHandler(item)}>
                  <div className="location-icon">
                    <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" className="svg-inline--fa fa-map-marker-alt fa-w-12 fa-lg location-svg " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" color="black"><path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>
                  </div>
                  <div className="autocomlete-info">
                    <h4>{item.address}</h4>
                    <p>{`${item.address}, ${item.area}, ${item.city}`}</p>
                    <p><span>{item.pType}</span></p>
                  </div>
              </li>
              )
            )}
            
          </ul>
      </div>
    </div>
)

}

export default SearchPanel;

 
