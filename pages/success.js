import React from 'react'
import { useState , useEffect } from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'
import {useRouter} from 'next/router'
import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'
const Success = () => {
    const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext();
    const [order , setOrder ] = useState(null);
    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();  

    }, []);
  return (
    <div className='success-wrapper'>
      <div className='success'>
        <p className='icon'>
            <BsBagCheckFill/>
        </p>   
        <h2> Thank you for your order!</h2> 
        <p className='email-msg'>Check your email inbox for the receipt.</p>
        <p className='description'>
            If you have any questions, please email
            <a className='email' href='mailto:'>

            </a>
        </p>
        <Link href='/'>
            <button type='button' className='btn'>
                Continue Shopping
            </button>
        </Link>    
      </div>
    </div>
  )
}

export default Success
