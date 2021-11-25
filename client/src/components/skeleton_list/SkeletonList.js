import React from "react";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import SkeletonStyles from "./SkeletonStyles";

function SkeletonList() {
  const classes = SkeletonStyles();
  const darkTheme = useSelector((state) => state.theme);

  return (
    <div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: darkTheme ? "#1e2139" : "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: darkTheme ? "#1e2139" : "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: darkTheme ? "#1e2139" : "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: darkTheme ? "#1e2139" : "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: darkTheme ? "#1e2139" : "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: darkTheme ? "#1e2139" : "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: darkTheme ? "#1e2139" : "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: darkTheme ? "#1e2139" : "grey.200" }}
        />
      </div>
    </div>
  );
}

export default SkeletonList;
