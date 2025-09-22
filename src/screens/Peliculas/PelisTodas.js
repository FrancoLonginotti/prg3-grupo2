import React, { Component } from 'react';
import './styles.css';
import Card from '../../components/Card/Card'

class PelisTodas extends Component{
    constructor(props){
        super(props);
        this.state = {
            movies: [],
            pag: 1,
            cargando: true,
            busqueda: ''
        }
    }

    controlarCambios(busqueda){
        console.log(busqueda.target.value)
        this.setState({ 
            busqueda: busqueda.target.value 
        });
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
        const filtradas = this.state.movies.filter(s =>
            s.title.toLowerCase().includes(this.state.busqueda.toLowerCase())
        );
        return(
            <>
                <h2>All trending movies this week</h2>
                <input type="text" placeholder="Buscar pelicula..." onChange={(busqueda) => this.controlarCambios(busqueda)}/>
                {this.state.cargando && <p>Cargando...</p>}
               
                <section className='row cards'>
                    {
                        filtradas.map((elm, i) =>
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
                <button onClick={()=> this.masPelis()}>Ver más</button>
            </>
        )
    } 
}

export default PelisTodas;