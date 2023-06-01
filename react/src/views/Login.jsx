import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { useState } from 'react';
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import './Login.css'
import Spinner from '../components/Spinner'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Login() {

    const { token, setUser, setToken, setNotification } = useStateContext()

    if (token) {
        return <Navigate to="/dashboard" />
    }

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({ mode: 'onChange' })

    const [laravelErrors, setLaravelErrors] = useState(null)
    const [sending, setSending] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false);

    console.log(laravelErrors);
    const registerOptions = {
        email: {
            required: 'Obavezno polje.',
        },
        password: { required: 'Obavezno polje.' },
    }

    const alert = { color: 'var(--red)', borderBottomColor: 'var(--red)' }

    const handleError = (errors) => {}

    const handleLogin = (formData) => {
        setSending(true);

        axiosClient.post('/login', formData)
            .then(data => {
                setUser(data.data.user);
                setToken(data.data.token);
                setNotification('Ulogovan si.');
            })
            .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setLaravelErrors(response.data.errors);
                    } else {
                        setLaravelErrors({
                            email: [response.data.message]
                        });
                    }
                }
            })
            .finally(() => {
                setSending(false);
            });
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    return (
        <section className='Login section'>
            <div className='login-content'>
                <h1><Divider component="div" role="presentation">Login</Divider></h1>
                <form className="form" onSubmit={handleSubmit(handleLogin, handleError)}>

                    <div className="form-control">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Email:"
                            error={!!errors?.email}
                            helperText={errors?.email && errors.email.message}
                            id="email"
                            name="email"
                            {...register('email', registerOptions.email)}
                        />
                    </div>

                    <div className="form-control">
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Password:"
                            error={!!errors?.password}
                            helperText={errors?.password && errors.password.message}
                            id="password"
                            name="password"
                            type={passwordVisible ? 'text' : 'password'}
                            {...register('password', registerOptions.password)}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                )
                            }}
                        />
                    </div>

                    {sending && <Spinner />}
                    <Button type="submit" fullWidth variant="contained">Login</Button>

                    {laravelErrors && Object.values(laravelErrors).map((err, index) => {
                        return <div style={{color: 'red'}} key={index} className='error'>{err[0]}</div>
                    })}
                </form>
            </div>
        </section>
    )
}
