import React, { Component } from 'react';

class fav extends Component{
    constructor(props){
        super(props);
        this.state = {
            esFavorito: false
        }
    }

    componentDidMount(){
        const local = this.props.isSerie ? 'favoritosSeries' : 'favoritosPeliculas';

        let favoritosLocalStorage = localStorage.getItem(local)
        let favoritosParse = JSON.parse(favoritosLocalStorage) 
        if(favoritosParse !== null){
            if(favoritosParse.includes(this.props.id)){
                this.setState({
                    esFavorito: true
                })
            }
        }
    }

    agregarFavoritos(id){
        const local = this.props.isSerie ? 'favoritosSeries' : 'favoritosPeliculas';
        let favoritos= []
        let favoritosLocalStorage = localStorage.getItem(local)
        let favoritosParse = JSON.parse(favoritosLocalStorage)

        if(favoritosParse !== null){
            if(!favoritosParse.includes(id)){
                favoritosParse.push(id)
            }
            
            let favoritosString = JSON.stringify(favoritosParse)
            localStorage.setItem(local, favoritosString)

            console.log(favoritosParse)

        } else{
            favoritos.push(id)
            
            let favoritosString = JSON.stringify(favoritos)
            localStorage.setItem(local, favoritosString)
            
            console.log(favoritos)
        }

        this.setState({
            esFavorito: true
        })
    }

    sacarFavoritos(id){
        const local = this.props.isSerie ? 'favoritosSeries' : 'favoritosPeliculas';
        let favoritosLocalStorage = localStorage.getItem(local)
        let favoritosParse = JSON.parse(favoritosLocalStorage)
        
        let favs =  favoritosParse.filter(f => f !== id)
        let favoritosString = JSON.stringify(favs)
        localStorage.setItem(local, favoritosString)

        console.log(favs)

        this.setState({
            esFavorito: false
        })
    }

    render(){
        return(
            <>
                {this.state.esFavorito  
                ? 
                <button onClick={() => this.sacarFavoritos(this.props.id)}>Sacar de favoritos</button> 
                : 
                <button onClick={() => this.agregarFavoritos(this.props.id)}>Agregar a favoritos</button>
                }
            </>
        )
    }
}

export default fav;