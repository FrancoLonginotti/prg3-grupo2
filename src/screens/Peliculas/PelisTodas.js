import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class PelisTodas extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            pag: 1,
            cargando: true,
            verDescripcion: null,
            esFavorito: false
        }
    }

    cambio(id){
        this.setState({
          verDescripcion: id === this.state.verDescripcion ? null : id
        })
    }

    componentDidMount(){
        const api = "296583e7e37a5c7294c3a04233952058"
        const pag = this.state.pag;
        fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${api}&page=${pag}`)
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

        let favoritosLocalStorage = localStorage.getItem('favoritos')
        let favoritosParse = JSON.parse(favoritosLocalStorage) 
        if(favoritosParse !== null){
            if(favoritosParse.includes()){
                this.setState({
                    esFavorito: true
                })
            }
        }
    }

    agregarFavoritos(id){
        let favoritos= []
        let favoritosLocalStorage = localStorage.getItem('favoritos')
        let favoritosParse = JSON.parse(favoritosLocalStorage)

        if(favoritosParse !== null){
            favoritosParse.push(id)
            console.log(favoritosParse)
            let favoritosString = JSON.stringify(favoritosParse)
            localStorage.setItem('favoritos', favoritosString)
            this.setState({
                esFavorito: true
            })
        } else{
            favoritos.push(id)
            console.log(favoritos)
            let favoritosString = JSON.stringify(favoritos)
            localStorage.setItem('favoritos', favoritosString)
            this.setState({
                esFavorito: true
            })
        }
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

    render(){
        return(
            <>
                <h2>All trending movies this month</h2>
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
                                    {this.state.esFavorito ? <button>Sacar de favoritos</button> : <button onClick={() => this.agregarFavoritos(elm.id)}>Agregar a Favoritos</button>}
                                </div>
                            </article>
                        )
                    }
                    
                </section>
                <button onClick={()=> this.masPelis()}>Ver más</button>
            </>
        )
    }
}

export default PelisTodas;