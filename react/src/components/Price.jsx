import './Price.css'
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';
import Divider from '@mui/material/Divider';

export default function Price() {
    return (
        <section id="price" className="Price section">
            <h2>
                <Divider component="div" role="presentation">Cenovnik</Divider>
            </h2>
            <div className='iconContainer'>
                <LocalOfferRoundedIcon fontSize="large" />
            </div>
            <p>Novi Sad - Aerodrom Beograd <br /><span>5500 rsd</span></p>
            <p>Ostale desctinacije <br /><span>po dogovoru</span></p>
        </section>
    )
}