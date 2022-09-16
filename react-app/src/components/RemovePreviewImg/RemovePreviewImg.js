


export default function RemovePreviewImg({ idx, imgRefPreview, images }) {

    const removeImg = () => {
        // setErrors([])
        imgRefPreview.splice(idx, 1)
        images.splice(idx, 1)
    }

    return (
        <>
            <button type='text' className="remove-image-btn" onClick={removeImg}>X</button>
        </>
    )
}
