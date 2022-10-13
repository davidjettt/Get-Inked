import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createApptThunk, getOneAppointmentThunk, postAppointmentImageThunk } from "../../store/appointments";
import Calendar from 'react-calendar'
import './ReactCalendar.css'
import './AppointmentForm.css'
import plusSign from '../../Images/plus-sign.svg'
import RemovePreviewImg from "../RemovePreviewImg/RemovePreviewImg";
import LoadingBackdrop from "../Backdrop/Backdrop";

export default function AppointmentForm() {
    const history = useHistory()
    const dispatch = useDispatch()
    const { studioId } = useParams()
    // const formImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1663128799/5804024663e1ddff8e125720c07b87f2_oocxlo.jpg'
    const appts = useSelector(state => Object.values(state.appointments).map(appt => new Date(appt.origDateFormat).getTime()))
    // const appts = useSelector(state => Object.values(state.appointments).map(appt => appt.origDateFormat))
    const studio = useSelector(state => state.studios[+studioId])
    const studioName = studio.name
    const [ placement, setPlacement ] = useState('')
    const [ size, setSize ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ color, setColor ] = useState(false)
    const [ imgRefPreview, setImgRefPreview ] = useState([])
    const [ images, setImages ] = useState([])
    const [ date, setDate ] = useState(null)
    const [ errors, setErrors ] = useState([])
    const [ loading, setLoading ] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const today = new Date()
        if (!date) {
            setErrors(['Date is required'])
        }
        else if (date.getTime() < today.getTime()) {
            setErrors(["Appointment must be a day in the future!"])
        }
        else if (imgRefPreview.length < 1) {
            setErrors(['At least one image reference is required.'])
        }
        else {
            const formData = new FormData()
            formData.append('placement', placement)
            formData.append('size', size)
            formData.append('color', color)
            formData.append('description', description)
            formData.append('date', date.toUTCString())
            formData.append('studio_id', studioId)

            setLoading(true)
            const data = await dispatch(createApptThunk(formData))
            if (data.errors) {
                setErrors(data.errors)
                setLoading(false)
            } else {
                const imageData = new FormData()
                images.forEach(image => imageData.append('ref_images', image))
                const badData = await dispatch(postAppointmentImageThunk(imageData, data.appt.appointment.id))
                if (badData) {
                    setErrors(badData)
                    setLoading(false)
                }
                else {
                    await dispatch(getOneAppointmentThunk(data.appt.appointment.id))
                    history.push(`/studios/${studio.id}`)
                }
            }
        }
    }

    function isImgUrl(url) {
        const img = new Image();
        img.src = url;
        return new Promise((resolve) => {
            img.onerror = () => resolve(false);
            img.onload = () => resolve(true);
        });
    }

    const updateImgRef = async (e) => {
        setErrors([])
        const file = e.target.files[0]
        if (file) {
            if (await isImgUrl(URL.createObjectURL(file)) ) {
                // const test = document.getElementById('blah')

                if (imgRefPreview.length < 3) {
                    // test.src = URL.createObjectURL(file)
                    setImgRefPreview([...imgRefPreview, URL.createObjectURL(file)])
                    setImages([...images, file])
                } else {
                    setErrors(['Max 3 images'])
                }
            } else {
                setErrors(['Invalid image file type'])
            }
        }
    }

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
                    <form onSubmit={handleSubmit} className="appt-form">
                        <div className="placement-size-container">
                            <div className="describe-tattoo-title">
                                Describe your tattoo
                            </div>
                            <select className="appt-form-placement-select" value={placement} onChange={(e) => setPlacement(e.target.value)}>
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
                            <select className="appt-form-size-select" value={size} onChange={(e) => setSize(e.target.value)}>
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
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
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
                            <div className="file-input-images-container">
                                <label className='image-file-label'>
                                    <img className="plus-sign" src={plusSign} alt='plus sign' />
                                    <input
                                        className="image-file-input"
                                        id='image-input'
                                        type='file'
                                        multiple
                                        onChange={updateImgRef}
                                    />
                                </label>
                                {imgRefPreview.map((img, idx) => (
                                    <div className="appt-form-image-container" key={idx}>
                                        <img className="appt-form-image" id='blah' src={img} alt=''/>
                                        <RemovePreviewImg idx={idx} imgRefPreview={imgRefPreview} images={images} setImages={setImages} setImgRefPreview={setImgRefPreview} />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="appt-form-date-container">
                            <div className="when-get">When do you want to get this tattoo?</div>
                            <Calendar
                                value={date}
                                onChange={setDate}
                                minDetail='year'
                                minDate={new Date()}
                                tileDisabled={({date}) => appts.includes(date.getTime())}
                            />
                        </div>
                        <button type='submit' className="appt-form-submit-btn">Submit</button>
                    </form>
                </div>
                <div className="appt-form-page-image-container">
                    {/* <img className="appt-form-page-image" src={formImage} alt='' /> */}
                </div>
            </div>
            {loading && <LoadingBackdrop />}
        </>
    )
}
