import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';

class Formulario extends Component{
    constructor(props){
        super(props)

        this.state = {
            busqueda: ''
        }
    }

    prevenirDefault(evento){
        evento.preventDefault()
        this.props.history.push("/resultados/"+this.state.busqueda)
    }

    controlarCambios(evento){
        this.setState({
            busqueda: evento.target.value
        })
    }

    render(){
        return(
            <>
                <form className="search-form" onSubmit={(event)=>this.prevenirDefault(event)}>
                    <input type='text' name="searchData" placeholder="Buscar..." onChange={(event)=>this.controlarCambios(event)}></input>
                    <button type='sumbit' className="btn btn-success btn-sm">Buscar</button>
                </form>
            </>
        );
    }
}

export default withRouter(Formulario);