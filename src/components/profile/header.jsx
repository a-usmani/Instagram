import useUser from "../../hooks/use-user"
import UserContext from "../../context/user"
import { useContext, useState, useEffect } from "react"
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase'
import Skeleton from "react-loading-skeleton"

export default function Header(props){
    const {user: loggedInUser } = useContext(UserContext)
    const {user: user} = useUser(loggedInUser?.uid)
    const [isFollowingProfile,setIsFollowingProfile] = useState(null)
    const followBtn = user?.username !== props.profile.username
    
    const handleToggleFollow = async() => {
        setIsFollowingProfile(x => !x)
        props.setFollowerCount({followerCount: isFollowingProfile ? props.followerCount -1 : props.followerCount +1})
        await toggleFollow(isFollowingProfile, user.docId, props.profile.docId, user.userId, props.profile.userId)
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, props.profile.userId)
            setIsFollowingProfile(!!isFollowing)
        }

        if (user?.username && props.profile.userId){
            isLoggedInUserFollowingProfile()
        }
    }, [user?.username, props.profile.userId])

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center items-center">
                  {props.profile.username ? (
                    <img
                        className="rounded-full h-40 w-40 flex"
                        src={`/images/avatars/${props.profile.username}.jpg`}
                        alt={`${props.profile.fullName} profile`}
                        onError={(e) => {
                            e.target.src = '/images/avatars/default.png'
                        }}
                    />
                ) : (
                    <Skeleton circle height={150} width={150} count={1} />
                )}
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{props.profile.username}</p>
                    {followBtn && isFollowingProfile === null ? (
                        <Skeleton count={1} width={80} height={32} />
                    ) : followBtn && (
                        <button
                            className={`bg-blue-medium font-bold text-sm rounded-md text-white w-20 h-8 hover:bg-blue-press`}
                            type="button"
                            onClick={handleToggleFollow}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                  handleToggleFollow();
                                }
                              }}
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                    {!props.profile.followers || !props.profile.following ? (
                        <Skeleton count={1} width={677} height={24} />
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{props.photosCount}</span> posts
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{props.followerCount}</span>
                                {' '}
                                {props.followerCount === 1 ? 'follower' : 'followers'}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{props.profile.following?.length}</span> following
                            </p>
                        </>
                    )}
                </div>
                <div className="container mt-4">
                    <p className="font-medium">{!props.profile.fullName ? <Skeleton count={1} height={24} /> : props.profile.fullName}</p>
                </div>
            </div>
        </div>
    )
}