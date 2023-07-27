import { useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import {memo} from 'react'
import { updateFollowedUserFollowers, updateLoggedInUserFollowing, getUserByUserId } from '../../services/firebase'
import LoggedInUserContext from '../../context/logged-in-user'

const suggestedProfile = (props) => {
    const [followed, setFollowed] = useState(false)
    const { setActiveUser } = useContext(LoggedInUserContext)

    async function handleFollowUser() {
        setFollowed(true);
        await updateLoggedInUserFollowing(props.docId, props.profileId, false)
        await updateFollowedUserFollowers(props.profileDocId, props.userId, false)
        const [user] = await getUserByUserId(props.userId);
        setActiveUser(user);
    
      }    

    return !followed ? (
            <div className='flex flex-row items-center align-items justify-between'>
                <div className='flex justify-between items-center'>
                    <img
                        className="rounded-full w-8 flex mr-3"
                        src={`/images/avatars/${props.profileUsername}.jpg`}
                        alt={`${props.profileUsername} profile`}
                        onError={(e) => {
                            e.target.src = '/images/avatars/default.png'
                        }}
                    />
                    <Link to={`/p/${props.profileUsername}`}>
                        <p className="font-bold text-sm">{props.profileUsername}</p>
                    </Link>
                </div>
                <button
                    className="text-xs font-bold text-blue-medium"
                    type="button"
                    onClick={handleFollowUser}
                >
                    Follow
                </button>
            </div>
        
    ) : null
}

export default memo(suggestedProfile)