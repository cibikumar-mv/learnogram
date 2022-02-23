import React from 'react'
import Navbar from '../Navbar/Navbar'
import Toast from '../Toast/Toast1'
import MiniPost from '../Posts/MiniPost/MiniPost'
const Home = () => {
  return (

    <div>
        {/* <Toast toastType = "0" name = "Haris0"/> */}
        <Navbar />
        <MiniPost/>
    </div>
  )
}

export default Home