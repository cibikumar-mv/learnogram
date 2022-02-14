//react imports
import React, { useEffect, useRef, useState } from "react";
import { Grid, Button } from "@mui/material";
import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import DeleteField from "./DeleteField";
const ImageComp = (props) => {
  //hooks
  const [image, setImage] = useState(null);
  let fileInputRef = useRef(null);
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        props.imageChange(props.index, reader.result);
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
    <Grid container spacing={2} padding={2}>
      <Grid item xs={10}>
        {props.value ? (
          <img
            src={props.value}
            alt="preview"
            style={{ objectFit: "cover", width: "300px", height: "300px" }}
            onClick={() => {
              setImage(null);
              props.imageChange(props.index, "");
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
      </Grid>
      <Grid item xs={2}>
        <DeleteField deleteClick={props.deleteClick} index={props.index}/>
      </Grid>
    </Grid>
  );
};

export default ImageComp;
