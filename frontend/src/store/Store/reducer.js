import actionTypes, { deleteFromContent } from "./actions"

let initialState={

    movieData:[],
    seriesData:[],
    seasonsData:[],
    episodesData:[],
    singleContentData:[],
    hasError:false,
    dataCount:0,
    myContentData:[]
}




 const reducer=(state=initialState,action)=>{


    switch(action.type)
    {
        case actionTypes.FETCH_ALL:
            let movieDta=[],seriesDta=[],episodeDta=[]
           
            filterData(movieDta,seriesDta,episodeDta,action.payload)

        return {
            ...state,
            movieData:movieDta,
            seriesData:seriesDta,
            episodesData:episodeDta,
            dataCount:action.payload && action.payload['totalResults']?parseInt(action.payload['totalResults']):0,
            hasError:action.payload && action.payload['Response'] && action.payload['Response'] === "False"

        }
        case actionTypes.FETCH_MOVIE:
        return {
            ...state,
            movieData:action.payload && action.payload['Search']?action.payload['Search']:[],
            dataCount:action.payload && action.payload['totalResults']?parseInt(action.payload['totalResults']):0,
            hasError:action.payload && action.payload['Response'] && action.payload['Response'] === "False"
        }

        case actionTypes.FETCH_SERIES:
        return {
            ...state,
            seriesData:action.payload && action.payload['Search']?action.payload['Search']:[],
            dataCount:action.payload && action.payload['totalResults']?parseInt(action.payload['totalResults']):0,
            hasError:action.payload && action.payload['Response'] && action.payload['Response'] === "False"

        }
        case actionTypes.FETCH_SEASONS:
            let seasonDta=[]
              createSeasons(seasonDta,action.payload)
        return {
            ...state,
            seasonsData:seasonDta,
            dataCount:action.payload && action.payload['totalResults']?parseInt(action.payload['totalResults']):0,
            hasError:action.payload && action.payload['Response'] && action.payload['Response'] === "False"

        }
        case actionTypes.FETCH_EPISODE:
            modifyEpisodes(action.payload)
        return {
            ...state,
            episodesData:action.payload && action.payload['Episodes']?action.payload['Episodes']:[],
            dataCount:action.payload && action.payload['totalResults']?parseInt(action.payload['totalResults']):0,
            hasError:action.payload && action.payload['Response'] && action.payload['Response'] === "False"
        }
        case actionTypes.FETCH_SINGLE_DATA:
        return {
            ...state,
            singleContentData:action.payload ?action.payload:{},
            dataCount:action.payload && action.payload['totalResults']?parseInt(action.payload['totalResults']):1,
            hasError:action.payload && action.payload['Response'] && action.payload['Response'] === "False"

        }

        case actionTypes.ADD_MY_CONTENT:
            let contentData=[...state.myContentData]
            addContent(contentData,action.payload)
        return {
            ...state,
            myContentData:contentData,
        }
        case actionTypes.DELETE_MY_CONTENT:
            let cdata=[...state.myContentData]
            deleteContent(cdata,action.payload)
        return {
            ...state,
            myContentData:cdata,
        }
         default:
            return state
    }
}

//filter data
const filterData=(movieData,seriesData,episodeData,payload)=>{

    if(payload && payload['Search'] && payload['Search'].length)
    {

        payload['Search'].forEach(obj => {
            if(obj.Type==="movie")
            {
                movieData.push(obj)
            }
            else  if(obj.Type==="series")
            {
                seriesData.push(obj)
            }
            else  if(obj.Type==="episode")
            {
                episodeData.push(obj)
            }
            
        });

    }


}

//create season data
const createSeasons=(seasonDta,payload)=>{

if(payload['Response']==="True")
{
    let totalSeasons=parseInt(payload['totalSeasons']);

    for(var i=0;i<totalSeasons;i++)
    {
        let obj={}
        obj.Title=`${payload.Title} (Season ${i+1})`;
        obj.Type=payload.Type;
        obj.Year=payload.Year;
        obj.Poster=payload.Poster;
        obj.imdbID=payload.imdbID;

        seasonDta.push(obj)

    }
    
}

}


//modify episode content
const modifyEpisodes=(payload)=>{

    if(payload['Response']==="True")
    {
        let episodeData=payload["Episodes"];
    
        for(var i=0;i<episodeData.length;i++)
        {
            episodeData[i].Title=`${episodeData[i].Title} (Episode ${i+1})`;
            episodeData[i].Type="episode";
        }   
    }

}


//delete content
const deleteContent=(contentData,payload)=>
{
    let index=contentData.findIndex((ele)=>ele.Title===payload.Title);
    if(index>=0)
    {
       contentData.splice(index,1)
    }
}

//add content
const addContent=(contentData,payload)=>
{
    let index=contentData.findIndex((ele)=>ele.Title===payload.Title);
    if(index<0)
    {
       contentData.push(payload)
    }
}


export default reducer


