//react imports
import {
  TextField,
  MenuItem,
  Grid,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//local imports
import Toast from "../../Toast/Toast1";
import TextComp from "./TextComp";
import ImageComp from "./ImageComp";
import LinkComp from "./LinkComp";
import AddField from "./AddField";
import { createPost } from "../../../actions/posts";

const CreatePost = () => {
  //declarations
  const roadMapTypes = ["Completed", "In Progress", "Suggestion"];
  const initialState = {
    title: "",
    type: "",
    tags: "",
    thumbnail: "",
    shortDesc: "",
    content: [],
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //hooks
  const [inputList, setInputList] = useState([]);
  const [postData, setPostData] = useState(initialState);
  useEffect(() => {
    if (!localStorage.getItem("profile")) {
      navigate("/auth");
    }
    console.log("PostData:", postData);
  }, [navigate]);

  //functions
  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...inputList];
    list[index].value = value;
    setInputList(list);
    setPostData((prevState) => ({
      ...prevState,
      content: list,
    }));
  };

  const handleContentImageChange = (index, base) => {
    const list = [...inputList];
    list[index].value = base;
    setInputList(list);
    setPostData((prevState) => ({
      ...prevState,
      content: list,
    }));
  };

  const handleImageChange = (image) => {
    setPostData((prevState) => ({
      ...prevState,
      thumbnail: image,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(postData.type.length === 0 );
    if (postData.type.length === 1) {
      Toast({toastType:"0",name: "Enter all the required fields   "})
    };

    console.log("postData", postData);
    dispatch(createPost(postData));
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    setPostData((prevState) => ({
      ...prevState,
      content: list,
    }));
  };

  const handleAddClick = (type) => {
    setInputList([...inputList, { type, value: "" }]);
  };

  return (
    <div>
      <Navbar />
      <Toast />
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container>
          <Grid item mt={2} xs={12}>
            <Paper square elevation={2} sx={{ bgcolor: "#F2F2F2", marginX:'10%'  }}>
              <Grid container padding={2}>
                <Grid item padding={1} xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="title"
                    value={postData.title}
                    onChange={handleChange}
                    label="Title"
                    variant="standard"
                  />
                </Grid>
                <Grid item padding={1} xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="shortDesc"
                    value={postData.shortDesc}
                    onChange={handleChange}
                    label="Short Description"
                    variant="standard"
                  />
                </Grid>
                <Grid item padding={1} xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    select
                    name="type"
                    value={postData.type}
                    onChange={handleChange}
                    label="Roadmap Type"
                    variant="standard"
                  >
                    {roadMapTypes.map((types, index) => (
                      <MenuItem key={index} value={types}>
                        {types}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item padding={1} xs={12} md={6}>
                  <TextField
                    required
                    fullWidth
                    name="tags"
                    value={postData.tags}
                    onChange={handleChange}
                    label="Tags"
                    variant="standard"
                  />
                </Grid>

                <Grid container mt={2} justifyContent="center">
                  <Typography variant="h6">Thumbnail</Typography>
                  <ImageComp
                    imageChange={handleImageChange}
                    value={postData.thumbnail}
                    normal
                    height={200}
                    width={200}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid direction="column" container alignItems="center">
            {inputList.map((input, idx) => {
              return (
                <Grid item key={idx} >
                  {input.type === "TextField" ? (
                    <TextComp
                      inputChange={handleInputChange}
                      value={input.value}
                      index={idx}
                      deleteClick={handleRemoveClick}
                    />
                  ) : input.type === "Image" ? (
                    <ImageComp
                      imageChange={handleContentImageChange}
                      value={input.value}
                      index={idx}
                      deleteClick={handleRemoveClick}
                      height={300}
                      width={300}
                    />
                  ) : input.type === "Link" ? (
                    <LinkComp
                      inputChange={handleInputChange}
                      value={input.value}
                      index={idx}
                      deleteClick={handleRemoveClick}
                    />
                  ) : null}
                </Grid>
              );
            })}
          </Grid>
          <Grid
            direction="column"
            container
            spacing={1}
            marginTop={5}
            alignItems="center"
          >
            <AddField handleAddClick={handleAddClick} />
          </Grid>

          <Grid
            direction="column"
            container
            spacing={1}
            paddingTop={5}
            alignItems="center"
          >
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreatePost;
