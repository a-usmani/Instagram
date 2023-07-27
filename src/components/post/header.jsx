import { formatDistance } from "date-fns"
import { Link } from 'react-router-dom'

export default function Header(props) {
  return (
    <div className="flex  h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${props.username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={`/images/avatars/${props.username}.jpg`}
            alt={`${props.username} profile picture`}
            onError={(e) => {
                e.target.src = '/images/avatars/default.png'
            }}
          />
          <p className="flex font-bold mr-1">{props.username}</p>
        </Link>
        <span className="flex items-center text-gray-base uppercase text-xs">
          •  {formatDistance(props.posted, new Date())} ago
        </span>
      </div>
    </div>
  )
}
