import React, { useContext } from 'react'
import { RiFileList3Fill } from "react-icons/ri";
import { GlobalContextprice } from "../Context/Contextvarprice";
import {Link} from "react-router-dom"

const stickyfooter = () => {

  const [pricelist] = useContext(GlobalContextprice);
  const Total = pricelist.reduce((sum, num) => sum + num, 0);
  return (
    <div className='text-[#3E2723] fixed bottom-[0] left-0 right-0 bg-[#DB8F4D] w-full h-[13%] flex items-center justify-between'>
      <div className='mx-4'>
        Total Orders - ₹{Total}
      </div>
      <Link className=' mx-4 h-[70px] w-[100px]  bg-[#7DCEA0] rounded-xl flex justify-between items-center' to="/list">
        <span className='mx-2'><RiFileList3Fill fontSize={40}/></span>
        <span className='text-sm w-fit'>Place Order</span>
      </Link>
    </div>
  )
}

export default stickyfooter
