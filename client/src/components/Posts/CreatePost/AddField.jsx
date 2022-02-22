//react imports
import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const AddField = (props) => {
  //declarations
  const settings = ["TextField", "Image", "Link"];

  //states
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  //functions
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (e) => {
    if(e.target.innerText)
      props.handleAddClick(e.target.innerText);
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Add Fields">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: "quaternary.main" }}>
            <AddCircleOutlineIcon
              // onClick={() => {
              //   props.handleAddClick("text");
              // }}
              sx={{ fontSize: 75 }}
            ></AddCircleOutlineIcon>
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        // sx={{ mt: "45px" }}
        // id="menu-appbar"
        anchorEl={anchorElUser}
        // anchorOrigin={{
        //   vertical: "top",
        //   horizontal: "right",
        // }}
        keepMounted
        // transformOrigin={{
        //   vertical: "top",
        //   horizontal: "right",
        // }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AddField;
