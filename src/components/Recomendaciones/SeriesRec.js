import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './styles.css';
import Fav from '../../screens/Favoritos/fav';

class SeriesRec extends Component{
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
            const resultadosFiltrados = resultados.filter((series, index) => index < 4)
            this.setState({
                series: resultadosFiltrados,
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
                <h2>Trending TV shows this week</h2>
                <Link to="/series">Ver todas</Link>
                {this.state.cargando && <p>Cargando...</p>}
                <section className='row cards'>
                    {
                        this.state.series.map((elm, i) => 
                            <article key={i} className='single-card-tv'>
                                <img src={`https://image.tmdb.org/t/p/w342/${elm.poster_path}`} alt="" className="card-img-top"/>
                                <div className='cardBody'>
                                    <h5 className="card-title">{elm.name}</h5>
                                    <button onClick={()=>{this.cambio(elm.id)}}>
                                        {this.state.verDescripcion === elm.id ? "Ocultar descripción" : "Ver descripción"}
                                    </button>
                                    {this.state.verDescripcion === elm.id && <p className="card-text">{elm.overview}</p>}
                                    <br></br>
                                    <Link to={`/serie/${elm.id}`} className="btn btn-primary">Ir a detalle</Link>
                                    <br></br>
                                    <Fav isSerie={false} id={elm.id}/>
                                </div>
                            </article>
                        )
                    }
                </section>
            </>
        )
    }
}

export default SeriesRec;