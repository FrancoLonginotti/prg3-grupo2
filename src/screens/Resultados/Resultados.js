import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Fav from '../../screens/Favoritos/fav';

class Resultados extends Component{
    constructor(props){
        super(props)

        this.state = {
            busqueda: this.props.match.params.query.toLowerCase(), 
            resultadosPeliculas: [], 
            resultadosSeries: [],
            cargando: true
        }
    }
    
    componentDidMount() {
        const api_key = "296583e7e37a5c7294c3a04233952058"
        
        fetch(`https://api.themoviedb.org/3/search/movie?query=${this.props.match.params.query}&api_key=${api_key}`)
        .then(res => res.json())
        .then(data => {
        console.log(data)
        this.setState({
                resultadosPeliculas: data.results,
                cargando: false
            })
        })
        .catch(err => console.error(err));

        fetch(`https://api.themoviedb.org/3/search/tv?query=${this.props.match.params.query}&api_key=${api_key}`)
        .then(res => res.json())
        .then(data => {
        console.log(data)
        this.setState({
                resultadosSeries: data.results,
                cargando: false
            })
        })
        .catch(err => console.error(err));
    }

    render(){
        return(
            <>
                <h1>Resultados de busqueda para "{this.props.match.params.query}"</h1>
                {this.state.cargando && <p>Cargando...</p>}

                <h2>Películas:</h2>
                <section className='row cards'>
                    {this.state.resultadosPeliculas.length === 0 ? (<p>No se encontraron peliculas</p>) : (
                        this.state.resultadosPeliculas.map((p) => (
                            <article key={p.id} className='single-card-movie'>
                                <img src={`https://image.tmdb.org/t/p/w342/${p.poster_path}`} alt="" className="card-img-top"/>
                                <div className='cardBody'>
                                    <h5 className="card-title">{p.title}</h5>
                                    <Link to={`/pelicula/${p.id}`} className="btn btn-primary">Ir a detalle</Link>
                                    <br></br>
                                    <Fav isSerie={false} id={p.id} />
                                </div>
                            </article>
                        ))
                    )}
                </section>
                    
                <h2>Series:</h2>
                <section className='row cards'>
                    {this.state.resultadosSeries.length === 0 ? (<p>No se encontraron series</p>) : 
                    (
                        this.state.resultadosSeries.map((s) => (
                            <article key={s.id} className='single-card-movie'>
                                <img src={`https://image.tmdb.org/t/p/w342/${s.poster_path}`} alt="" className="card-img-top"/>
                                <div className='cardBody'>
                                    <h5 className="card-title">{s.name}</h5>
                                </div>
                                <Link to={`/serie/${s.id}`} className="btn btn-primary">Ir a detalle</Link>
                                <br></br>
                                <Fav isSerie={true} id={s.id}/>
                            </article>
                        ))
                    )}
                </section>
                
            </>
        )
        
    }
}

export default Resultados;