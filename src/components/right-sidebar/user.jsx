import {Link} from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import {memo} from 'react'

const User = (props) => {
    return !props.username || !props.fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/p/${props.username}`} className='grid grid-cols-4 gap-4 mb-6 items-center'>
            <div className='flex justify-between col-span-1'>
                <img
                    className="rounded-full w-16 flex mr-3"
                    src={`/images/avatars/${props.username}.jpg`}
                    alt={`${props.username} profile`}
                    onError={(e) => {
                        e.target.src = '/images/avatars/default.png'
                    }}
                />
            </div>
            <div className='col-span-3'>
                <p className="font-bold text-sm">{props.username}</p>
                <p className="text-sm">{props.fullName}</p>
            </div>
            </Link>
    )
}

export default memo(User)
