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
    flexDirection: 'row',

  },
  content : {
    flex:0.9
  },
  actions: {
    flex:0.1
  },
  title: {
    fontSize:'18px',
    color: 'black' ,
    width:'200px'
  },
  pos: {
    marginBottom: 12,
  },
};

const flexContainer = {
  display : 'flex',
  flexDirection : 'row',
  height: '80px'
}

class SimpleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shadow: 1 }
  }

  onMouseOver = () => this.setState({ shadow: 3 });

  onMouseOut = () => this.setState({ shadow: 1 });

  render() {
  const { classes, text, onButtonClickPath } = this.props;
  const MyLink = props => <Link to={`/${onButtonClickPath}/${text.id}`}
  {...props} />



  return (
    <div>
      <Card
      className={classes.card}
      onMouseHover={this.onMouseHover}
      onMouseOut={this.onMouseOut}
      zdepth={this.state.shadow}>
        <CardContent className={classes.content} style={flexContainer}>
          <Typography className={classes.title} color="textSecondary" >
            {text.id}
          </Typography>
          <Typography variant="headline" component="h4" style={{marginLeft:'25px', fontSize:'20px',
                    width:'200px'}}>
            {text.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary" style={{margin:'15px'}}>
            {text.headline}
          </Typography>
          <Typography component="p" style={{}}>
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
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
