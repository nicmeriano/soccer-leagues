import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    minHeight: 445
  },
  media: {
    height: 200
  }
});

export default function Article({ article }) {
  console.log({ article });
  const classes = useStyles();
  // remove all html tags
  const title = article.title.replace(/(<([^>]+)>)/g, "");
  const abstract =
    article.description
      .split(" ")
      .slice(0, 15)
      .join(" ")
      .replace(/(<([^>]+)>)/g, "") + "...";

  return (
    <a href={article.url} target="_blank" rel="noopener noreferrer">
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={article.image.url}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              dangerouslySetInnerHTML={{ __html: abstract }}
            />
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
  );
}
