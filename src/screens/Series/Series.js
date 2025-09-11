import React, { Component } from 'react';
import TvShows from '../../components/TvShows/TvShows';
// import SeriesRec from '../../components/Recomendaciones/SeriesRec';
import Formulario from '../../components/Formulario/Formulario';

class Series extends Component{
    

    render(){
        return(
            <React.Fragment>
                <Formulario/>
                <TvShows/>
            </React.Fragment>
        );
    }
}

export default Series;