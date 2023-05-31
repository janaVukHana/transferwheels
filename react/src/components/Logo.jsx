import './Logo.css'
import { NavLink } from 'react-router-dom'

export default function Logo() {
    return (
        <div className='Logo'>
            <NavLink to="/" className="Logo">
                Transfer<span>Wheels</span>
            </NavLink>
        </div>
    )
}