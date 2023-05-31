import './NotFound.css'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <main className="NotFound">
            <div>
                404 - Page Not Found
            </div>
            <div>
                <Link to="/" className='btn btn-delete'>Vrati se početnu stranicu</Link>
            </div>
        </main>
    )
}