import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to='/'>Holidays.com</Link>
                </span>
                <span className='flex space-x-2'>
                    <Link to='/sign-in' className="flex items-center px-3  font-bold text-blue-600
                    bg-white hover:bg-gray-300 rounded-full">Sign in</Link>
                </span>
            </div>
        </div>
    )
}

export default Header