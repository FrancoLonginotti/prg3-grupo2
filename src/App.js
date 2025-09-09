import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './screens/Home/Home';
import Resultados from './components/Formulario/Resultados';
import Footer from './components/Footer/Footer';
import Serie from './screens/Series/Serie';
import Series from './screens/Series/Series';
import Pelicula from './screens/Peliculas/Pelicula';
import Peliculas from './screens/Peliculas/Peliculas';
import PelisTodas from './components/Recomendaciones/PelisTodas';
import SeriesTodas from './components/Recomendaciones/SeriesTodas';


function App() {
 return (
  <React.Fragment>
  <Navbar/>
  <Switch>
    <Route path='/' component={Home} exact={true} />
    <Route path='/resultados/:query' component={Resultados}/>
    <Route path='/serie/:id' component={Serie} />
    <Route path='/pelicula/:id' component={Pelicula} />
    <Route path='/series' component={Series} />
    <Route path='/peliculas' component={Peliculas} />
    <Route path='/trendingMovies' component={PelisTodas} />
    <Route path='/trendingSeries' component={SeriesTodas} />

  </Switch>
  <Footer/>
</React.Fragment>
 );
}


export default App;
