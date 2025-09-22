import React, { Component } from 'react';
import Card from '../../components/Card/Card';

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

    sacarFavoritos(id, isSerie){
        if (isSerie === true) {
            const seriesFav = this.state.seriesFav.filter(elm => elm.id !== id);
            this.setState({ 
                seriesFav: seriesFav
            });
        } else {
            const peliculasFav = this.state.peliculasFav.filter(elm => elm.id !== id);
            this.setState({ 
                peliculasFav: peliculasFav
            });
        }
        }

    render(){
        return(
            <>
                <h2>Tus favoritos</h2>

                <h3>Peliculas favoritas:</h3>
                <section className='row cards'>
                    {(this.state.peliculasFav.length === 0) ? (<p>No tenes peliculas favoritas.</p>) : 
                        (this.state.peliculasFav.map((elm, i) => 
                            <Card
                                key={elm.id}
                                id={elm.id}
                                poster_path={elm.poster_path}
                                title={elm.title}
                                overview={elm.overview}
                                isSerie={false}
                                sacarFavoritos={() => this.sacarFavoritos(elm.id, false)} 
                            />
                        ))}
                </section>

                <h3>Series favoritas:</h3>
                <section className='row cards'>
                    {(this.state.seriesFav.length === 0) ? (<p>No tenes series favoritas.</p>) : 
                        (this.state.seriesFav.map((elm) => 
                            <Card
                                key={elm.id}
                                id={elm.id}
                                poster_path={elm.poster_path}
                                name={elm.name}
                                overview={elm.overview}
                                isSerie={true}
                                sacarFavoritos={() => this.sacarFavoritos(elm.id, true)} 
                            />
                        ))}
                </section>
            </>
        )
    }
}

export default Favoritos;