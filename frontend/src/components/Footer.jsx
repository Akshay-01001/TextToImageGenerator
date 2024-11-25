import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-wrap items-center justify-between gap-4 py-3 mt-20 text-center pb-6'>
      <img src={assets.logo} width={150} alt="" />
      <p className='flex-1 pl-4 text-sm text-gray-500 max-sm:hidden'>Copyright @Imagify | All right reserved</p>

      <div className='flex gap-2.5'>
        <img src={assets.facebook_icon} alt="" width={35}/>
        <img src={assets.twitter_icon} alt="" width={35}/>
        <img src={assets.instagram_icon} alt="" width={35}/>
      </div>
    </div>
  )
}

export default Footer