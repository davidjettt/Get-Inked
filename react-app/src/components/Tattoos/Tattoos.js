import axios from 'axios'
import { useState, useEffect } from 'react'
// import {  useSelector } from "react-redux";
import TextField from '../TextField/TextField';
import FilterButtons from './FilterButtons';
import SingleTattooModal from "./SingleTattooModal";
import './Tattoos.css'

export default function Tattoos() {
    let offset = 0
    const tattoosHeaderImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662605953/Tattoo-master-puts-tattoo-in-form-of-flower-on-arm-1296x728-header_qkrn6j.jpg'
    const [ tattoos, setTattoos ] = useState([])
    // const tattoos = useSelector(state => Object.values(state.tattoos))

    const loadMoreTattoos = () => {
        axios.get(`/api/tattoos/paginate?limit=20&offset=${offset}`)
            .then(({ data }) => {
                const newTattoos = []
                data.tats.forEach(tat => newTattoos.push(tat))
                setTattoos(prevTattoos => [...prevTattoos, ...newTattoos])
            })
        offset += 20
    }

    const handleScroll = (e) => {
        if (window.innerHeight + e.target.documentElement.scrollTop + 1 >= e.target.documentElement.scrollHeight) {
            loadMoreTattoos()
        }
    }

    useEffect(() => {
        loadMoreTattoos()
        window.addEventListener('scroll', handleScroll)
    },[])


    return (
        <div className="tattoos-page-main">
            <div className="tattoos-page-secondary">
                <div className='studios-page-header-container'>
                    <div className='header-text-container'>
                        <h3 className='header-text'>Find your inspiration</h3>
                    </div>
                    <img className='studio-page-header-image' src={tattoosHeaderImage} alt='tattoos-header'/>
                </div>
                {/* <div className='tattoos-page-header'>
                    <div style={{fontSize: 50, marginBottom: 15}}>
                        Explore Tattoos
                    </div>
                    <div className='filtering-inputs'>
                        <TextField setTattoos={setTattoos} loadMoreTattoos={loadMoreTattoos} offset={offset} /> */}
                        {/* <FilterButtons /> */}
                    {/* </div>
                </div> */}
                <div className="tattoo-cards-container-main">
                    {/* {tattoos.map((tattoo, idx) => (
                        <SingleTattooModal key={tattoo.id} tattooId={tattoo.id} />
                    ))} */}
                    {/* {!tattoos.length && <h1>We can't find what you are looking for...Try again!</h1>} */}
                    {tattoos.map((tattoo, idx) => {
                        if (idx % 2 === 0) {
                            return <SingleTattooModal fromTattoos={true} key={tattoo.id} tattooId={tattoo.id} small='small' />
                        } else {
                            return <SingleTattooModal fromTattoos={true} key={tattoo.id} tattooId={tattoo.id} medium='medium' />
                        }
                    }
                    )}
                </div>
            </div>
        </div>
    )
}
