import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import {clearAction,getSeasons} from "../../store/Store/actions"
import { bindActionCreators } from "redux";
 import * as _ from "lodash";
 import actionTypes from "../../store/Store/actions"
 import {Card} from "../../Common/index"
 import {withRouter} from "react-router-dom"
import LoadingComponent from '../../Common/LoadingComponent';
import NoDataComponent from '../../Common/NoDataComponent';

 class SeasonComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             seasonData:[],
             seasonDataCount:0,
             imagePath:""
        }
    }
    

    componentDidMount()
    {
        let imdbId=this.props.match.params.imdbId;
        this.props.getData(imdbId);
         
    }

    componentDidUpdate(prevProps,prevState)
    {
        if(!_.isEqual(prevProps.componentData,this.props.componentData))
        {
            this.setState({seasonData:this.props.componentData,seasonDataCount:this.props.componentDataCount,imagePath:this.props.componentData &&this.props.componentData.length && this.props.componentData[0].Poster })
        }
        if(prevProps.match.params.imdbId!==this.props.match.params.imdbId)
        {
            this.props.getData(this.props.match.params.imdbId);
        }
    }
    componentWillUnmount()
    {
        this.props.clearDispatchAction(actionTypes.FETCH_SEASONS)
    }

    cardClickEvent=(event)=>
    {
               let imdbId=event.target.getAttribute('attrid');
               let seasonId=event.target.getAttribute('seasonid');
              this.props.history.push({pathname:`/series/episodes/${imdbId}/${seasonId}`,state:{imagePath:this.state.imagePath}})

    }

    render() {
        return (
            <div className="main-card-div">
                {this.props.hasError?<NoDataComponent/>:(!this.state.seasonData || this.state.seasonData.length===0)?<LoadingComponent/>:this.state.seasonData.map((ele,index)=>{
                    return <Card key={ele.imdbID + index} data={ele} seasonid={index+1} clickHandler={this.cardClickEvent}/>
                })}
            </div>
        )
    }
}

function mapStateToProps(state){

      return {
          componentData:state.seasonsData,
          componentDataCount:state.dataCount,
          hasError:state.hasError
      }
    
}

function mapActionToProps(dispatch){

    return bindActionCreators(
        {
          clearDispatchAction: clearAction,
          getData:getSeasons
        },
        dispatch
      );
}

export default withRouter(connect(mapStateToProps,mapActionToProps)(SeasonComponent))
