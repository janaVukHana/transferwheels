import './Hero.css';
import Button from '@mui/material/Button';

export default function Hero() {
    return (
        <>
            <div id="home" className="Hero">
                <div className="intro">
                    <h1>Prevoz putnika &middot; <span>Novi Sad</span></h1>
                    <hr />
                    <h2>Posvećeni pružanju vrhunske usluge prevoza</h2>

                    <Button variant="contained" style={{width: '50%'}} href="tel:+38162421903">
                        Pozovite
                    </Button>
                </div>
                <div className='overlay'></div>
            </div>
        </>
    );
}
