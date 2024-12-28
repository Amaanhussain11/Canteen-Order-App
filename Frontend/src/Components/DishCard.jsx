import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci"

function DishCard() {

    const [searchresult, setsearchresult] = useState([]);
    const {id} = useParams();
    useEffect(() => {
        fetch(`http://localhost:5555/Dishes`).then(
            res => res.json()
        ).then(
            data => setsearchresult(data.dish)
        ).catch((err) => {
            console.log(err)
        })
    }, [])

    const handleadddish = () => {
        prompt(``)
        
    }


    return (
        <div className='flex justify-center flex-col border items-center'>
            <h3>DishCard</h3>

            <ul className='flex flex-col justify-center'>

                {

                    searchresult.map((res, index) => (
                        
                            <li key={index} className='border'>
                                <div>
                                <span className='p-3'>{res.name}</span>
                                <span className='p-3'>{res.price}</span>

                                </div>

                                <CiSquarePlus fontSize={30} className='cursor-pointer' onClick={handleadddish}/>

                            </li>
                            
                            
                            

                        

                    ))

                }

            </ul>

        </div>
    )
}

export default DishCard
