import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginLeft: '50px'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    width: '120%'
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});

class SingleLineGridList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
  const { classes, urls } = this.props;
  console.log(urls)

  let imagesArray = [];
  urls.map((url)=> {
    imagesArray.push(
    <GridListTile>
      <img src={url} />
      <GridListTileBar
        title='Rice'
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
        actionIcon={
          <IconButton>
            <StarBorderIcon className={classes.title} />
          </IconButton>
        }
      />
    </GridListTile>
  )
  })

  return (
    <div className={classes.root}>
    <GridList className={classes.gridList} cols={4}>
    {imagesArray}
    </GridList>
    </div>
  );
}
}

SingleLineGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SingleLineGridList);
