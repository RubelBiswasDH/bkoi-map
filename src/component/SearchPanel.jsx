import React, { useState, useEffect, useRef } from "react"
// import bkoigl from "bkoi-gl"
import '../App.css'


const SearchPanel = () => {
  
  const {Bkoi} = window;
  const [data,setData] = useState("")
  console.log("Bkoi")
  console.log(Bkoi)
  console.log(typeof(Bkoi.container))

  const [search, setSearch] = useState("");

    useEffect(()=>{
      Bkoi.search(search, response => 
      { 
        setData(response);
      })
     
    },[search])
  
  

return(
    <div className="Search-panel-container" >
      
      <input className=" bksearch" onChange={(e)=> setSearch(prevState => prevState = e.target.value)} placeholder="Search Location" value={search}/>
      <div className="bklist"></div>
    </div>
)

}

export default SearchPanel;

 
