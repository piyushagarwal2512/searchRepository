 import axios from "axios"
 
 const actionTypes={

FETCH_ALL:"FETCH_ALL",
FETCH_MOVIE:"FETCH_MOVIE",
FETCH_SERIES:"FETCH_SERIES",
FETCH_SEASONS:"FETCH_SEASONS",
FETCH_EPISODE:"FETCH_EPISODE",
FETCH_SINGLE_EPISODE:"FETCH_SINGLE_EPISODE",
FETCH_SINGLE_MOVIE:"FETCH_SINGLE_MOVIE",

}


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

export function getEpisodes(imdbId,season)
{

return (dispatch)=>{

        axios.get(`http://www.omdbapi.com/?apikey=d2d68894&i=${imdbId}&type=series&season=${season}`).then((data)=>{

        dispatch({type:actionTypes.FETCH_EPISODE,payload:data && data.data })
        }).catch((e)=>{
            dispatch({type:actionTypes.FETCH_EPISODE,payload:e})
        })
}


}

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


export function clearAction(actionType)
{
    console.log("hi")
    return {
        type:actionType,
        payload:""
    }
}

export default actionTypes