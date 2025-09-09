import React, { Component } from 'react';

class Resultados extends Component{

    render(){
        return(
            <>
                <h1>Resultados de busqueda para "{this.props.match.params.query}"</h1>
            </>
        )
        
    }
}

export default Resultados;