import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './screens/Home/Home';
import Resultados from './screens/Resultados/Resultados';
import Footer from './components/Footer/Footer';
import PelisTodas from './screens/Peliculas/PelisTodas';
import SeriesTodas from './screens/Series/SeriesTodas';
import NotFound from './components/NotFound/NotFound';
import DetalleSeries from './components/Detalle/DetalleSeries';
import DetallePeliculas from './components/Detalle/DetallePeliculas';
import Favoritos from './screens/Favoritos/Favoritos';
import './Styles/styles.css'


function App() {
 return (
  <React.Fragment>
  <Navbar/>
  <Switch>
    <Route path='/' component={Home} exact={true} />
    <Route path='/resultados/:query' component={Resultados}/>
    <Route path='/serie/:id' component={DetalleSeries} /> 
    <Route path='/pelicula/:id' component={DetallePeliculas} />
    <Route path='/peliculas' component={PelisTodas} />
    <Route path='/series' component={SeriesTodas} />
    <Route path='/favoritos' component={Favoritos} />
    <Route path="" component={NotFound}/>

  </Switch>
  <Footer/>
</React.Fragment>
 );
}


export default App;
