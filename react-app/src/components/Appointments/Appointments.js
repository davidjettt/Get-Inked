import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import AppointmentOptionsModal from './AppointmentOptionsModal'
import './Appointments.css'

export default function Appointments() {
    // const sessionUserId = useSelector(state => state.session.user.id)
    const { userId } = useParams()
    const userAppts = useSelector(state => Object.values(state.appointments)
                        .filter(appt => +appt.userId === +userId))


    return (
        <>
            <div className='user-appointments-main'>
                <div className='appointments-title'>
                    Your Appointments
                </div>
                <div className='user-appts-secondary'>
                    <div className='user-appts-container'>
                        {userAppts.map((appt) => (
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
                    </div>
                </div>
            </div>
        </>
    )
}
