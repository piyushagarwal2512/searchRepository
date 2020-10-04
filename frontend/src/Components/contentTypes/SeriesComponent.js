import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import {clearAction} from "../../store/Store/actions"
import { bindActionCreators } from "redux";
 import * as _ from "lodash";
 import actionTypes from "../../store/Store/actions"
 import {Card} from "../../Common/index"
 import {withRouter} from "react-router-dom"

 class SeriesComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             seriesData:[],
             seriesDataCount:0
        }
    }
    

    componentDidMount()
    {
         
    }

    componentDidUpdate(prevProps,prevState)
    {
        if(!_.isEqual(prevProps.componentData,this.props.componentData))
        {
            this.setState({seriesData:this.props.componentData,seriesDataCount:this.props.componentDataCount})
        }
    }
    componentWillUnmount()
    {
        this.props.clearDispatchAction(actionTypes.FETCH_SERIES)
    }

    cardClickEvent=(event)=>
    {
               let imdbId=event.target.getAttribute('attrid');
              this.props.history.push(`/series/${imdbId}`)
    }

    render() {
        return (
            <div className="main-card-div">
                {this.state.seriesData.map((ele)=>{
                    return <Card key={ele.imdbID} data={ele} clickHandler={this.cardClickEvent}/>
                })}
            </div>
        )
    }
}

function mapStateToProps(state){
      return {
          componentData:state.seriesData,
          componentDataCount:state.dataCount,
          hasError:state.hasError
      }
    
}

function mapActionToProps(dispatch){

    return bindActionCreators(
        {
          clearDispatchAction: clearAction,
        },
        dispatch
      );
}

export default withRouter(connect(mapStateToProps,mapActionToProps)(SeriesComponent))
