import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './styles.css';
import Card from '../Card/Card'

class SeriesRec extends Component{
    constructor(props){
        super(props);
        this.state = {
            series: [],
            cargando: true
        }
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
                            <Card
                                key={i}
                                id={elm.id}
                                poster_path={elm.poster_path}
                                name={elm.name}
                                overview={elm.overview}
                                isSerie={true}
                            />
                        )
                    }
                </section>
            </>
        )
    } 
}

export default SeriesRec;