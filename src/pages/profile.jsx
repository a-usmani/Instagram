import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate  } from "react-router-dom"
import { getUserByUsername } from "../services/firebase"
import Header from '../components/header'
import UserProfile from '../components/profile'
import InfoBar from "../components/left-sidebar"
import useUser from "../hooks/use-user"
import UserContext from "../context/user"
//profile page - changes depending if logged in user is the same as the user profile
export default function Profile(){
    const {username} = useParams()
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const {user: getUser } = useContext(UserContext)
    const {user: loggedInUser} = useUser(getUser?.uid)

    useEffect(() => {
        async function checkUserExists() {
            const [user] = await getUserByUsername(username)
            if (user?.userId){
                setUser(user)
            } else {
                navigate("/not-found")
            }
        }
        
        checkUserExists()
    },[username, navigate])
    return(user?.username ? (loggedInUser ? (
        <div className="bg-white sm:mr-4">
            <div className="sm:hidden">
                    <Header />
                </div>
                <div className="flex">
                    <div className="hidden sm:block mr-4">
                        <InfoBar />
                    </div>
                    <div className="mx-auto mt-12 max-w-screen-lg">
                        <UserProfile user={user} />
                    </div>
                </div>
        </div>
        ) : (
            <div className="bg-gray-background ">
                <Header />
                <div className="mx-auto mt-12 max-w-screen-lg">
                    <UserProfile user={user} />
                </div>
            </div>
        )
    ) : null)
}