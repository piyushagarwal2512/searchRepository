import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import {clearAction,getDataByType} from "../store/Store/actions"
import { bindActionCreators } from "redux";
import * as _ from "lodash";
import {withRouter} from "react-router-dom"
import MovieComponent from './contentTypes/MovieComponent';
import SeriesComponent from './contentTypes/SeriesComponent';
import EpisodeComponent from './contentTypes/EpisodeComponent';

 class MainComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            contentType:""
        }
    }
    

    componentDidMount()
    {
         let contentType=this.props.match.params.type
         let searchText=this.props.match.params.searchText;
         this.props.getData(contentType,searchText)
         this.setState({contentType})
    }

    componentDidUpdate(prevProps,prevState)
    {
        if((prevProps.match.params.type!==this.props.match.params.type) || (prevProps.match.params.searchText!==this.props.match.params.searchText))
        {
            this.props.getData(this.props.match.params.type,this.props.match.params.searchText)
            this.setState({contentType:this.props.match.params.type})
        }
    }
    componentWillUnmount()
    {

    }

    render() {
        return (
            <div >
              { this.state.contentType==="movie"?<MovieComponent/>:this.state.contentType==="series"?<SeriesComponent/>:
               <EpisodeComponent/>
              }
            </div>
        )
    }
}

function mapActionToProps(dispatch){

    return bindActionCreators(
        {
          clearDispatchAction: clearAction,
          getData:getDataByType
        },
        dispatch
      );
}

export default withRouter(connect(null,mapActionToProps)(MainComponent))
