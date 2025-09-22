import React, { Component } from 'react';
import './styles.css';
import Card from '../../components/Card/Card'

class SeriesTodas extends Component{
    constructor(props){
        super(props);
        this.state = {
            series: [],
            pag:1,
            cargando: true,
            busqueda: ''
        }
    }

    controlarCambios = (evento) => {
        this.setState({ 
            busqueda: evento.target.value 
        });
    }

    componentDidMount(){
        const api = "296583e7e37a5c7294c3a04233952058"
        const pag = this.state.pag;
        fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${api}&page=${pag}`)
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

    masSeries(){
        const api = "296583e7e37a5c7294c3a04233952058"
        const nuevaPag = this.state.pag + 1;
        fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${api}&page=${nuevaPag}`)
        .then(res => res.json())
        .then(data => {
            const nuevosResultados = data.results;
            const seriesActua = this.state.series.concat(nuevosResultados);
            this.setState({
                pag: nuevaPag,
                series: seriesActua,
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
        const filtradas = this.state.series.filter(s =>
            s.name.toLowerCase().includes(this.state.busqueda.toLowerCase())
        );
        return(
            <>
                <h2>All trending TV shows this week</h2>
                <input type="text" placeholder="Buscar serie..." onChange={this.controlarCambios} />
                {this.state.cargando && <p>Cargando...</p>}
                <section className='row cards'>
                    {
                        filtradas.map((elm, i) =>
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
                <button onClick={()=> this.masSeries()}>Ver más</button>
            </>
        )
    } 
}

export default SeriesTodas;