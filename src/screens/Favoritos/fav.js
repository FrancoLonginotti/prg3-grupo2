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
        } else{
            favoritos.push(id)
            
            let favoritosString = JSON.stringify(favoritos)
            localStorage.setItem(local, favoritosString)
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

        this.setState({
            esFavorito: false
        })

        if(this.props.sacarFavoritos){
            this.props.sacarFavoritos(this.props.id)
        }
        }

    render(){
        const local = this.props.isSerie ? 'favoritosSeries' : 'favoritosPeliculas';
        const favoritos = JSON.parse(localStorage.getItem(local) || "[]");
        
        return(
            <>
                {favoritos.includes(this.props.id)   
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