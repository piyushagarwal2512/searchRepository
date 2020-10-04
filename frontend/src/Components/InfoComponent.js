import React from "react";

import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {getSingleContentData,actionTypes,clearAction} from "../store/Store/actions"
import {isEqual} from "lodash"
import {withRouter} from "react-router-dom"
import { Typography } from "@material-ui/core";


class InfoComponent extends React.Component {

constructor(props) {
  super(props)

  this.state = {
     data:[]
  }
}

componentDidMount(){

  let imdbID=this.props.match.params.imdbID
     this.props.getData(imdbID);
}

componentDidUpdate(prevProps,prevState){

  if(!isEqual(prevProps.data,this.props.data))
  {
    this.setState({data:this.props.data})
  }


  if(prevProps.match.params.imdbID!=this.props.match.params.imdbID)
  {

    this.props.getData(this.props.match.params.imdbID);}
  
}

componentWillUnmount(){
  this.props.clearDispatchAction(actionTypes.FETCH_SINGLE_DATA)
}


  render() {
    const {data} = this.state
    return (
     data && Object.keys(data).length >0 && <div style={{margin:"3% 3% 3% 3%",border:"1px solid black"}}>
       <div style={{backgroundImage:data.Poster,width:"200px",height:"230px",marginLeft:"10%"}}>
                <img src={data.Poster} width="100%" height="100%"></img>
       </div>
       <div style={{textAlign:"left",marginLeft:"2%"}}>
        <Typography>Title: {data.Title}</Typography>
        <Typography>Year: {data.Year}</Typography>
        <Typography>Rated: {data.Rated}</Typography>
        <Typography>Released: {data.Released}</Typography>
        <Typography>Runtime: {data.Runtime}</Typography>
        <Typography>Genre: {data.Genre}</Typography>
        <Typography>Director: {data.Director}</Typography>
        <Typography>Writer: {data.Writer}</Typography>
        <Typography>Actors: {data.Actors}</Typography>
        <Typography>Plot: {data.Plot}</Typography>
        <Typography>Language: {data.Language}</Typography>
        <Typography>Country: {data.Country}</Typography>
        <Typography>Awards: {data.Awards}</Typography>
        <Typography>ImdbRating: {data.imdbRating}</Typography>
        <Typography>ImdbVotes: {data.imdbVotes}</Typography>

    </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return{
    data : state.singleContentData
  }
}

const mapActionToProps=(dispatch)=>{
  return bindActionCreators({

    getData:getSingleContentData,
    clearDispatchAction:clearAction

  },dispatch)
}

export default withRouter(connect(mapStateToProps,mapActionToProps)(InfoComponent))
