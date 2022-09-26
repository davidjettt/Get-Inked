
import xImg from '../../Images/image-remove-x.svg'


export default function RemovePreviewImg({ idx, imgRefPreview, images, setImages, setImgRefPreview }) {
    const removeImg = () => {
        const imgRefPreviewCopy = imgRefPreview.slice()
        const imagesCopy = images.slice()
        imgRefPreviewCopy.splice(idx, 1)
        imagesCopy.splice(idx, 1)

        setImgRefPreview(imgRefPreviewCopy)
        setImages(imagesCopy)
    }

    return (
        <>
            <img className="remove-image-btn" src={xImg} onClick={removeImg} alt='x' />
        </>
    )
}
