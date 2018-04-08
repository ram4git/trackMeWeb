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
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
  const bull = <span className={classes.bullet}>•</span>;

  const MyLink = props => <Link to={`/${onButtonClickPath}/${text.id}`} {...props} />


  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {text.title}
          </Typography>
          <Typography variant="headline" component="h2">
            {text.id}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {text.headline}
          </Typography>
          <Typography component="p">
            Indents = {text.detail}
          </Typography>
        </CardContent>
        <CardActions>
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
