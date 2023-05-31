import './NotFound.css'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function NotFound() {
    return (
        <main className="NotFound">
            <div>
                404 - Page Not Found
            </div>
            <div>
                <Button variant="contained">Vrati se početnu stranicu</Button>
            </div>
        </main>
    )
}