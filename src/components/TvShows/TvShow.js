import React, { Component } from 'react';


class TvShow extends Component{
    constructor(props){
        super(props);
        this.state = {
            contenido: null,
            favoritos: []
        }
    }

    componentDidMount(){
        const id = this.props.id;
        const api = "296583e7e37a5c7294c3a04233952058"
        const endpoint = `https://api.themoviedb.org/3/tv/${id}?api_key=${api}`

        fetch(endpoint)
        .then(res => res.json())
            .then(data => {
            this.setState({
                contenido: data,
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        const {contenido } =this.state;
        if (!contenido) return <p>Cargando ... </p>;

        return(
            <section className='detalle'>
                <img src={`https://image.tmdb.org/t/p/w342/${contenido.poster_path}`} alt={contenido.name} />
                <h2>{contenido.name}</h2>
                <p>Rating: {contenido.vote_average}</p> 
                {/* NO ENCONTRE EL RATING */}
                <p>Duracion: </p>
                <p>Sinopsis: </p>
                <p>Genero: {contenido.genre_ids}</p>
                <p>Estreno: {contenido.first_air_date}</p>
                <buton>Agregar a Favoritos</buton>
            </section>
        )
    }
}

export default TvShow;