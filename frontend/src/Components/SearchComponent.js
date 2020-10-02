import React, { Component } from 'react'
import {Select,TextField}from '@material-ui/core';
import {searchDropdown} from "../Common/dropDowns";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { bindActionCreators } from "redux";
import {connect} from "react-redux"
import {clearAction,getData} from "../store/Store/actions"

class SearchComponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             filterValue:"all",
             placeholder:"Movies,Series and Episodes",
             searchValue:""
        }
    }

    handleDropdownChange = (event)=>{
             // console.log(event.target.value)
             let placeholder="";
             if(event.target.value==="all")
             {
                placeholder="Movies,Series and Episodes"
             }
             else if(event.target.value==="series")
             {
                placeholder="Series"
             }
             else if(event.target.value==="episode")
             {
                placeholder="Episodes"
             }
             else{
                placeholder="Movies"
             }
              this.setState({filterValue:event.target.value,placeholder})

    }

    searchText=()=>{

        if(this.state.searchValue){
            this.props.fetchDataAction(this.state.searchValue)
        }
        else
        {
            alert("Please Enter a valid search")
        }
       
    }
    searchTextChange=(event)=>{
        this.setState({searchValue:event.target.value})
    }
    
    render() {
        const {filterValue,placeholder,searchValue}=this.state
        return (
            <div>
                <Select
                    native
                    value={filterValue}
                    onChange={this.handleDropdownChange}
                    variant="outlined"
                >
                    {
                        searchDropdown.map((obj,index)=><option key = {index} value ={obj.value}>{obj.text}</option>)
                    }
                </Select>
                <TextField id="outlined-basic" label="Search" 
                placeholder={placeholder}
                variant="outlined" style={{width:"60%"}}
                value={searchValue}
                onChange={this.searchTextChange}
                InputProps={{
                    endAdornment: (
                      <InputAdornment>
                        <IconButton onClick={this.searchText}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                    }}
                />

            </div>
        )
    }
}

const mapActionToProps=(dispatch)=>{

    return bindActionCreators(
        {
          clearDispatchAction: clearAction,
          fetchDataAction:getData
        },
        dispatch
      );
}

export default connect(null,mapActionToProps)(SearchComponent)
