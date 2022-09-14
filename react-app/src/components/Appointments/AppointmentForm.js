import { useParams } from "react-router-dom";
import Calendar from 'react-calendar'
import './AppointmentForm.css'
import 'react-calendar/dist/Calendar.css';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";


export default function AppointmentForm() {
    const { studioId } = useParams()
    const formImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1663128799/5804024663e1ddff8e125720c07b87f2_oocxlo.jpg'
    const studio = useSelector(state => state.studios[+studioId])
    const studioName = studio.name
    const [ errors, setErrors ] = useState([])
    const [ date, setDate ] = useState('')
    const [ color, setColor ] = useState(false)
    // const [ validDate, setValidDate ] = useState(date)

    console.log('DATE', date)
    const today = new Date()
    // let validDate
    useEffect(() => {
        if (date && date.getTime() < today.getTime()) {
            setErrors(["Can't pick a day in the past!"])
        } else {
            // validDate = date
            setErrors([])
        }

    }, [date])

    // console.log('VALID DATE', validDate)

    return (
        <>
            <div className="appt-form-main">
                <div className="appt-form-container">
                    <div className="appt-form-title">
                        Set up an appointment with {studioName}
                    </div>
                    <div className="errors-tattoo-form">
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <form className="appt-form">
                        <div className="placement-size-container">
                            <div className="describe-tattoo-title">
                                Describe your tattoo
                            </div>
                            <select className="appt-form-placement-select">
                                <option value='' defaultValue>Placement</option>
                                <option value='Ankle'>Ankle</option>
                                <option value='Back - full'>Back - full</option>
                                <option value='Back - lower'>Back - lower</option>
                                <option value='Back - upper'>Back - upper</option>
                                <option value='Behind ear'>Behind ear</option>
                                <option value='Calf'>Calf</option>
                                <option value='Chest'>Chest</option>
                                <option value='Elbow'>Elbow</option>
                                <option value='Foot'>Foot</option>
                                <option value='Forearm - inner'>Forearm - inner</option>
                                <option value='Forearm - outer'>Forearm - outer</option>
                                <option value='Full sleeve'>Full sleeve</option>
                                <option value='Half sleeve'>Half sleeve</option>
                                <option value='Hand'>Hand</option>
                                <option value='Hip'>Hip</option>
                                <option value='Shoulder blade'>Shoulder blade</option>
                                <option value='Stomach'>Stomach</option>
                                <option value='Thigh - back'>Thigh - back</option>
                                <option value='Thigh - front'>Thigh - front</option>
                                <option value='Upper arm - inner'>Upper arm - inner</option>
                                <option value='Upper arm - outer'>Upper arm - outer</option>
                                <option value='Wrist'>Wrist</option>
                            </select>
                            <select className="appt-form-size-select">
                                <option value='' defaultValue>Size</option>
                                <option value='Small'>S - (2" x 2") Size of a credit card</option>
                                <option value='Medium'>M - (4" x 4") Palm-sized</option>
                                <option value='Large'>L - (6" x 6") Hand-sized</option>
                                <option value='Extra Large'>XL - (8" x 8") Half-sleeve or larger</option>
                                <option value="Don't know">Don't know</option>
                            </select>
                        </div>
                        <div className="description-color-container">
                            <div className="appt-description-textarea-container">
                                <div className="short-description">Short description</div>
                                <textarea
                                    className="appt-description-textarea"
                                    cols='40'
                                    rows='10'
                                    placeholder="Describe your tattoo here..."
                                />
                            </div>
                            <div className="appt-form-color-container">
                                <div className="appt-color-checkbox">
                                    <div className="color-input-field-text">
                                        Do you want color?
                                    </div>
                                    <div className="toggle-yes-no">
                                        <div className="yes-or-no">{color ? 'Yes' : 'No'}</div>
                                        <label className="color-toggle" htmlFor="colorToggle">
                                            <input
                                                className="color-toggle-input"
                                                type='checkbox'
                                                id='colorToggle'
                                                checked={color}
                                                onChange={() => setColor(!color)}
                                            />
                                            <div className="toggle-fill"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="appt-form-image-upload-container">
                            <div className="add-image-refs">Add image references</div>
                            <label>
                                <input
                                    type='file'
                                />
                            </label>
                        </div>
                        <div className="appt-form-date-container">
                            <div className="when-get">When do you want to get this tattoo?</div>
                            <Calendar
                                value={date}
                                onChange={setDate}
                            />
                        </div>
                        <button className="appt-form-submit-btn">Submit</button>
                    </form>
                </div>
                <div className="appt-form-page-image-container">
                    <img className="appt-form-page-image" src={formImage} alt='' />
                </div>
            </div>
        </>
    )
}
