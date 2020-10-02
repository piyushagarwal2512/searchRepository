import actionTypes from "./actions"


let initialState={


movieData:[],
seriesData:[],
seasonsData:[],
episodesData:[],
singleEpisodeData:null,
singleMovieData:null,
hasError:false,
dataCount:0
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
        case actionTypes.FETCH_SINGLE_MOVIE:
        return {
            ...state,
            singleMovieData:action.payload ?action.payload:{},
            dataCount:action.payload && action.payload['totalResults']?parseInt(action.payload['totalResults']):1,
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
        return {
            ...state,
            episodesData:action.payload && action.payload['Episodes']?action.payload['Episodes']:[],
            dataCount:action.payload && action.payload['totalResults']?parseInt(action.payload['totalResults']):0,
            hasError:action.payload && action.payload['Response'] && action.payload['Response'] === "False"
        }
        case actionTypes.FETCH_SINGLE_EPISODE:
        return {
            ...state,
            singleEpisodeData:action.payload ?action.payload:{},
            dataCount:action.payload && action.payload['totalResults']?parseInt(action.payload['totalResults']):1,
            hasError:action.payload && action.payload['Response'] && action.payload['Response'] === "False"

        }
         default:
            return state
    }
}

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

        seasonDta.push(obj)

    }
    
}



}

export default reducer


