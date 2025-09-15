import React from "react";
import SeriesRec from "../../components/Recomendaciones/SeriesRec";
import PelisRec from "../../components/Recomendaciones/PelisRec";
import Formulario from "../../components/Formulario/Formulario";

function Home() {
    return (
        <React.Fragment>
            <Formulario/>
            <PelisRec/>
            <SeriesRec/>
            
        </React.Fragment>
    )
}

export default Home