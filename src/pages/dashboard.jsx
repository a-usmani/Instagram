import { useEffect } from "react"
import Header from "../components/header"
import Timeline from "../components/timeline"
import InfoBar from "../components/left-sidebar"
import Sidebar from "../components/right-sidebar/index"
import LoggedInUserContext from "../context/logged-in-user"
import useUser from "../hooks/use-user"
//dashboard/timeline - main page
export default function Dashboard(props){
    const { user: user, setActiveUser } = useUser(props.user?.uid)

    useEffect(() => {
        document.title = 'Instagram'
    }, [])

    return (
        <LoggedInUserContext.Provider value={{user, setActiveUser}}>
            <div className="bg-white">
                <div className="sm:hidden">
                    <Header />
                </div>
                <div className="flex">
                    <div className="hidden sm:block">
                        <InfoBar />
                    </div>
                    <div className="justify-between mx-auto max-w-screen-xl lg:hidden">
                        <Timeline />
                    </div>
                    <div className="grid grid-cols-3 gap-4 justify-center mx-auto max-w-screen-lg hidden lg:grid">
                        <Timeline />
                        <Sidebar />
                    </div>
                </div>
            </div>
        </LoggedInUserContext.Provider>
    )
}