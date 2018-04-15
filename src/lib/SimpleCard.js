import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

const styles = {
  card: {
    minWidth: 100,
    display: 'flex',
    flexDirection: 'row'
  },
  content : {
    flex:0.8
  },
  actions: {
    flex:0.2
  },
  title: {
    marginBottom: 10,
    fontSize: 50,
  },
  pos: {
    marginBottom: 12,
  },
};



function SimpleCard(props) {
  const { classes, text, onButtonClickPath } = props;
  const MyLink = props => <Link to={`/${onButtonClickPath}/${text.id}`}
  {...props} />


  return (
    <div>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} color="textSecondary">
            {text.id}
          </Typography>
          <Typography variant="headline" component="h4">
            {text.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {text.headline}
          </Typography>
          <Typography component="p">
            {text.detail}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button variant="raised" color="secondary" size="small"
                component={MyLink}>VIEW MORE</Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
