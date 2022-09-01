import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createStudio, createStudioThunk, updateStudio } from "../../store/studios";


export default function StudioForm({ studio, formType }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [ name, setName ] = useState(studio?.name || '')
    const [ description, setDescription ] = useState(studio?.description || '')
    const [ headerImage, setHeaderImage ] = useState(studio?.headerImage || '')
    const [ tattooStyle, setTattooStyle ] = useState('')
    const [ avatar, setAvatar ] = useState('')
    const [ address, setAddress ] = useState(studio?.address || '')
    const [ city, setCity ] = useState(studio?.city || '')
    const [ state, setState ] = useState(studio?.state || '')
    const [ headerPreview, setHeaderPreview ] = useState(null)
    const [ avatarPreview, setAvatarPreview ] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            'avatar': avatar,
            'name': name,
            'description': description,
            'header_image': headerImage,
            'tattoo_style': tattooStyle,
            'address': address,
            'city': city,
            'state': state
        }
        const formData = new FormData()
        formData.append('header_image', headerImage)
        formData.append('avatar', avatar)
        formData.append('name', name)
        formData.append('description', description)
        formData.append('address', address)
        formData.append('city', city)
        formData.append('state', state)

        if (formType === 'Update Studio') {
            const response = await fetch(`/api/studios/${studio.id}`, {
                method: 'PUT',
                body: formData
            })
            if (response.ok) {
                const data = await response.json()
                dispatch(updateStudio(data))
            }
        }
        else {
            const res = await fetch('/api/studios/', {
                method: 'POST',
                body: formData
            })
            if (res.ok) {
                const data = await res.json()
                dispatch(createStudio(data))
            }
        }
        // console.log('FORMDATA', formData)
        // console.log('DATA', payload)

        // const badData = await dispatch(createStudioThunk(payload))
        // if (badData) {
        //     console.log('ERRORS', badData)
        // }
        history.push('/studios')
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
        reader.readAsDataURL(e.target.files[0])
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
        reader.readAsDataURL(e.target.files[0])
    }



    return (
        <>
            <form className="studio-form" onSubmit={handleSubmit}>
                <div>
                    {formType === 'Update Studio' ?
                    <h1>Update Studio</h1> :
                    <h1>Create a Studio</h1>}
                </div>
                    <div className="studio-form-avatar-container">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={updateAvatarImage}
                        />
                        <div style={{width: 100, height: 100}}>
                            <img style={{width: '100%'}} src={avatarPreview} alt='avatar' />
                        </div>
                    </div>
                    <div className="studio-name-container">
                        <input type='text' placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="studio-description-container">
                        <textarea className="studio-description-textarea" cols='50' rows='15' placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="studio-header-upload-container">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={updateHeaderImage}
                        />
                        <div style={{width:100, height:100}}>
                            <img style={{width: '100%'}} src={headerPreview} alt='header' />
                        </div>
                    </div>
                    <div className="studio-tattoo-style-container">
                        <input type='text' placeholder='tattoo style' value={tattooStyle} onChange={(e) => setTattooStyle(e.target.value)} />
                    </div>
                    <div className="studio-location-container">
                        <input type='text' placeholder='address' value={address} onChange={(e) => setAddress(e.target.value)} />
                        <input type='text' placeholder='city' value={city} onChange={(e) => setCity(e.target.value)} />
                        <select value={state} onChange={(e) => setState(e.target.value)}>
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
                    </div>
                    <div className="studio-form-button-container">
                        <button>Create</button>
                    </div>
            </form>
        </>
    )
}
