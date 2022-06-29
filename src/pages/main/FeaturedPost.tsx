import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IUser, { IUserForDisplay } from "../../types/User";
import User from "../../models/User";
import { observer } from "mobx-react-lite";

interface IFeaturedPostProp {
  // post: IUserForDisplay;
  post: IUser;
}

const FeaturedPost = observer((props: IFeaturedPostProp) => {
  const { post } = props;
  const stringfiedLastConnectedAt = post.lastConnectedAt
    ? new Date(post.lastConnectedAt).toDateString()
    : "";

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.email}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {stringfiedLastConnectedAt}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image={post.profileImage}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
});

export default FeaturedPost;
