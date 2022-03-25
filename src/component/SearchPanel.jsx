import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as dispatchFunction from '../redux-states/actionCreator';
// import bkoigl from "bkoi-gl"
import "../App.css";
import {MdOutlineKeyboardArrowLeft, MdClear}  from "react-icons/md";


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

//  Search request
    useEffect(()=>{
      Bkoi.search(search, response => 
      { 
        setData(response);
      })
     
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[search])
    

    const selectedItemHandler = (item) => {
      dispatch(dispatchFunction.setLocationState(item))
    }

    const toggleThemehandler =() =>{
      const {themeType} = mapData;
      if(themeType === 'dark'){
        
         dispatch(dispatchFunction.setTheme("light"))
      }
      else{
        dispatch(dispatchFunction.setTheme("dark"))
      }
    }
 

return(
    <div className="search-panel-container"  style={mapData.themeType === 'dark' ? styleDark : styleLight}>
      <div className="logo-container">
        <a  href="/" className="logo">Bari<span className="logo-span">Koi</span></a>
        <div className="toggle-search-panel">
          <MdOutlineKeyboardArrowLeft />
        </div>
        {/* <div className="toggle-search-panel"><MdOutlineKeyboardArrowRight /></div> */}
      </div>
      <div className="input-container">
        <button className="theme-changer" onClick={toggleThemehandler}>Change Theme</button>
        <div className="searchbar-container">
          <input className="bksearch" onChange={(e)=> setSearch(prevState => prevState = e.target.value)} placeholder="Search Location" value={search}/>
          {
            search ? 
              <MdClear className="close-btn" onClick={(e)=> setSearch(prevState => prevState = "")} style={mapData.themeType === 'dark' ? styleLight : styleDark}/>
            :
            <div className="search-icon" >
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16 fa-sm " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" color="white"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
            </div>
          }

        </div>
      </div>
      <div className="autocomplete-content" style={mapData.themeType === 'dark' ? styleDark : styleLight}>
          <ul className="scroll">
            {data && data.map((item,index) => (
                <li className="search-option-list" key={item.id} onClick={() => selectedItemHandler(item)}>
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

 
