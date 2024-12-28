import React, { useState } from 'react'
import { RiFileList3Fill } from "react-icons/ri";

const Dishlist = () => {
    const [dishlist,setdishlist] = useState([]);
    const handledishlist = ()=>{
      alert("Dish List Clicked")
    }
    
  return (
    <div className='flex justify-center'>
      <RiFileList3Fill fontSize={30} className='cursor-pointer' onClick={handledishlist}/>
    </div>
  )
}

export default Dishlist
