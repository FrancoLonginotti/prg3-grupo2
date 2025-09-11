import React, { Component } from 'react';


class Detalle extends Component{
    constructor(props){
        super(props);
        this.state = {
            contenido: null,
            favoritos: []
        }
    }

    componentDidMount(){
        const id = this.props.match.params.id;
        const tipo = this.props.match.params.tipo;
        const api = "296583e7e37a5c7294c3a04233952058"
        const endpoint = tipo === "movie" ? `https://api.themoviedb.org/3/movie/${id}?api_key=${api}` : `https://api.themoviedb.org/3/tv/${id}?api_key=${api}`;

        fetch(endpoint)
        .then(res => res.json())
            .then(data => {
            this.setState({
                contenido: data,
                tipo: data.tipo
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        const {contenido , tipo} = this.state;
        if (!contenido) return <p>Cargando ... </p>;
        const estreno = tipo === "movie" ? contenido.release_date : contenido.first_air_date;

        return(
            <section className='detalle'>
                <img src={`https://image.tmdb.org/t/p/w342/${contenido.poster_path}`} alt={contenido.title} />
                <h2>{contenido.title}</h2>
                <p>Rating: {contenido.popularity}</p> 
                {/* NO ENCONTRE EL RATING */}
                <p>Estreno: {estreno}</p>
            </section>
        )
    }
}

export default Detalle;