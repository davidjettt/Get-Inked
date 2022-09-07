import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStudioThunk, updateStudioThunk } from "../../store/studios";
import './StudioFormPage.css'

export default function StudioForm({ studio, formType }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [ name, setName ] = useState(studio?.name || '')
    const [ description, setDescription ] = useState(studio?.description || '')
    const [ headerImage, setHeaderImage ] = useState(studio?.headerImage || '')
    // const [ tattooStyle, setTattooStyle ] = useState('')
    const [ avatar, setAvatar ] = useState(studio?.avatar || '')
    const [ address, setAddress ] = useState(studio?.address || '')
    const [ city, setCity ] = useState(studio?.city || '')
    const [ state, setState ] = useState(studio?.state || '')
    const [ zipCode, setZipCode ] = useState(studio?.zipCode || '')
    const [ headerPreview, setHeaderPreview ] = useState(null)
    const [ avatarPreview, setAvatarPreview ] = useState(null)
    const [ errors, setErrors ] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        const formData = new FormData()
        formData.append('header_image', headerImage)
        formData.append('avatar', avatar)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('address', address)
        formData.append('city', city)
        formData.append('state', state)
        formData.append('zip_code', zipCode)
        // formData.append('tattoo_style', tattooStyle)

        // console.log('FORM DATA', formData)
        // for (var [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        if (formType === 'Update Studio') {
            const badData = await dispatch(updateStudioThunk(formData, studio.id))
            if (badData) {
                setErrors(badData)
            } else {
                history.push('/studios')
            }
        }
        else {
            const badData = await dispatch(createStudioThunk(formData))
            // console.log('BAD DATA', badData)
            if (badData) {
                setErrors(badData)
            } else {
                history.push('/studios')
            }
        }
        // console.log('FORMDATA', formData)
        // console.log('DATA', payload)

        // const badData = await dispatch(createStudioThunk(payload))
        // if (badData) {
        //     console.log('ERRORS', badData)
        // }
    }

    const isImage = (url) => {
        return /\.(jpg|jpeg|png|webp|gif|pdf)$/.test(url);
    }

    const updateHeaderImage = (e) => {
        setErrors([])
        const file = e.target.files[0];
        // console.log('FILE', file)
        // setHeaderImage(file);

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                // console.log('READER RESULT', reader.result)
                if (isImage(file.name)) {
                    setHeaderPreview(reader.result)
                    setHeaderImage(file);
                } else {
                    setErrors(['Not a valid header image file type'])
                }
            }
        }
        // console.log('FILES', e.target.files)
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
    }
    const updateAvatarImage = (e) => {
        setErrors([])
        const file = e.target.files[0];
        // console.log('AVATAR FILE', file)
        // console.log('IS IMAGE TEST', isImage(file.name))
        // setAvatar(file);

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                // console.log('READER RESULT', reader.result)
                if (isImage(file.name)) {
                    setAvatarPreview(reader.result)
                    setAvatar(file);
                } else {
                    setErrors(['Not a valid avatar image file type'])
                }
            }
        }
        // console.log('FILES', e.target.files)
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
    }



    return (
        <div className="studio-form-container">
            <form className="studio-form" onSubmit={handleSubmit}>
                <div>
                    {formType === 'Update Studio' ?
                    <h1>Update Studio</h1> :
                    <h1>Create a Studio</h1>}
                </div>
                <div className="studio-all-fields-required">
                    All fields are required.
                </div>
                <div className="errors-studio-form">
                    {errors.length > 0 && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                    <div className="studio-form-avatar-container">
                        <label className="studio-form-custom-file-upload-avatar">
                            <input
                                className="studio-form-avatar-input"
                                name='avatar'
                                type="file"
                                accept="image/*"
                                onChange={updateAvatarImage}
                            />
                            Select an avatar image
                        </label>
                        <div className="studio-form-avatar-preview-container">
                            {avatarPreview && <img className="studio-form-avatar-preview" src={avatarPreview} alt='' />}
                        </div>
                    </div>
                    <div className="studio-name-container">
                        <label className="custom">
                            <input name='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                            <span className="placeholder">Name</span>
                        </label>
                    </div>
                    <div className="studio-description-container">
                        <label className="custom-textarea">
                            <textarea placeholder="Studio description here..." name='description' className="studio-description-textarea" cols='59' rows='10' value={description} onChange={(e) => setDescription(e.target.value)} />
                            {/* <span className="placeholder-textarea">Description</span> */}
                        </label>
                    </div>
                    <div className="studio-header-upload-container">
                        <label className="studio-form-custom-file-upload">
                            <input
                                className="studio-form-avatar-input"
                                name='header'
                                type="file"
                                accept="image/*"
                                onChange={updateHeaderImage}
                            />
                            Select a header image
                        </label>
                        <div className="studio-form-header-preview-container">
                            {headerPreview && <img className="studio-form-header-preview" src={headerPreview} alt='' />}
                        </div>
                    </div>
                    {/* <div className="studio-tattoo-style-container">
                        <input name='tattoo_style' type='text' placeholder='tattoo style' value={tattooStyle} onChange={(e) => setTattooStyle(e.target.value)} />
                    </div> */}
                    <div className="studio-form-location-container">
                        <div>
                            <label className="custom">
                                <input name='address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
                                <span className="placeholder">Address</span>
                            </label>
                        </div>
                        <div>
                            <label className="custom">
                                <input name='city' type='text' value={city} onChange={(e) => setCity(e.target.value)} />
                                <span className="placeholder">City</span>
                            </label>
                        </div>
                        <select className="state-select-field" name='state' value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="none" defaultValue>Select a State</option>
                            <option value="Alabama">AL</option>
                            <option value="Alaska">AK</option>
                            <option value="Arizona">AZ</option>
                            <option value="Arkansas">AR</option>
                            <option value="California">CA</option>
                            <option value="Colorado">CO</option>
                            <option value="Connecticut">CT</option>
                            <option value="Delaware">DE</option>
                            <option value="Florida">FL</option>
                            <option value="Georgia">GA</option>
                            <option value="Hawaii">HI</option>
                            <option value="Idaho">ID</option>
                            <option value="Illinois">IL</option>
                            <option value="Indiana">IN</option>
                            <option value="Iowa">IA</option>
                            <option value="Kansas">KS</option>
                            <option value="Kentucky">KY</option>
                            <option value="Louisiana">LA</option>
                            <option value="Maine">ME</option>
                            <option value="Maryland">MD</option>
                            <option value="Massachusetts">MA</option>
                            <option value="Michigan">MI</option>
                            <option value="Minnesota">MN</option>
                            <option value="Mississippi">MS</option>
                            <option value="Missouri">MO</option>
                            <option value="Montana">MT</option>
                            <option value="Nebraska">NE</option>
                            <option value="Nevada">NV</option>
                            <option value="New Hampshire">NH</option>
                            <option value="New Jersey">NJ</option>
                            <option value="New Mexico">NM</option>
                            <option value="New York">NY</option>
                            <option value="North Carolina">NC</option>
                            <option value="North Dakota">ND</option>
                            <option value="Ohio">OH</option>
                            <option value="Oklahoma">OK</option>
                            <option value="Oregon">OR</option>
                            <option value="Pennsylvania">PA</option>
                            <option value="Rhode Island">RI</option>
                            <option value="South Carolina">SC</option>
                            <option value="South Dakota">SD</option>
                            <option value="Tennessee">TN</option>
                            <option value="Texas">TX</option>
                            <option value="Utah">UT</option>
                            <option value="Vermont">VT</option>
                            <option value="Virgin Islands">VI</option>
                            <option value="Virginia">VA</option>
                            <option value="Washington">WA</option>
                            <option value="West Virginia">WV</option>
                            <option value="Wisconsin">WI</option>
                            <option value="Wyoming">WY</option>
                        </select>
                        <div className="studio-form-zipcode-container">
                            <label className="custom">
                                <input type='text' value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                <span className="placeholder">Zip Code</span>
                            </label>
                        </div>
                    </div>
                    <div className="studio-form-button-container">
                        <button className="studio-form-button">{formType ? formType : 'Create Studio'}</button>
                    </div>
            </form>
        </div>
    )
}
