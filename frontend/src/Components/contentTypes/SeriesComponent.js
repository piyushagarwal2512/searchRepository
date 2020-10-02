import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import {clearAction} from "../../store/Store/actions"
import { bindActionCreators } from "redux";
 import * as _ from "lodash";
 import actionTypes from "../../store/Store/actions"
 import {Card} from "../../Common/index"

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
        this.props.clearDispatchAction(actionTypes.FETCH_MOVIE)
    }

    render() {
        return (
            <div style={{display:"flex",flexWrap:"wrap",margin:"10 10 10 10",marginLeft:"5%",marginRight:"5%"}}>
                {this.state.seriesData.map((ele)=>{
                    return <Card Title={ele.Title} Year={ele.Year} Poster={ele.Poster} Type={ele.Type}/>
                })}
            </div>
        )
    }
}

function mapStateToProps(state){
      //console.log(state);
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

export default connect(mapStateToProps,mapActionToProps)(SeriesComponent)
