//react imports
import React, { useEffect, useRef, useState } from "react";
import { Grid, Button } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
const ImageComp = (props) => {
  //hooks
  const [image, setImage] = useState(null);
  let fileInputRef = useRef(null);
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        props.imageChange(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      fileInputRef.current.value = "";
    }
  }, [image]);

  //functions
  const handleImageUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
  
  return (
      <>
        {props.value ? (
          <img
            src={props.value}
            alt="preview"
            style={{ objectFit: "cover", width: "200px", height: "200px", borderRadius: '50%'}}
            onClick={() => {
              setImage(null);
              props.imageChange("");
            }}
          />
        ) : (
          <Button
            variant="contained"
            component="span"
            startIcon={<PhotoCameraOutlinedIcon />}
            onClick={handleImageUpload}
          >
            Upload
          </Button>
        )}
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImage(file);
            } else {
              setImage(null);
            }
          }}
        />
        </>
  );
};

export default ImageComp;
