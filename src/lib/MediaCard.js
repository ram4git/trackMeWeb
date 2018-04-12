import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import GridList, { GridListTile } from 'material-ui/GridList';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

function SimpleMediaCard(props) {
  const { classes, text } = props;
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {text.title}
          </Typography>
          <Typography gutterBottom variant="headline" component="h2">
            {text.number}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard)
