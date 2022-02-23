//react imports
import { TextField, MenuItem, Grid, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

//external imports
import TextComp from "./TextComp";
import ImageComp from "./ImageComp";
import LinkComp from "./LinkComp";
import AddField from "./AddField";
import { createPost } from "../../../actions/posts";

const CreatePost = () => {
  //declarations
  const roadMapTypes = ["Completed", "In Progress", "Suggestion"];
  const initialState = { title: "", type: "", tags: "", thumbnail:"", shortDesc:"", content: [] };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //hooks
  const [inputList, setInputList] = useState([]);
  const [postData, setPostData] = useState(initialState);
  useEffect(() => {
    if (!localStorage.getItem("profile")) {
      navigate("/auth");
    }
    console.log("PostData:",postData);
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

  const handleImageChange = (image) =>{
    setPostData((prevState) => ({
      ...prevState,
      thumbnail: image,
    }));    
  };

  const handleSubmit = (e) => {
    console.log("In submit");
    e.preventDefault();
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
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} padding={2}>
          <Grid item xs={3}>
            <ImageComp
              imageChange={handleImageChange}
              value={postData.thumbnail}
              normal
            />
            <TextField
              fullWidth
              name="title"
              value={postData.title}
              onChange={handleChange}
              label="Title"
              variant="standard"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              name="thumbnail"
              value={postData.title}
              onChange={handleChange}
              label="Short Desc"
              variant="standard"
            />
          </Grid>

          <Grid item xs={3}>
            <TextField
              fullWidth
              id="outlined-select-currency"
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

          <Grid item xs={3}>
            <TextField
              fullWidth
              name="tags"
              value={postData.tags}
              onChange={handleChange}
              label="Tags"
              variant="standard"
            />
          </Grid>

          <Grid direction="column" container alignItems="center">
            {inputList.map((input, idx) => {
              return (
                <Grid item key={idx}>
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
            paddingTop={2}
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
      {/* </Box>
      </Grid> */}
    </div>
  );
};

export default CreatePost;
