import { useEffect } from "react"
import InfoBar from "../components/left-sidebar"
//not found page for invalid url
export default function NotFound() {
    useEffect(() => {
        document.title = 'Not Found - Instagram'
    }, [])

    return (
        <div className="flex bg-gray-background">
            <InfoBar />
            <div className="justify-between mx-auto max-w-screen-xl">
                <p className="text-center text-2xl m-8">Sorry, this page isn't available.</p>
                <p className="text-center text-md m-8">The link you followed may be broken, or the page may have been removed. Go back to Instagram.</p>
            </div>
        </div>
    )
}