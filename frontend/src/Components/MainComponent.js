import React, { Component } from 'react'
import connect from "react-redux/es/connect/connect";
import {clearAction,getData} from "../store/Store/actions"
import { bindActionCreators } from "redux";
import * as _ from "lodash";
import {withRouter} from "react-router-dom"
import MovieComponent from './contentTypes/MovieComponent';
import SeriesComponent from './contentTypes/SeriesComponent';


 class MainComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            activePage:1
        }
    }
    

    componentDidMount()
    {
        let searchText= this.props.match.params.searchText;
        this.props.fetchDataAction(searchText)
    }

    componentDidUpdate(prevProps,prevState)
    {
        if(prevProps.match.params.searchText!==this.props.match.params.searchText)
        {
            this.props.fetchDataAction(this.props.match.params.searchText)
        }
    }
    componentWillUnmount()
    {

    }

    render() {


        return (
            <div>
               <MovieComponent/>
               <SeriesComponent/>
            </div>
        )
    }
}



function mapActionToProps(dispatch){

    return bindActionCreators(
        {
          clearDispatchAction: clearAction,
          fetchDataAction:getData
        },
        dispatch
      );
}

export default withRouter(connect(null,mapActionToProps)(MainComponent))
