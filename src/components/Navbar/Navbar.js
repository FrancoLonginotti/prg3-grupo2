import React from 'react';
import {Link} from 'react-router-dom'
import Formulario from '../Formulario/Formulario';
import './styles.css'

function Navbar() {
    let opciones = [
        {
            nombre: 'Home',
            path: '/'
        },
        {
            nombre: 'Peliculas',
            path: '/peliculas'
        },
        {
            nombre: 'Series',
            path: '/series'
        },
        {
            nombre: 'Favoritas',
            path: '/favoritas'
        }
    ]
    return(
        <>
            <nav>
                <h1>FilmSeeker</h1>
                <ul className="nav nav-tabs my-4">
                    {
                        opciones.map((elm, idx) => <li className="nav-item" key={elm + idx}><Link to={elm.path} className="nav-link">{elm.nombre}</Link></li>)
                    }
                </ul>
                {/* <Formulario/> */}
            </nav>
        </>
    )
}

export default Navbar;