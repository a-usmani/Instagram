import { useEffect, useReducer } from "react"
import { getUserPhotosByUserId } from '../../services/firebase'
import Header from "./header"
import Photos from "./photos"

export default function Profile(props){
    const reducer = (state, newState) => ({...state, ...newState})
    const initialState = {
        profile: {},
        photosCollection: null,
        followerCount: 0
    }

    const [{profile, photosCollection, followerCount}, dispatch] = useReducer(reducer, initialState)
    
    useEffect(() => {
        async function getProfileInfoAndPhotos() {
            const photos = await getUserPhotosByUserId(props.user.userId)
            dispatch({profile: props.user, photosCollection: photos, followerCount: props.user.followers.length})
        }

        getProfileInfoAndPhotos()
    }, [props.user.username])
    
    return (
        <>
            <Header
                photosCount={photosCollection ? photosCollection.length : 0}
                profile={profile}
                followerCount={followerCount}
                setFollowerCount={dispatch}
            />
            <Photos photos={photosCollection} />
        </>
    )
}