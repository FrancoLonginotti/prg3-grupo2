import React, { Component } from 'react';
import './styles.css'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Fav from '../../screens/Favoritos/fav';

class Card extends Component{
    constructor(props){
        super(props);
        this.state = {
            verDescripcion: false
        }
    }

    cambio(){
        this.setState({
          verDescripcion: !this.state.verDescripcion
        })
    }

    render(){
        return(
            <>
               
                <article className='single-card-movie'>
                    <img src={`https://image.tmdb.org/t/p/w342/${this.props.poster_path}`} alt="" className="card-img-top"/>
                    <div  className='cardBody'>
                        <h5 className="card-title">{this.props.title || this.props.name}</h5>
                        <button onClick={()=>{this.cambio()}}>
                            {this.state.verDescripcion ? "Ocultar descripción" : "Ver descripción"}
                        </button>
                        {this.state.verDescripcion && <p className="card-text">{this.props.overview}</p>}
                        <br></br>
                        {this.props.isSerie === false ? 
                            <Link to={`/pelicula/${this.props.id}`} className="btn btn-primary">Ir a detalle</Link>
                            :
                            <Link to={`/serie/${this.props.id}`} className="btn btn-primary">Ir a detalle</Link>
                        }
                        
                        <br></br>
                        <Fav isSerie={this.props.isSerie} id={this.props.id} sacarFavoritos={this.props.sacarFavoritos}/>
                    </div>
                </article>
                    
                    
           
            </>
        )
    }
}

export default Card;