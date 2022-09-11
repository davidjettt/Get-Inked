const LOAD_REVIEWS = 'reviews/load'
const CREATE_REVIEW = 'reviews/create'
const UPDATE_REVIEW = 'reviews/update'
const DELETE_REVIEW = 'reviews/delete'

const loadAllReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

const createReview = (review) => {
    return {
        type: CREATE_REVIEW,
        review
    }
}

const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

const deleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        review
    }
}

export const loadAllReviewsThunk = () => async (dispatch) => {
    const response = await fetch('/api/reviews/')

    if (response.ok) {
        const data = await response.json()
        dispatch(loadAllReviews(data))
    }
}

export const createReviewThunk = (review) => async (dispatch) => {
    const response = await fetch('/api/reviews/', {
        method: 'POST',
        body: review
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(createReview(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

export const updateReviewThunk = (review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(updateReview(data))
    } else {
        const badData = await response.json()
        if (badData.errors) return badData.errors
    }
}

export const deleteReviewThunk = (review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteReview(review))
    }
}

const initialState = {}
export default function reviewsReducer(state = initialState, action) {
    let newState
    switch (action.type) {
        case LOAD_REVIEWS:
            newState = {}
            action.reviews.allReviews.forEach((review) => {
                newState[review.id] = review
            })
            return newState
        case CREATE_REVIEW:
            newState = JSON.parse(JSON.stringify(state))
            newState[action.review.review.id] = action.review.review
            return newState
        case UPDATE_REVIEW:
            newState = JSON.parse(JSON.stringify(state))
            newState[action.review.review.id] = action.review.review
            return newState
        case DELETE_REVIEW:
            newState = JSON.parse(JSON.stringify(state))
            delete newState[action.review.id]
            return newState
        default:
            return state
    }
}
