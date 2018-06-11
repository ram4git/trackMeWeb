import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';

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
    color: '#de0c2f',
    whiteSpace : 'normal'
  },
  titleBar: {
      color :'#de0c2f',
      height : '30px',
      marginLeft : '10px'
  },
  image : {
    borderRadius : '100px',
    padding : '30px',
    height: '50%'
  }
});

class SingleLineGridList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomInImage : false
    }
  }

  showImage = image => event => {
    this.setState({
      zoomInImage : true,
      zoomInURL : image
    })
  }

  closeZoomInImage = () => {
    this.setState({
      zoomInImage : false
    })
  }


  render() {
  const { classes, urls } = this.props;
  const { zoomInURL, zoomInImage } = this.state;
  console.log(urls)

  if(zoomInImage)
   return  <Dialog
      open={this.state.zoomInImage}
      onClose={this.closeZoomInImage}>
      <img src={zoomInURL} style={{}}/>
    </Dialog>

  let imagesArray = [];
  urls.map((url, index)=> {
    imagesArray.push(

    <GridListTile style={{height : '360px', marginRight: '50px'}} key={index}>
      <img src={url.screenShot} className={classes.image} />
      <GridListTileBar style={{backgroundColor : 'white',marginBottom : '100px',paddingLeft : '30px'}}
        title={url.updatedBy + (url.updatedAt != null && url.updatedAt !='' ? ' @ ' + url.updatedAt :
                          '')}
        classes={{
          root: classes.titleBar,
          title: classes.title,
        }}
      />
      <div>
      <Button onClick={this.showImage(url.screenShot)} style={{marginTop : '-50px', float : 'right'}} >
      <ZoomInIcon/>
      </Button>
      </div>

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
