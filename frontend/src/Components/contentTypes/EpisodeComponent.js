import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import {clearAction,getEpisodes} from "../../store/Store/actions"
import { bindActionCreators } from "redux";
 import * as _ from "lodash";
 import actionTypes from "../../store/Store/actions"
 import {Card} from "../../Common/index"
 import {withRouter} from "react-router-dom"
import LoadingComponent from '../../Common/LoadingComponent';


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
        if(this.props.match.params.imdbId && this.props.match.params.seasonId){
            let imdbId=this.props.match.params.imdbId;
            let seasonId=this.props.match.params.seasonId;
            let imagePath=this.props.location.state.imagePath;
            this.props.getData(imdbId,seasonId,imagePath)  
        }
    }

    componentDidUpdate(prevProps,prevState)
    {
        if(!_.isEqual(prevProps.componentData,this.props.componentData))
        {
            this.setState({episodeData:this.props.componentData,episodeDataCount:this.props.componentDataCount})
        }
        if((this.props.match.params.imdbId!==this.props.match.params.imdbId)||(this.props.match.params.seasonId!==this.props.match.params.seasonId))
        {
            this.props.getData(this.props.match.params.imdbId,this.props.match.params.seasonId)
        }
    }
    componentWillUnmount()
    {
        this.props.clearDispatchAction(actionTypes.FETCH_EPISODE)
    }

    render() {
        return (
            <div style={{display:"flex",flexWrap:"wrap",margin:"3% 3% 3% 3%"}}>
                {
          (!this.state.episodeData || this.state.episodeData.length ===0)? <LoadingComponent/>:
                
                    this.state.episodeData.map((ele)=>{
                        return <Card key={ele.imdbID} data={ele}/>
                    })

                    } 

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
