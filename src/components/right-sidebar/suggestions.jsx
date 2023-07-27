import { useState, useEffect} from 'react'
import Skeleton from 'react-loading-skeleton'
import {getSuggestedProfiles} from '../../services/firebase'
import SuggestedProfile from './suggested-profile'

export default function Suggestions(props) {
    const [profiles, setProfiles] = useState(null)

    useEffect (()=>{
        async function suggestedProfiles (){
            const render = await getSuggestedProfiles(props.userId, props.following)
            setProfiles(render)
        }

        if (props.userId) {
            suggestedProfiles()
        }
    }, [props.userId])

    return !profiles ? (
        <Skeleton count={1} height={150} className="mt-5" />
    ) : (
        <div className="rounded flex flex-col">
            <div className='text-sm flex items-center align-items justify-between mb-2'>
                <p className="font-bold text-gray-base">Suggestions for you</p>
            </div> 
            <div className='mt-4 grid gap-5'>
                {profiles.map((profile) => (
                    <SuggestedProfile
                        key={profile.docId}
                        profileDocId={profile.docId}
                        profileUsername={profile.username}
                        profileId={profile.userId}
                        userId={props.userId}
                        docId={props.docId}
                    />
                ))}
            </div>
        </div>
    )
}