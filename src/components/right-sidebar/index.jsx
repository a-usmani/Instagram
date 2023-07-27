import { useContext } from 'react'
import LoggedInUserContext from '../../context/logged-in-user';
import User from "./user"
import Suggestions from "./suggestions"

export default function Sidebar(){
    const {user: loggedInUser} = useContext(LoggedInUserContext) 

    return (loggedInUser ? (
        <div className="p-4 mt-8 ">
            <User username={loggedInUser.username} fullName={loggedInUser.fullName} />
            <Suggestions userId={loggedInUser.userId} following={loggedInUser.following} docId={loggedInUser.docId}/>
        </div>) : (
            <>
            </>
        ))
}