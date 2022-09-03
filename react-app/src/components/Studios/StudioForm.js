import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStudioThunk, updateStudioThunk } from "../../store/studios";


export default function StudioForm({ studio, formType }) {
    console.log('STUDIO', studio)
    const dispatch = useDispatch()
    const history = useHistory()
    const [ name, setName ] = useState(studio?.name || '')
    const [ description, setDescription ] = useState(studio?.description || '')
    const [ headerImage, setHeaderImage ] = useState(studio?.headerImage || '')
    const [ tattooStyle, setTattooStyle ] = useState('')
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
        formData.append('tattoo_style', tattooStyle)

        // console.log('FORM DATA', formData)
        // for (var [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        if (formType === 'Update Studio') {
            const badData = await dispatch(updateStudioThunk(formData, studio.id))
            if (badData) {
                setErrors([badData])
            } else {
                history.push('/studios')
            }
        }
        else {
            const badData = await dispatch(createStudioThunk(formData))
            // console.log('BAD DATA', badData)
            if (badData) {
                setErrors([badData])
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

    const updateHeaderImage = (e) => {
        const file = e.target.files[0];
        // console.log('FILE', file)
        setHeaderImage(file);

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                // console.log('READER RESULT', reader.result)
                setHeaderPreview(reader.result)
            }
        }
        // console.log('FILES', e.target.files)
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
    }
    const updateAvatarImage = (e) => {
        const file = e.target.files[0];
        // console.log('AVATAR FILE', file)
        setAvatar(file);

        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                // console.log('READER RESULT', reader.result)
                setAvatarPreview(reader.result)
            }
        }
        // console.log('FILES', e.target.files)
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
    }



    return (
        <>
            <form className="studio-form" onSubmit={handleSubmit}>
                <div>
                    {formType === 'Update Studio' ?
                    <h1>Update Studio</h1> :
                    <h1>Create a Studio</h1>}
                </div>
                <div>
                    {errors.length > 0 && errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                    <div className="studio-form-avatar-container">
                        <input
                            name='avatar'
                            type="file"
                            accept="image/*"
                            onChange={updateAvatarImage}
                        />
                        <div style={{width: 100, height: 100}}>
                            {avatarPreview && <img style={{width: '100%'}} src={avatarPreview} alt='' />}
                        </div>
                    </div>
                    <div className="studio-name-container">
                        <input name='name' type='text' placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="studio-description-container">
                        <textarea name='description' className="studio-description-textarea" cols='50' rows='15' placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="studio-header-upload-container">
                        <input
                            name='header'
                            type="file"
                            accept="image/*"
                            onChange={updateHeaderImage}
                        />
                        <div style={{width:100, height:100}}>
                            {headerPreview && <img style={{width: '100%'}} src={headerPreview} alt='' />}
                        </div>
                    </div>
                    <div className="studio-tattoo-style-container">
                        <input name='tattoo_style' type='text' placeholder='tattoo style' value={tattooStyle} onChange={(e) => setTattooStyle(e.target.value)} />
                    </div>
                    <div className="studio-location-container">
                        <input name='address' type='text' placeholder='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        <input name='city' type='text' placeholder='city' value={city} onChange={(e) => setCity(e.target.value)} />
                        <select name='state' value={state} onChange={(e) => setState(e.target.value)}>
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
                            <input placeholder="Zip Code" type='text' value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                        </div>
                    </div>
                    <div className="studio-form-button-container">
                        <button>Create</button>
                    </div>
            </form>
        </>
    )
}
