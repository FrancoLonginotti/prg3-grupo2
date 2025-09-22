import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Card from '../Card/Card'

class PelisRec extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            cargando: true
        }
    }

    componentDidMount(){
        const api = "296583e7e37a5c7294c3a04233952058"
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api}`)
        .then(res => res.json())
        .then(data => {
            const resultados = data.results;
            const resultadosFiltrados = resultados.filter((pelis, index) => index < 4)
            this.setState({
                movies: resultadosFiltrados,
                cargando: false
            })
        })
        .catch(error => {
            console.log(error);
            this.setState({
            cargando: false
            })
        })
    }

    render(){
        return(
            <>
                <h2>Trending movies this week</h2>
                <Link to="/peliculas">Ver todas</Link>
                {this.state.cargando && <p>Cargando...</p>}
                <section className='row cards'>
                    {
                        this.state.movies.map((elm, i) =>
                            <Card
                                key={i}
                                id={elm.id}
                                poster_path={elm.poster_path}
                                title={elm.title}
                                overview={elm.overview}
                                isSerie={false}
                            />
                        )
                    }
                </section>
            </>
        ) 
    }
}

export default PelisRec;

