import React, { Component } from 'react';
import Pelis from '../../components/Pelis/Pelis';
import Formulario from '../../components/Formulario/Formulario';

class Peliculas extends Component{
    

    render(){
        return(
            <React.Fragment>
                <Formulario/>
                <Pelis/>
            </React.Fragment>
        );
    }
}

export default Peliculas;