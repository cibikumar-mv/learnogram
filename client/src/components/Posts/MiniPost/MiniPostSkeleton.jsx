import React from 'react'
import {Card,CardHeader,Divider,CardActions,IconButton,Typography} from '@mui/material';
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CommentIcon from "@mui/icons-material/Comment";
import TelegramIcon from "@mui/icons-material/Telegram";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const MiniPostSkeleton = (props) => {
  return ( 
    <Card elevation={8}  sx={{ width: 330,borderRadius:5 }} key={props.idx}>
            <CardHeader
              avatar={
                <div className="avatar">
                  <Skeleton
                    circle
                    height="100%"
                    containerClassName="avatar-skeleton"
                  />
                </div>
              }
              title={<Skeleton width="100px" />}
              subheader={<Skeleton width="100px" />}
            />
            <Divider variant="string" />
            <Skeleton
              width="250px"
              height="150px"
              style={{ margin: "3%", padding: "3%", overflow: "hidden" }}
            />
            {
              <Skeleton
                width="250px"
                style={{ margin: "3%", padding: "3%", overflow: "hidden" }}
              />
            }
            <CardActions disableSpacing>
              <IconButton>
                <KeyboardDoubleArrowUpIcon />
              </IconButton>
              <IconButton>
                <KeyboardDoubleArrowDownIcon />
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {0}
              </Typography>
              <IconButton>
                <CommentIcon />
              </IconButton>
              <IconButton>
                <TelegramIcon />
              </IconButton>
            </CardActions>
          </Card>
  )
}

export default MiniPostSkeleton