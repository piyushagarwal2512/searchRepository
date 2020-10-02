import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import {clearAction,getEpisodes} from "../../store/Store/actions"
import { bindActionCreators } from "redux";
 import * as _ from "lodash";
 import actionTypes from "../../store/Store/actions"
 import {Card} from "../../Common/index"
 import {withRouter} from "react-router-dom"

 class EpisodeComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             episodeData:[],
             episodeDataCount:0
        }
    }
    

    componentDidMount()
    {
        let imdbId=this.props.match.params.imdbId;
        let season=this.props.match.params.season;
        this.props.getData(imdbId,season)  
    }

    componentDidUpdate(prevProps,prevState)
    {
        if(!_.isEqual(prevProps.componentData,this.props.componentData))
        {
            this.setState({episodeData:this.props.componentData,episodeDataCount:this.props.componentDataCount})
        }
    }
    componentWillUnmount()
    {
        this.props.clearDispatchAction(actionTypes.FETCH_EPISODE)
    }

    render() {
        return (
            <div style={{display:"flex",flexWrap:"wrap",margin:"10 10 10 10",marginLeft:"5%",marginRight:"5%"}}>
                {this.state.seasonData.map((ele)=>{
                    return <Card Title={ele.Title} Year={ele.Year} Poster={ele.Poster} Type={ele.Type}/>
                })}
            </div>
        )
    }
}

function mapStateToProps(state){
      //console.log(state);
      return {
          componentData:state.episodesData,
          componentDataCount:state.dataCount,
          hasError:state.hasError
      }
    
}

function mapActionToProps(dispatch){

    return bindActionCreators(
        {
          getData:getEpisodes,
          clearDispatchAction: clearAction,
        },
        dispatch
      );
}

export default withRouter(connect(mapStateToProps,mapActionToProps)(EpisodeComponent))
