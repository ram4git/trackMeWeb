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
    marginLeft: '5%'
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    width: '120%',
    marginLeft : '2%'
  },
  title: {
    color: '#de0c2f'
  },
  titleBar: {
      color :'#de0c2f',
      height : '30px',
      marginLeft : '10px'
  },
  image : {
    borderRadius : '100px',
    padding : '30px'
  }
});

class SingleLineGridList extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
  const { classes, urls } = this.props;

  let imagesArray = [];
  urls.map((url)=> {
    imagesArray.push(
    <GridListTile style={{height : '240px'}}>
      <img src={url.screenShot} className={classes.image} />
      <GridListTileBar style={{backgroundColor : 'white', marginLeft : '-10px'}}
        title={url.updatedBy + ' @ ' + url.updatedAt}
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
      />
    </GridListTile>
  )
  })

  return (
    <div className={classes.root}>
    <GridList className={classes.gridList} cols={6}>
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
