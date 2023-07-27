import { useContext} from 'react'
import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import LoggedInUserContext from '../context/logged-in-user'
import Post from './post'

export default function Timeline(){
    const {user: loggedInUser } = useContext(LoggedInUserContext)
    const { photos } = usePhotos(loggedInUser)
    return (
        loggedInUser ? (
        <div className = " w-96 mt-12 resize-none justify-center lg:col-span-2 lg:mx-auto ">
            {loggedInUser.following === undefined ? (
                <Skeleton count={2} width={640} height={500} className="mb-5" />
            ) : loggedInUser.following.length===0 ? (
                <p className='flex justify-center font-bold'> Follow other users to view photos!</p>
            ) : photos ? (
                photos.map((photo) => <Post key={photo.docId} content={photo}/>)
            ) : null} 
        </div>) : null
    )
}