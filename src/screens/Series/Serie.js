import React, { Component } from 'react';
import TvShow from '../../components/TvShows/TvShow';

class Serie extends Component{
    

    render(){
        const id = this.props.match.params.id;
        return(
            <>
                <TvShow id={id}/>
            </>
        );
    }
}

export default Serie;