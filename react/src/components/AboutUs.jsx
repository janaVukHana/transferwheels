import './AboutUs.css'
import LocalTaxiRoundedIcon from '@mui/icons-material/LocalTaxiRounded';
import Divider from '@mui/material/Divider';

export default function AboutUs() {

    return (
        <section id="aboutus" className='AboutUs section'>
            <h2><Divider component="div" role="presentation">O Nama</Divider></h2>
            <div className='iconContainer'>
                <LocalTaxiRoundedIcon fontSize="large"  />
            </div>
            <ul>
                <h3>Pristojno i profesionalno vozačko osoblje</h3>
                <h3>Precizno planiranje ruta za optimalno vreme dolaska</h3>
                <h3>Udobna vozila s prostorom za prtljag</h3>
                <h3>Pouzdanost i tačnost u ispunjavanju rezervacija</h3>
            </ul>
            <hr />
            <p>Kontaktirajte nas danas da biste rezervisali svoj transfer i osigurali prijatan početak ili završetak Vašeg putovanja.</p>
        </section>

    )
}