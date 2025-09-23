import React, { Component } from 'react';
import Fav from '../../screens/Favoritos/fav'

class DetallePeliculas extends Component{
    constructor(props){
        super(props);
        this.state = {
            contenido: {},
            cargando: true
        }
    }

    componentDidMount(){

        const id = this.props.match.params.id;
        const api = "296583e7e37a5c7294c3a04233952058"
        const endpoint = `https://api.themoviedb.org/3/movie/${id}?api_key=${api}`

        fetch(endpoint)
        .then(res => res.json())
        .then(data => {
            this.setState({
                contenido: data,
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
        
        const contenido =this.state.contenido;
        
        return(
            <>
            {this.state.cargando ? (<p>Cargando...</p>) : 
            (<section className='detalle'>
                <img src={`https://image.tmdb.org/t/p/w342/${contenido.poster_path}`} alt={contenido.title} />
                <h2>{contenido.title}</h2>
                <p>Rating: {contenido.vote_average}</p> 
                <p>Estreno: {contenido.release_date}</p>
                <p>Duracion: {contenido.runtime} </p>
                <p>Sinopsis: {contenido.overview}</p>
                <p>Genero: {contenido.genres ? contenido.genres.map(g => g.name).join(', ') : ''}</p>
                <Fav isSerie={false} id={contenido.id}/>
                
            </section>)
            }
            </>
        )
    }
}

export default DetallePeliculas;