import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';
import  * as ROUTES from '../../constants/routes';
import useUser from '../../hooks/use-user';


export default function InfoBar(){
    const {firebase} = useContext(FirebaseContext)
    const {user: user } = useContext(UserContext)
    const {user: loggedInUser} = useUser(user?.uid)
    const [isXlScreen, setIsXlScreen] = useState(false);

    const checkIfXlScreen = () => {
        const currentWidth = window.innerWidth;
        setIsXlScreen(currentWidth >= 1280);
    }
    

    useEffect(() => {
        checkIfXlScreen()
        window.addEventListener('resize', checkIfXlScreen)
        
        return () => {
          window.removeEventListener('resize', checkIfXlScreen)
        }
    }, [])

    return <div className='w-18 bg-white border-r border-gray-primary h-screen sticky top-0 xl:w-80'>
                <div className="container  ">
                    <div className="flex flex-col justify-between  ">
                        <div className='text-grey-700 text-center flex flex-col align-items ml-2 mr-2 space-y-2.5'>
                            {user ? (
                                <>
                                    <Link to={ROUTES.DASHBOARD} className='mt-9 mb-7 ml-1 p-2 relative'>
                                        <svg xmlns="http://www.w3.org/2000/svg" 
                                        className="transition ease-in-out delay-150 hover:scale-105 w-6 mb-0  cursor-pointer transition-opacity ease-in duration-700 opacity-100 xl:opacity-0 absolute top-0 left-2" 
                                        viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                        <div className='transition-opacity ease-in opacity-0 xl:opacity-100 absolute top-0 left-2 flex flex-row'>
                                            <h2 className='font-bold mr-1'>NOT</h2>
                                            <img src="/images/logo.png" alt="Instagram" className='w-4/12  duration-700 ' />
                                        </div>
                                    </Link>
                                    <Link to={ROUTES.DASHBOARD} aria-label='Dashboard' className='flex group hover:bg-gray-press p-2 rounded-md'>
                                        <svg
                                            className="flex group-hover:scale-105 transition ease-in-out delay-150  w-8 text-black-light cursor-pointer"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                        {isXlScreen ? (
                                            <span className='flex pt-1 ml-3 text-lg'>Home</span>
                                        ): null}
                                    </Link>

                                    <button 
                                        type='button'
                                        title='Sign out'
                                        className='flex group hover:bg-gray-press p-2 rounded-md'
                                        onClick={() => {
                                            firebase.auth().signOut()
                                            window.location.reload(false)
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === 'Enter') {
                                                firebase.auth().signOut()
                                            }
                                        }}
                                    >
                                        <svg
                                            className="flex group-hover:scale-105 transition ease-in-out delay-150  w-8 text-black-light cursor-pointer"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                        {isXlScreen ? (
                                            <span className='flex pt-1 ml-3 text-lg'>Sign out</span>
                                        ): null}
                                    </button>
                                    {user && (
                                        <div className="flex items-center cursor-pointer group hover:bg-gray-press p-2 rounded-md">
                                            <Link to={`/p/${loggedInUser?.username}`} className='flex '>
                                            <img
                                                className="flex group-hover:scale-105 transition ease-in-out delay-150 rounded-full h-8 w-8 flex"
                                                src={`/images/avatars/${loggedInUser?.username}.jpg`}
                                                alt={`${loggedInUser?.username} profile`}
                                                onError={(e) => {
                                                    e.target.src = '/images/avatars/default.png'
                                                }}
                                            />
                                            {isXlScreen ? (
                                                <span className='flex pt-1 ml-3 text-lg'>Profile</span>
                                            ): null}
                                            </Link>
                                        </div>
                                    )}
                                </>
                            ) : (null)
                            }
                        </div>
                    </div>
                </div>
            </div>
}