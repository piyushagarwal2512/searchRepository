import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/core/styles';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {addToContent,deleteFromContent,actionTypes,clearAction} from "../store/Store/actions"
import {withRouter} from "react-router-dom"
import {Tooltip} from "@material-ui/core"

const useStyles = (theme) => ({
  root: {
    maxWidth: 300,
    minWidth: 300,
    margin:10
  },
  media: {
   height:400,
   // paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

 class CardElement extends React.Component {


  constructor(props) {
    super(props)
  
    this.state = {
      
    }
  }
  

actionClick=(event,data)=>{

if(event.target.tagName!=="DIV")
{
  let element=event.target;
  if(element && element.tagName!=="BUTTON")
  {
    element=element.closest(`button`)
  }

  if(element.getAttribute('aria-label')==="add to favorites")
  {
    console.log("ji")
    let contentData=window.localStorage.getItem("myContent");
    if(contentData)
    {
      contentData=JSON.parse(contentData);
      let index=contentData.findIndex((ele)=>ele.Title===data.Title);
      if(index<0)
      {
        contentData.push(data)
        window.localStorage.setItem("myContent",JSON.stringify(contentData));
      }
    
    }
    else{
      let d=[]
      d.push(data);
      window.localStorage.setItem("myContent",JSON.stringify(d));
    }
   // this.props.addContentAction(data);
  }
  else if(element.getAttribute('aria-label')==="delete item")
  {
    let contentData=window.localStorage.getItem("myContent");
    if(contentData)
    {
      contentData=JSON.parse(contentData);
      let index=contentData.findIndex((ele)=>ele.Title===data.Title);
      contentData.splice(index,1);
      if(contentData.length===0)
      {
        window.localStorage.removeItem("myContent")
      }
      else{
      window.localStorage.setItem("myContent",JSON.stringify(contentData));
      }

      this.props.history.push(`/me/content`)
    }

  }else{
          this.props.history.push(`/info/${data.imdbID}`)
  }

}
  
}

handleClose=()=>{
  this.setState({open:false})
  this.props.clearDispatchAction(actionTypes.FETCH_SINGLE_DATA)
}


render(){
  const {classes}=this.props
  return (
    <div>
   
    <Card className={classes.root} attrid={this.props.data.imdbID} seasonid={this.props.seasonid}>
      <CardHeader
        avatar={
          <Avatar aria-label="contentType" className={classes.avatar}  attrid={this.props.data.imdbID} seasonid={this.props.seasonid}>
            {this.props.data.Type==="movie" ?"M":(this.props.data.Type==="series" ?"S":(this.props.data.Type==="episode" ?"E":""))}
          </Avatar>
        }

        title={this.props.data.Title}
        subheader={this.props.data.Year}
        attrid={this.props.data.imdbID}
        seasonid={this.props.seasonid}
      />
      <CardMedia
        className={classes.media}
        image={this.props.data.Poster}
        title={this.props.data.Title}
        attrid={this.props.data.imdbID}
        seasonid={this.props.seasonid}
        onClick={(this.props.data.Type==="series")?(event)=>this.props.clickHandler(event):null}
      />

      <CardActions disableSpacing attrid={this.props.data.imdbID} seasonid={this.props.seasonid} onClick={(event)=>this.actionClick(event,this.props.data)}>
       {!this.props.componentType && <Tooltip title="Add To Favorites"><IconButton aria-label="add to favorites"  attrid={this.props.data.imdbID} seasonid={this.props.seasonid} onmo >
          <FavoriteIcon />
        </IconButton>
        </Tooltip>
       }
       <Tooltip title="View Info">
        <IconButton aria-label="view info"  attrid={this.props.data.imdbID} seasonid={this.props.seasonid} >
          <InfoIcon />
        </IconButton>
        </Tooltip>
        {this.props.componentType && this.props.componentType==="mycontent" && <Tooltip title="Delete Item"><IconButton aria-label="delete item"  attrid={this.props.data.imdbID} seasonid={this.props.seasonid } >
          <DeleteIcon />
        </IconButton>
        </Tooltip>
          }
      </CardActions>
    
    </Card>
    </div>
  );
    }
}

const mapActionToProps=(dispatch)=>{
   return bindActionCreators(
    {
      addContentAction: addToContent,
      deleteContentAction:deleteFromContent,
      clearDispatchAction:clearAction
    },
    dispatch
  );
}

export default withRouter(withStyles(useStyles)(connect(null,mapActionToProps)(CardElement)))
