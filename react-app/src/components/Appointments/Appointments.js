import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AppointmentOptionsModal from './AppointmentOptionsModal'
import './Appointments.css'


export default function Appointments() {
    const [ past, setPast ] = useState(false)
    const { userId } = useParams()
    const userAppts = useSelector(state => Object.values(state.appointments)
                        .filter(appt => +appt.userId === +userId))

    const today = new Date()
    const upcomingAppts = userAppts.filter((appt) => {
        return today.getTime() < new Date (appt.origDateFormat)
    })

    const pastAppts = userAppts.filter((appt) => {
        return today.getTime() > new Date (appt.origDateFormat)
    })

    // console.log('UPCOMING', upcomingAppts)
    // console.log('PAST', pastAppts)

    upcomingAppts.sort((objA, objB) => {
        return new Date(objA.origDateFormat) - new Date(objB.origDateFormat)
    })

    pastAppts.sort((objA, objB) => {
        return new Date(objA.origDateFormat) - new Date(objB.origDateFormat)
    })


    const handleUpcoming = () => {
        setPast(false)
        const upcoming = document.getElementsByClassName('upcoming')[0]
        const past = document.getElementsByClassName('past')[0]
        past.style.boxShadow = 'none'
        past.style.fontWeight = 400
        upcoming.style.boxShadow = '0 1px black'
        upcoming.style.fontWeight = 575
    }

    const handlePast = () => {
        setPast(true)
        const upcoming = document.getElementsByClassName('upcoming')[0]
        const past = document.getElementsByClassName('past')[0]
        upcoming.style.boxShadow = 'none'
        upcoming.style.fontWeight = 400
        past.style.boxShadow = '0 1px black'
        past.style.fontWeight = 575
    }


    return (
        <>
            <div className='user-appointments-main'>
                <div className='appointments-title'>
                    Your Appointments
                </div>
                <div className='appt-tabs'>
                    <button className='upcoming' onClick={handleUpcoming}>Upcoming Appointments</button>
                    <button className='past' onClick={handlePast}>Past Appointments</button>
                </div>
                <div className='user-appts-secondary'>
                    <div className='user-appts-container'>
                        {!past && upcomingAppts.map((appt) => (
                            <div className='single-appt' key={appt.id}>
                                <div className='single-appt-header'>
                                    <div></div>
                                    Appointment with {appt.studio.name} on {appt.date.month} {appt.date.day}, {appt.date.year}
                                    <div>
                                        <AppointmentOptionsModal apptId={appt.id} />
                                    </div>
                                </div>
                                <div className='single-appt-body'>
                                    <div className='single-appt-left'>
                                        <div className='single-appt-placement'>
                                            <span className='property'>Placement: </span>
                                            <span>{appt.placement}</span>
                                        </div>
                                        <div className='single-appt-size'>
                                            <span className='property'>Size: </span>
                                            <span>{appt.size}</span>
                                        </div>
                                        <div className='single-appt-color'>
                                            <span className='property'>Color: </span>
                                            <span>{appt.color ? 'Yes' : 'No'}</span>
                                        </div>
                                    </div>
                                    <div className='single-appt-right'>
                                        <div className='single-appt-description'>
                                            <span className='property'>Description: </span>
                                            <span>{appt.description}</span>
                                        </div>
                                        <div className='single-appt-image-container'>
                                            <span className='property'>References: </span>
                                            <div className='appt-page-img-references'>
                                                {appt.apptImages.length > 0 && appt.apptImages.map((img, idx) => (
                                                        img && <img key={idx} className='single-appt-image' src={img.image} alt='reference' />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {past && pastAppts.map((appt) => (
                            <div className='single-appt' key={appt.id}>
                            <div className='single-appt-header'>
                                Appointment with {appt.studio.name} on {appt.date.month} {appt.date.day}, {appt.date.year}
                            </div>
                            <div className='single-appt-body'>
                                <div className='single-appt-left'>
                                    <div className='single-appt-placement'>
                                        <span className='property'>Placement: </span>
                                        <span>{appt.placement}</span>
                                    </div>
                                    <div className='single-appt-size'>
                                        <span className='property'>Size: </span>
                                        <span>{appt.size}</span>
                                    </div>
                                    <div className='single-appt-color'>
                                        <span className='property'>Color: </span>
                                        <span>{appt.color ? 'Yes' : 'No'}</span>
                                    </div>
                                </div>
                                <div className='single-appt-right'>
                                    <div className='single-appt-description'>
                                        <span className='property'>Description: </span>
                                        <span>{appt.description}</span>
                                    </div>
                                    <div className='single-appt-image-container'>
                                        <span className='property'>References: </span>
                                        <span>
                                            <img className='single-appt-image' src={appt.imageReferences} alt='reference' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
