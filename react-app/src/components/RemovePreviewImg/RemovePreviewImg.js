


export default function RemovePreviewImg({ idx, imgRefPreview, images }) {

    const removeImg = (e) => {
        // setErrors([])
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
