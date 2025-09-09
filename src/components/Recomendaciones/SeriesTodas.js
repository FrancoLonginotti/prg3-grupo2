import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class SeriesTodas extends Component{
    constructor(props){
        super(props);
        this.state = {
            series: [],
            cargando: true,
            verDescripcion: null
        }
    }

    cambio(id){
        this.setState({
          verDescripcion: id === this.state.verDescripcion ? null : id
        })
    }

    componentDidMount(){
        const api = "296583e7e37a5c7294c3a04233952058"
        fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${api}`)
        .then(res => res.json())
        .then(data => {
            const resultados = data.results;
            this.setState({
                series: resultados,
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
                <h2>All trending TV shows this week</h2>
                {this.state.cargando && <p>Cargando...</p>}
                <section className='row cards'>
                    {
                        this.state.series.map((elm, i) => 
                            <article key={i} className='single-card-movie'>
                                <img src={`https://image.tmdb.org/t/p/w342/${elm.poster_path}`} alt="" className="card-img-top"/>
                                <div className='cardBody'>
                                    <h5 className="card-title">{elm.title}</h5>
                                    <button onClick={()=>{this.cambio(elm.id)}}>
                                        {this.state.verDescripcion === elm.id ? "Ocultar descripción" : "Ver descripción"}
                                    </button>
                                    {this.state.verDescripcion === elm.id && <p className="card-text">{elm.overview}</p>}
                                    <br></br>
                                    <Link to={`/serie/${elm.id}`} className="btn btn-primary">Ir a detalle</Link>
                                </div>
                            </article>
                        )
                    }
                </section>
            </>
        )
    }
}

export default SeriesTodas;