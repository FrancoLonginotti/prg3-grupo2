import React, { Component } from 'react';
import Card from '../../components/Card/Card'

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
                            <Card
                                key={p.id}
                                id={p.id}
                                poster_path={p.poster_path}
                                title={p.title}
                                overview={p.overview}
                                isSerie={false}
                            />
                        ))
                    )}
                </section>
                   
                <h2>Series:</h2>
                <section className='row cards'>
                    {this.state.resultadosSeries.length === 0 ? (<p>No se encontraron peliculas</p>) :
                    (
                        this.state.resultadosSeries.map((s) => (
                            <Card
                                key={s.id}
                                id={s.id}
                                poster_path={s.poster_path}
                                name={s.name}
                                overview={s.overview}
                                isSerie={true}
                            />
                        ))
                    )}
                </section>
               
            </>
        )
       
    }
 
}

export default Resultados;