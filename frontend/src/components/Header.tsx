import { Link } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import SignOutButton from './SignOutButton'

const Header = () => {
    const { isLoggedIn } = useAppContext()
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl  text-white font-bold tracking-tight">
                    <Link to='/'>Holidays.com</Link>
                </span>
                <span className='flex space-x-2'>
                    {isLoggedIn ? <>
                        <Link to='/my-bookings' className="flex items-center text-white font-bold">My Bookings</Link>
                        <Link to='/my-hotels' className="flex items-center text-white font-bold">My Hotels</Link>
                         <SignOutButton />
                    </> :
                        <Link to='/sign-in' className="flex items-center px-3  font-bold text-blue-600
                    bg-white hover:bg-gray-300 rounded-full">Sign in</Link>
                    }

                </span>
            </div>
        </div>
    )
}

export default Header