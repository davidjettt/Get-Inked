
import xImg from '../../Images/image-remove-x.svg'


export default function RemovePreviewImg({ idx, imgRefPreview, images }) {
    const removeImg = (e) => {
        // e.preventDefault()
        imgRefPreview.splice(idx, 1)
        images.splice(idx, 1)
    }

    return (
        <>
            <button className="remove-image-btn" onClick={removeImg}>X</button>
        </>
    )
}
