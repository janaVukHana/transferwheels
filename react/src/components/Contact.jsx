import { useForm } from 'react-hook-form'
import { useState } from 'react';
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import './Contact.css'
import Spinner from './Spinner'
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const phoneStyles = {
    display: 'block',
    textAlign: 'center',
    fontSize: '3rem',
    marginBottom: '1.5rem'
}

export default function Contact() {

    const {register, handleSubmit, reset, watch, formState: { errors }} = useForm({mode: 'onChange'})

    const [laravelErrors, setLaravelErrors] = useState(null)
    const [sending, setSending] = useState(false)
    const {setNotification} = useStateContext()
   

    const registerOptions = {
        name: {
            required: 'Obavezno polje.',
            minLength: {
                value: 3,
                message: 'Ime mora biti minimum 3 karaktera.'
            }
        },
        phone: {required: 'Obavezno polje.'},
        email: {required: 'Obavezno polje.'},
        message: {
            required: 'Obavezno polje.',
            minLength: {
                value: 20,
                message: 'Poruka mora biti minumum 20 karaktera'
            },
            maxLength: {
                value: 250,
                message: 'Maksimalno 250 karaktera.'
            }
        }
    }

    const alert = {color: 'var(--red)', borderBottomColor: 'var(--red)'}

    const handleError = (errors) => {}

    // onSubmit
    const handleMessage = (formData) => {
        
        setSending(true)

        axiosClient.post('/contact-us', formData)
            .then(data => {
                setSending(false)
                // show notification
                setNotification('Poruka je poslata.')
                // reset form 
                reset()
            })
            .catch((err) => {
                setSending(false)
                const response = err.response

                 if(response && response.status === 422) {
                    setLaravelErrors(response.data.errors)
                 }
            })
    }

    return (
        <section className='Contact section'>
            <h2 id="contact">
                <Divider component="div" role="presentation">Kontakt</Divider>
            </h2>

            <a style={phoneStyles} href="tel:+38162421903">tel: 062 421903</a>

            <div className='iconContainer'>
                <MessageRoundedIcon fontSize="large" />
            </div>

            <form className="form" onSubmit={handleSubmit(handleMessage, handleError)}>

                <div className="form-control">
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Ime"
                        error={!!errors?.name}
                        helperText={errors?.name && errors.name.message}
                        id="name"
                        name="name"
                        {...register('name', registerOptions.name)}
                    />
                </div>

                <div className="form-control">
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Telefon"
                        error={!!errors?.phone}
                        helperText={errors?.phone && errors.phone.message}
                        id="phone"
                        name="phone"
                        type="tel"
                        {...register('phone', registerOptions.phone)}
                    />
                </div>

                <div className="form-control">
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Email"
                        error={!!errors?.email}
                        helperText={errors?.email && errors.email.message}
                        id="email"
                        name="email"
                        type="email"
                        {...register('email', registerOptions.email)}
                    />
                </div>

                <div className="form-control">
                    <TextField
                        fullWidth
                        error={!!errors?.message}
                        helperText={errors?.message && errors.message.message}
                        id="message"
                        name="message"
                        multiline
                        rows={4}
                        variant='outlined'
                        label="Poruka"
                        inputProps={{
                            style: {
                                whiteSpace: 'pre-wrap'
                            }
                        }}
                        {...register('message', registerOptions.message)}
                    />
                </div>
                {sending && <Spinner />}
                <Button type="submit" fullWidth variant="contained">Pošalji</Button>

                
                {/* Laravel api errors object */}
                {laravelErrors && Object.values(laravelErrors).map(err => {
                        return <div className='error'>{err[0]}</div>
                    })}
            </form>
        </section>
    )
    }