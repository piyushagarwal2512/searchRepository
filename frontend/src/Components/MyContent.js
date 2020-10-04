import React, { Component } from 'react'
import {connect} from "react-redux"
import {Card} from "../Common/index"

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
                <div style={{display:"flex",flexWrap:"wrap",margin:"10 10 10 10",marginLeft:"5%",marginRight:"5%"}}>
                    {
                        data.map((ele)=><Card key ={ele.imdbID} data={ele} componentType={"mycontent"}/>)
                    }
                </div>
            )
        
}
export default (MyContent)
