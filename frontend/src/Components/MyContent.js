import React, { Component } from 'react'
import {connect} from "react-redux"
import {Card} from "../Common/index"
import NoDataComponent from "../Common/NoDataComponent"

function MyContent () {

    let data = window.localStorage.getItem("myContent")
    if(data)
    {
        data=JSON.parse(data);
    }
    else
    {
        data=[]
    }
            return (
                <div className="main-card-div">
                    {
                        (!data || data.length===0)?<NoDataComponent/>:
                        data.map((ele)=><Card key ={ele.imdbID} data={ele} componentType={"mycontent"}/>)
                    }
                </div>
            )
        
}
export default (MyContent)
