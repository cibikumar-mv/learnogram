import React,{useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import Toast from '../Toast/Toast1'
import MiniPost from '../Posts/MiniPost/MiniPost'
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from '../../actions/posts';

const Home = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state)=>state.posts);
  
  useEffect(() => {
    console.log("Posts: ", posts);
    dispatch(fetchAll());
  }, [dispatch]);
  
  return (

    <div>
        <Navbar />
        <Toast name="haris" toastType="0" />
        
        <MiniPost/>
    </div>
  )
}

export default Home