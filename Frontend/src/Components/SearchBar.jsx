import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import axios from "axios"


const SearchBar = () => {

    const [dishname, setdishname] = useState("");
    const handlechange = (e) => {
        setdishname(e.target.value);
        // console.log({dishname})
    }

    const [searchresult, setsearchresult] = useState([]);
    const handlesearch = async () => {
        try {
            const res = await axios.get(`http://localhost:5555/Dishes/search?&name=${dishname}`);
            // console.log({ dishname })
            setsearchresult(res.data);
            console.log(searchresult);
            

        }
        
        catch {
            (err) => {
                console.log(err);
            }
        }
    }
    return (
        <div className='flex justify-center items-center'>
            <input type='text' onChange={handlechange} placeholder='Search Dishes' value={dishname} className='border-2 border-black '></input>
            <IoSearch onClick={handlesearch} className='cursor-pointer'/>
            <div className="border">
                {
                    searchresult.length > 0 ? (
                        <ul>
                            {
                                searchresult.map((res,index)=>(
                                    <li key={index}>{res.name}</li>
                                    
                                ))
                            }
                            {/* {
                                searchresult.map((res,index)=>(
                                    <li key={index}>{res.price}</li>
                                    
                                ))
                            }
                            {
                                searchresult.map((res,index)=>(
                                    <li key={index}>{res.type}</li>
                                    
                                ))
                            } */}

                        </ul>
                    ):(
                        <p> No results found for {dishname} </p>
                    )
                    
                }
            </div>
        </div>

    )
}

export default SearchBar
