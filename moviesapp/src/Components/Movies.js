// import { movies } from "./getMovies";
import React, { Component } from 'react'
import axios from 'axios';
export default class Movies extends Component {
    constructor(){
        super();
        this.state={
        hover:'',
        prr:[1],
        currPage:1,
        movies:[],
        favourites:[],
        }
    }
    async componentDidMount(){
        //side effects
        const res =await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=5bfc6ef22cdde776b26f381d3b452d6c&page=${this.state.currPage}`);
        let data = res.data;
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
        // console.log('mounting done');
    }
    changeMovies= async()=>{
        // console.log('change movies ');
        // console.log(this.state.currPage);
        
        const res =await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=5bfc6ef22cdde776b26f381d3b452d6c&page=${this.state.currPage}`);
        let data = res.data;
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
    }
    handleRight= ()=>{
        let temparr =[];
        for (let i = 1; i <= this.state.prr.length+1; i++){
            temparr.push(i);
           
        }
         this.setState({
            prr:[...temparr],
            currPage:this.state.currPage+1,
        }, this.changeMovies)
        
    }
    handleLeft=()=>{
        if(this.state.currPage!=1){
            this.setState({
                currPage:this.state.currPage-1,
                
            },this.changeMovies)
        }
    }
    handleCrrPg=(pgvalue)=>{
        if(pgvalue!=this.state.currPage){
            this.setState({
                currPage:pgvalue
            },this.changeMovies)
        }
    }
    handleFav=(movie)=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") ||"[]")
        if(this.state.favourites.includes(movie.id)){
            oldData=oldData.filter((m)=>m.id!=movie.id)
        }
        else{
            oldData.push(movie)
        }
        localStorage.setItem("movies-app",JSON.stringify(oldData))
        // console.log(oldData);

        this.handleFavState();
    }
    handleFavState=()=>{
        let oldData = JSON.parse(localStorage.getItem("movies-app") ||"[]")
        let temp = oldData.map((movie)=>movie.id)

        this.setState({
            favourites:[...temp]
        })

    }
  render() {
    //   let movie= movies.results;

    //   console.log('rendering done');
    return (
      <>
        {
            this.state.movies.length==0 ? 
                <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                </div>
            :
                <div>
                    <h3 className="text-center"><strong>Trending</strong></h3>
                    <div className="movies-list">
                        {
                            this.state.movies.map((movieObj)=> 
                                (
                                    <div className="card movie-card" 
                                    onMouseEnter={()=>this.setState({hover:movieObj.id})}
                                    onMouseLeave={()=>this.setState({hover:''})}  >
                                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}   alt={movieObj.title} className="card-img-top movies-img" />

                                        {/* <div className="card-body"> */}
                                        <h5 className="card-title movie-title">{movieObj.original_title}</h5>
                                        {/* <p className="card-text movie-text">
                                            {movieObj.overview}
                                        </p> */}
                                        <div className="button-wrapper" >
                                            {
                                                this.state.hover==movieObj.id && 
                                                <a  className="btn btn-primary movies-button" onClick={()=>this.handleFav(movieObj)}
                                                >
                                                    {this.state.favourites.includes(movieObj.id)? "Remove From Favourite ":"Add To Favourites"
                                                    }
                                                    
                                                </a>
                                            }
                                            

                                        </div>
                                        
                                        {/* </div> */}
                                    </div>
                                )
                               
                            )
                        }
                    </div>
                   <div style={{display:'flex',justifyContent:'center'}}>

                    <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" onClick={this.handleLeft}
                                    style={{cursor:'pointer'}}
                                >Previous</a></li>
                                {
                                    this.state.prr.map((pgvalue)=> (
                                        <li className="page-item"><a className="page-link" onClick={()=>this.handleCrrPg(pgvalue)}>{pgvalue}</a></li>      
                                    ))
                                }
                                
                                <li className="page-item"><a className="page-link" onClick={this.handleRight} style={{cursor:'pointer'}}>Next</a></li>
                            </ul>
                    </nav>
                   </div>
                </div>
        }

      </>
    )
  }
}
