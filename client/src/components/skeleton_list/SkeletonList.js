import React from "react";
import { Skeleton } from "@mui/material";
import SkeletonStyles from "./SkeletonStyles";

function SkeletonList() {
  const classes = SkeletonStyles();
  return (
    <div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: "grey.200" }}
        />
      </div>
      <div className={classes.skeleton}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          height={85}
          sx={{ bgcolor: "grey.200" }}
        />
      </div>
    </div>
  );
}

export default SkeletonList;
