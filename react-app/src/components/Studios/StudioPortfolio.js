import axios from 'axios'
import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import SingleTattooModal from "../Tattoos/SingleTattooModal"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function StudioPortfolio({ studioId }) {
    let pageNum = 1
    let size = 6
    const [ page, setPage ] = useState(1)
    const [ tattoos, setTattoos ] = useState([])
    const numTattoos = useSelector(state => Object.values(state.tattoos)
                    .filter(tattoo => +studioId === +tattoo.studioId)).length
    const numPages = Math.ceil(numTattoos / 6)

    const handlePageChange = (e, value) => {
        setPage(value)
        pageNum = value
        loadTattoos()
    }

    const loadTattoos = () => {
        axios.get(`/api/studios/${studioId}?page=${pageNum}&size=${size}`)
            .then(({ data }) => {
                const newTattoos = []
                data.studioTattoos.forEach(tatt => newTattoos.push(tatt))
                setTattoos([...newTattoos])
            })
    }

    useEffect(() => {
        loadTattoos()
        setPage(1)
    }, [numTattoos])


    return (
        <>
            <div className="studio-portfolio-main">
                {tattoos.map((tattoo) => (
                    <SingleTattooModal studioPortfolio={true} key={tattoo.id} tattooId={tattoo.id} />
                ))}
            </div>
            <div style={{marginTop: 10}}>
                <Stack spacing={5}>
                    <Pagination count={numPages} page={page} onChange={handlePageChange} size="large" />
                </Stack>
            </div>
        </>
    )
}
