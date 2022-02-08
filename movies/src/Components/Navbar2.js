import React from 'react';
import { Link } from 'react-router-dom'

function Navbar2() {
    return (
        <div className='flex items-center space-x-8 px-12 py-4 border-b-[1px]'>
            <Link to="/" className='flex items-center'>
                {/* <Link to="/"> */}
                <img src="https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-movie-call-to-action-bearicons-blue-bearicons.png" /> <span className='ml-4 font-bold text-blue-400 text-xl md:text-3xl'>Movies</span>
                {/* </Link> */}
            </Link>
            <Link to="/Favourites" className='font-bold text-xl md:text-3xl text-blue-400'>   
                Favourites
            </Link>
        </div>
        // <div className='flex items-center space-x-8 px-8 py-4'>
        //     <div className='flex items-center space-x-8'>
        //         <img src="https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-movie-call-to-action-bearicons-blue-bearicons.png" />
        //         <span className='text-blue-400 font-bold text-xl md:text-3xl'>Movies</span>
        //     </div>
        //     <div className='text-blue-400 font-bold text-xl md:text-3xl'>
        //         Favourites
        //     </div>
        // </div>
        //xl
        //padding
        //margin
        //font marfin
    )
}

export default Navbar2;
