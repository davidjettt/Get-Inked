import GoogleMapReact from 'google-map-react'
import './Map.css'

export default function Map() {

    const defaultProps = {
        center: {
            lat: 40.73,
            lng: -73.93
        },
        zoom: 12
    }

    console.log('MAP RENDER')


    return (
        <div className='google-map'>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_MAP_API_KEY,
                    language: 'en'
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                // onChildMouseEnter={true}
                // onChildMouseLeave={true}
            >
            </GoogleMapReact>
        </div>
    )
}
