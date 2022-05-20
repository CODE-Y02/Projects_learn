import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourites extends Component {
    constructor(){
        super();
        this.state={
            genres:[],
            crrgen: "All Gernes",
            movies:[],
            crrText: '',
            limit:5,
            crrpg:1,

        }
    }

    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy', 80:'Crime',99:'Documentary',
        18:'Drama',10751:'Family',14:'Fantasy',36:'History', 27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};


        let data = JSON.parse(localStorage.getItem("movies-app") ||"[]")
        let temp =[];
        data.forEach((movieObj)=>{
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.unshift('All Gernes')

        this.setState({
            genres:[...temp],
            movies:[...data],
        })
    }

    handleGenreChange=(genre)=>{
        this.setState({
            crrgen:genre,
        })
    }

    sortPopularityDes=()=>{
        let temp=this.state.movies;
        temp.sort((objA,objB)=> objA.popularity-objB.popularity);
        this.setState({
            movies:[...temp]
        })
    }
    sortPopularityAsc=()=>{
        let temp=this.state.movies;
        temp.sort((objA,objB)=> objB.popularity-objA.popularity);
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingDes=()=>{
        let temp=this.state.movies;
        temp.sort((objA,objB)=> objA.vote_average-objB.vote_average);
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingAsc=()=>{
        let temp=this.state.movies;
        temp.sort((objA,objB)=> objB.vote_average-objA.vote_average);
        this.setState({
            movies:[...temp]
        })
    }
   handlePageChange=(page)=>{
       this.setState({
           crrpg:page
       })
    }
   handleDelete=(id)=>{
        let newarr=[]
        newarr= this.state.movies.filter((movieObj)=>movieObj.id!==id);
        this.setState({
            movies:[...newarr],

        })
        localStorage.setItem("movies-app",JSON.stringify(newarr))
   }

  render() {
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy', 80:'Crime',99:'Documentary',
    18:'Drama',10751:'Family',14:'Fantasy',36:'History', 27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};

    let filterarr=[];

    if(this.state.crrText==''){
        filterarr=this.state.movies;
    }else{
        filterarr=this.state.movies.filter((movieObj)=>{
            let title= movieObj.original_title.toLowerCase();
            return title.includes(this.state.crrText.toLowerCase())
        })
    }

    // if(this.state.crrgen=="All Gernes"){
    //     filterarr=this.state.movies;
    // }
    if(this.state.crrgen!="All Gernes"){
        filterarr=this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.crrgen)
    }

    let pages= Math.ceil(filterarr.length/this.state.limit);
    let pagearr=[];
    for(let i=1;i<=pages;i++){
        pagearr.push(i);
    }
    let si= (this.state.crrpg -1)*this.state.limit;
    let ei= si+ this.state.limit;
    filterarr =filterarr.slice(si,ei);

    return (
      <div>
         <div className="main">
             <div className="row">
                 <div className="col-lg-3 col-sm-12">
                        <ul className="list-group favourites-generes">
                            {
                                this.state.genres.map((genre)=>(
                                    this.state.crrgen == genre ? 
                                    <li className="list-group-item" 
                                        style={{background:'#ff76d8', color:'black', fontWeight:'bold'}}
                                    >{genre}</li>
                                   :
                                    <li className="list-group-item" 
                                        style={{background:'black', color:'#ff76d8'}} onClick={()=>this.handleGenreChange(genre)}
                                    >{genre}</li>
                                   
                                   
                                ))                          
                            }
                            
                            {/* <li className="list-group-item">Action</li>
                            <li className="list-group-item">Action</li>
                            <li className="list-group-item">Action</li>
                            <li className="list-group-item">Action</li> */}
                            
                        </ul>
                 </div>
                 <div className="col-lg-9 favourites-table col-sm-12">
                     <div className="row">
                        
                         <input type="text" className="input-group-text col"
                         value={this.state.crrText} onChange={(e)=>this.setState({crrText:e.target.value})}
                         placeholder='Search' />
                         <input type="number" min="0" className="input-group-text col"
                             value={this.state.limit}
                             onChange={(e)=>this.setState({limit:e.target.value})}
                         placeholder='Rows Count'/>   
                     </div>
                     <div className="row">
                            <table className="table">
                                <thead>
                                    <tr>
                                    
                                        <th scope="col">Title</th>
                                        <th scope="col">Genre</th>
                                        <th scope="col">
                                            <i class="fa-solid fa-sort-up" onClick={this.sortPopularityDes}/>
                                                Popularity
                                            <i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsc}/>
                                        </th>
                                        <th scope="col">
                                            <i class="fa-solid fa-sort-up" onClick={this.sortRatingDes}/>
                                                Rating
                                            <i class="fa-solid fa-sort-down"  onClick={this.sortRatingAsc}/>
                                        </th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       filterarr.map((movieObj)=>(
                                            <tr>
                                    
                                                <td>
                                                    <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{width:'8rem'}} />
                                                    {movieObj.original_title}</td>
                                                <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                <td>{movieObj.popularity}</td>
                                                <td>{movieObj.vote_average}</td>
                                                <td>
                                                    <button type="button" onClick={()=>this.handleDelete(movieObj.id)}
                                                     className="btn btn-danger">
                                                            Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    
                                    
                                </tbody>
                            </table>
                     </div>
                     <div className="row">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                {
                                    pagearr.map((page)=>
                                    <li className="page-item"><a className="page-link" onClick={()=>this.handlePageChange(page)}>
                                        {page}
                                        </a></li>
                                    )
                                }
                                
                                
                            </ul>
                        </nav>
                     </div>

                 </div>
             </div>
         </div>
      </div>
    )
  }
}
