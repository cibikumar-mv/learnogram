import React from 'react'
import Navbar from '../Navbar/Navbar'
import Toast from '../Toast/Toast1'
import MiniPost from '../Posts/MiniPost/MiniPost'
const Home = () => {
  return (

    <div>
        <Navbar />
        <MiniPost/>
        <Toast name="haris" toastType="0" />
    </div>
  )
}

export default Home