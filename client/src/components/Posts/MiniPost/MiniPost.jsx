//React Imports
import * as React from "react";
import { styled } from "@mui/material/styles";
 
import IconButton from "@mui/material/IconButton";  
import { useSelector } from "react-redux";
import "./miniPostStyle.css"; 
import { useNavigate, useParams } from "react-router-dom"; 
import "react-loading-skeleton/dist/skeleton.css";
import MiniPostSkeleton from './MiniPostSkeleton';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import SinglePost from "./SinglePost";
// import { Splide , SplideSlide } from '@splidejs/splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Grid } from "@mui/material";
//themes

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const GetPost = () => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const navigate = useNavigate();
  // React.useEffect(() => {
  //   console.log("Posts:", posts);
  // });
  //fuctions
  
  if (!isLoading) {
    return (
      <div className="body">
        <Grid>
          {/* <Splide
            options={{
              perPage: 4,
              arrows: false,
              pagination: false,
              drag: "free",
              breakpoints: {
                1400: {
                  perPage: 3,
                },
                900: {
                  perPage: 2,
                },
                700: {
                  // perPage:1,
                  destroy: true,
                },
              },
            }}
          > */}
          <div className="miniPostCon">
            {posts.map((ele, idx) => (
              // <SplideSlide key={idx}>
              <div key={idx}>
                <SinglePost details={ele} header />
              {/* </SplideSlide> */}
              </div>
            ))}
            </div>
          {/* </Splide> */}
        </Grid>
      </div>
    );
  } else {
    return (
      <div className="miniPostCon">
        {[...Array(5)].map((ele, idx) => (
          <MiniPostSkeleton key= {idx} />
        ))}
      </div>
    );
  }
};

export default GetPost;
