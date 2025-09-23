import React from "react";
import SeriesRec from "../../components/Recomendaciones/SeriesRec";
import PelisRec from "../../components/Recomendaciones/PelisRec";

function Home() {
    return (
        <React.Fragment>
            <PelisRec/>
            <SeriesRec/>
            
        </React.Fragment>
    )
}

export default Home