import { useSelector } from "react-redux"


export default function HomePage() {
    const mainHomePageImage = 'https://res.cloudinary.com/dtjyf5kpn/image/upload/v1662018933/Stefanie_6-e1619631407239_e0wz9n_653ea0-landscape.jpg'
    const sessionUser = useSelector(state => state.session.user)

    return (
        <>
            {sessionUser && <div>
                <img src={mainHomePageImage} alt='traditional-japanese-tattoos-girl' />
            </div>}
        </>
    )
}