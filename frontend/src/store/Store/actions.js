
import axios from "axios"
 
 export const actionTypes={

        FETCH_ALL:"FETCH_ALL",
        FETCH_MOVIE:"FETCH_MOVIE",
        FETCH_SERIES:"FETCH_SERIES",
        FETCH_SEASONS:"FETCH_SEASONS",
        FETCH_EPISODE:"FETCH_EPISODE",
        FETCH_SINGLE_DATA:"FETCH_SINGLE_DATA",

        ADD_MY_CONTENT:"ADD_MY_CONTENT",
        DELETE_MY_CONTENT:"DELETE_MY_CONTENT"

}

//get data
export function getData(searchData)
{

return (dispatch)=>{

        axios.get(`http://www.omdbapi.com/?apikey=d2d68894&s=${searchData}`).then((data)=>{

        dispatch({type:actionTypes.FETCH_ALL,payload:data.data})
        }).catch((e)=>{
            dispatch({type:actionTypes.FETCH_ALL,payload:e})
        })
}


}

//get search data by content type
export function getDataByType(type,searchText)
{

return (dispatch)=>{

        axios.get(`http://www.omdbapi.com/?apikey=d2d68894&s=${searchText}&type=${type}`).then((data)=>{

        dispatch({type:actionTypes.FETCH_ALL,payload:data.data})
        }).catch((e)=>{
            dispatch({type:actionTypes.FETCH_ALL,payload:e})
        })
}


}

//get episodes data
export function getEpisodes(imdbId,season,imagePath)
{

return (dispatch)=>{

        axios.get(`http://www.omdbapi.com/?apikey=d2d68894&i=${imdbId}&type=series&season=${season}`).then((data)=>{

        var promise=[]
        var episodes=data.data['Episodes']
        if(episodes && episodes.length)
        {
           for(var i=0;i<episodes.length>0;i++)
           {
               promise.push(axios.get(`http://www.omdbapi.com/?apikey=d2d68894&i=${episodes[i].imdbID}`))
           }

           Promise.all(promise).then((allData)=>{
              for(var j=0;j<allData.length;j++)
              {
                  let index=episodes.findIndex((episode)=>episode.imdbID===allData[j].data.imdbID);
                  episodes[index].Poster=allData[j].data.Poster
              }
              dispatch({type:actionTypes.FETCH_EPISODE,payload:data && data.data })
           }).catch((e)=>{
            dispatch({type:actionTypes.FETCH_EPISODE,payload:e})
           })
        }

        }).catch((e)=>{
            dispatch({type:actionTypes.FETCH_EPISODE,payload:e})
        })
}

}

//get seasons data
export function getSeasons(imdbId)
{
   return (dispatch)=>{

        axios.get(`http://www.omdbapi.com/?apikey=d2d68894&i=${imdbId}&type=series`).then((data)=>{

        dispatch({type:actionTypes.FETCH_SEASONS,payload:data && data.data })
        }).catch((e)=>{
            dispatch({type:actionTypes.FETCH_SEASONS,payload:e})
        })
}

}

//get selected content info 
export function getSingleContentData(imdbId)
{

   return (dispatch)=>{
        axios.get(`http://www.omdbapi.com/?apikey=d2d68894&i=${imdbId}`).then((data)=>{

        dispatch({type:actionTypes.FETCH_SINGLE_DATA,payload:data && data.data })
        }).catch((e)=>{
            dispatch({type:actionTypes.FETCH_SINGLE_DATA,payload:e})
        })
}

}

//add to content action
export function addToContent(data)
{

return (dispatch)=>{

    dispatch({type:actionTypes.ADD_MY_CONTENT,payload:data})
}

}

//delete from content action
export function deleteFromContent(data)
{

return (dispatch)=>{

    dispatch({type:actionTypes.DELETE_MY_CONTENT,payload:data})
}

}

//clear dispatch
export function clearAction(actionType)
{
    return {
        type:actionType,
        payload:""
    }
}

export default actionTypes