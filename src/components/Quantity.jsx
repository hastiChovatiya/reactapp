import React, { useState } from 'react'


export const Quantity = ({ decr, incr, amt, updateQuantity, price }) => {
   

    const setDecrease = () => {
        updateQuantity(amt > 1 ? amt - 1 : 1);
      };
    
      const setIncrease = () => {
        updateQuantity(amt < price ? amt + 1 : price);
      };
    return (
        <>
            <div className="flex ">
                <button onClick={() => setDecrease()} className='bg-purple-300 hover:bg-purple-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3'>
                {decr}
                </button>
                <div className='bg-purple-300 hover:bg-purple-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3'>{amt}</div>
                <button onClick={() => setIncrease()} className='bg-purple-300 hover:bg-purple-400 transition-transform duration-300 cursor-pointer rounded-full p-3 mr-3'>
                {incr}
                </button>
               
            </div>
        </>
    )
}
