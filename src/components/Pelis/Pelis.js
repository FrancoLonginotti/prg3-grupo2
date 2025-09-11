import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css'

class Pelis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            pag: 1,
            cargando: true,
            verDescripcion: null
        };

    }

    cambio(id) {
        this.setState({
            verDescripcion: id === this.state.verDescripcion ? null : id
        });
    }

    componentDidMount(){
        const api = "296583e7e37a5c7294c3a04233952058";
        const pag = this.state.pag;
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api}&pag=${pag}`)
        .then(res => res.json())
        .then(data => {
            const resultados = data.results;
            this.setState({
                movies: resultados,
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

     masPelis(){
        const api = "296583e7e37a5c7294c3a04233952058";
        const nuevaPag = this.state.pag + 1;
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api}&page=${nuevaPag}`)
        .then(res => res.json())
        .then(data => {
            const nuevosResultados = data.results;
            const moviesActua = this.state.movies.concat(nuevosResultados);
            this.setState({
                pag: nuevaPag,
                movies: moviesActua,
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


    render() {
        return (
            <React.Fragment>
                <h1>Lista de Peliculas</h1>
                {this.state.cargando && <p>Cargando...</p>}
                <section className='row cards'>
                    {
                        this.state.movies.map((elm, i) => 
                            <article key={i} className='single-card-movie'>
                                <img src={`https://image.tmdb.org/t/p/w342/${elm.poster_path}`} alt="" className="card-img-top"/>
                                <div className='cardBody'>
                                    <h5 className="card-title">{elm.title}</h5>
                                    <button onClick={()=>{this.cambio(elm.id)}}>
                                        {this.state.verDescripcion === elm.id ? "Ocultar descripción" : "Ver descripción"}
                                    </button>
                                    {this.state.verDescripcion === elm.id && <p className="card-text">{elm.overview}</p>}
                                    <br></br>
                                    <Link to={`/pelicula/${elm.id}`} className="btn btn-primary">Ir a detalle</Link>
                                </div>
                            </article>
                        )
                    }
                </section>
                <button onClick={()=> this.masPelis()}>Ver más</button>
                {console.log(this.state.cantPelis)}
            </React.Fragment>
        );
    }
}

export default Pelis;