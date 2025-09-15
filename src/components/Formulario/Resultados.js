import React, { Component } from 'react';
/* import { Link } from 'react-router-dom/cjs/react-router-dom.min'; */

class Resultados extends Component{
    constructor(props){
        super(props)

        this.state = {
            busqueda: this.props.match.params.query.toLowerCase(), 
            resultadosFiltrados: [], 
            resultados: []
        }
    }
    
    componentDidMount() {
        const api = "296583e7e37a5c7294c3a04233952058"
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${api}&query=${this.state.busqueda}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                resultados: data.results
            })
        })
        .catch(error => {
            console.log(error);
        })
        this.resultadosFiltrados();
    }

     resultadosFiltrados(){
        let busqueda = this.props.match.params.query.toLowerCase();
        let resultadosFiltrados = this.state.resultados.filter(resultado => 
            resultado.title.toLowerCase().includes(busqueda)
        );

        this.setState({
            busqueda: busqueda,
            resultadosFiltrados: resultadosFiltrados
        });
    }

    render(){
        return(
            <>
                <h1>Resultados de busqueda para "{this.props.match.params.query}"</h1>
                <section className='row cards'>
                    {this.state.cargando && <p>Cargando...</p>}
                    {
                            this.state.resultados.map((elm, i) => 
                                <article key={i} className='single-card-movie'>
                                    <img src={`https://image.tmdb.org/t/p/w342/${elm.poster_path}`} alt="" className="card-img-top"/>
                                    <div className='cardBody'>
                                        <h5 className="card-title">{elm.title || elm.name}</h5>
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