import React, { Component } from 'react';
/* import { Link } from 'react-router-dom/cjs/react-router-dom.min'; */

class Resultados extends Component{
    constructor(props){
        super(props)

        this.state = {
            busqueda: this.props.match.params.query.toLowerCase(), 
            peliculasFiltradas: [], 
            peliculas: []
        }
    }
    
    componentDidMount() {
        const api = "296583e7e37a5c7294c3a04233952058"
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${this.state.busqueda}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                peliculas: data.results
            })
        })
        .catch(error => {
            console.log(error);
        })
        this.peliculasFiltradas();
    }

     peliculasFiltradas(){
        let busqueda = this.props.match.params.query.toLowerCase();
        let peliculasFiltradas = this.state.peliculas.filter(pelicula => 
            pelicula.title.toLowerCase().includes(busqueda)
        );

        this.setState({
            busqueda: busqueda,
            peliculasFiltradas: peliculasFiltradas
        });
    }

    render(){
        console.log(this.state.peliculas);
        console.log(this.props.match.params.query);
        return(
            <>
                <h1>Resultados de busqueda para "{this.props.match.params.query}"</h1>
                <section className='row cards'>
                    {this.state.cargando && <p>Cargando...</p>}
                    {
                            this.state.peliculas.map((elm, i) => 
                                <article key={i} className='single-card-movie'>
                                    <img src={`https://image.tmdb.org/t/p/w342/${elm.poster_path}`} alt="" className="card-img-top"/>
                                    <div className='cardBody'>
                                        <h5 className="card-title">{elm.title}</h5>
                                        {/* <button onClick={()=>{this.cambio(elm.id)}}>
                                            {this.state.verDescripcion === elm.id ? "Ocultar descripción" : "Ver descripción"}
                                        </button>
                                        {this.state.verDescripcion === elm.id && <p className="card-text">{elm.overview}</p>}
                                        <br></br>
                                        <Link to={`/serie/${elm.id}`} className="btn btn-primary">Ir a detalle</Link> */}
                                    </div>
                                </article>
                            )
                        }
                </section>
            </>
        )
        
    }
}

export default Resultados;