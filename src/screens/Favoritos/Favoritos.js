import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fav from './fav';

class Favoritos extends Component{
    constructor(props){
        super(props);
        this.state = {
            peliculasFav: [],
            seriesFav: [],
            cargando: true
        }
    }

    componentDidMount(){
        const api = "296583e7e37a5c7294c3a04233952058";

        const pelis = JSON.parse(localStorage.getItem('favoritosPeliculas') || "[]");

        let peliculasArray = []

        pelis.map(id => {
            fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api}`)
            .then(res => res.json())
            .then(data => {
                peliculasArray.push(data);
                this.setState({
                    peliculasFav: peliculasArray,
                    cargando: false
                })
            })

            .catch(error => {
                console.log(error);
                this.setState({
                    cargando: false
                })
            })
        })

        const series = JSON.parse(localStorage.getItem('favoritosSeries') || "[]");

        let seriesArray = []

        series.map(id => {
            fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${api}`)
            .then(res => res.json())
            .then(data => {
                seriesArray.push(data)
                this.setState({
                    seriesFav: seriesArray,
                    cargando: false
                })
            })

            .catch(error => {
                console.log(error);
                this.setState({
                    cargando: false
                })
            })
        })
    }

    render(){
        return(
            <>
                <h2>Tus favoritos</h2>

                <h3>Peliculas favoritas:</h3>
                <section className='row cards'>
                    {(this.state.peliculasFav.length === 0) ? (<p>No tenes peliculas favoritas.</p>) : 
                        (this.state.peliculasFav.map((elm, i) => 
                            <article key={i} className='single-card-movie'>
                                <img src={`https://image.tmdb.org/t/p/w342/${elm.poster_path}`} alt="" className="card-img-top"/>
                                <div className='cardBody'>
                                    <h5 className="card-title">{elm.title}</h5>
                                    <Link to={`/pelicula/${elm.id}`} className="btn btn-primary">Ir a detalle</Link>
                                    <br></br>
                                    <Fav isSerie={false} id={elm.id}/>
                                </div>
                            </article>
                        ))}
                </section>

                <h3>Series favoritas:</h3>
                <section className='row cards'>
                    {(this.state.seriesFav.length === 0) ? (<p>No tenes series favoritas.</p>) : 
                        (this.state.seriesFav.map((elm, i) => 
                            <article key={i} className='single-card-movie'>
                                <img src={`https://image.tmdb.org/t/p/w342/${elm.poster_path}`} alt="" className="card-img-top"/>
                                <div className='cardBody'>
                                    <h5 className="card-title">{elm.name}</h5>
                                    <Link to={`/serie/${elm.id}`} className="btn btn-primary">Ir a detalle</Link>
                                    <br></br>
                                    <Fav isSerie={true} id={elm.id}/>
                                </div>
                            </article>
                        ))}
                </section>
            </>
        )
    }
}

export default Favoritos;