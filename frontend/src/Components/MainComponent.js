import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import {clearAction} from "../store/Store/actions"
import { bindActionCreators } from "redux";
 import * as _ from "lodash";
 import actionTypes from "../store/Store/actions"
 import {Card} from "../Common/index"
 import {withRouter} from "react-router-dom"
import MovieComponent from './contentTypes/MovieComponent';
import SeriesComponent from './contentTypes/SeriesComponent';

 class MainComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            //  movieData:[],
            //  movieDataCount:0
        }
    }
    

    componentDidMount()
    {
         
    }

    componentDidUpdate(prevProps,prevState)
    {
        // if(!_.isEqual(prevProps.componentData,this.props.componentData))
        // {
        //     this.setState({movieData:this.props.componentData,movieDataCount:this.props.componentDataCount})
        // }
    }
    componentWillUnmount()
    {
        this.props.clearDispatchAction(actionTypes.FETCH_MOVIE)
    }

    render() {
        return (
            <div >
               <MovieComponent/>
               <SeriesComponent/>
            </div>
        )
    }
}

// function mapStateToProps(state){
//     //  console.log(state);
//       return {
//           componentData:state.movieData,
//           componentDataCount:state.dataCount,
//           hasError:state.hasError
//       }
    
// }

// function mapActionToProps(dispatch){

//     return bindActionCreators(
//         {
//           clearDispatchAction: clearAction,
//         },
//         dispatch
//       );
// }

export default withRouter((MainComponent))
