import React from 'react';

function Navbar() {
    return (
        <>
        <div className='flex items-center mx-10 my-4'>
            <div className='flex items-center cursor-pointer'>
            <img src="https://img.icons8.com/external-bearicons-blue-bearicons/50/000000/external-movie-call-to-action-bearicons-blue-bearicons.png"/>
            <span className='ml-4 font-bold md:text-3xl text-blue-400'>Movies</span>
            </div>
            <div className='ml-6 md:ml-10 font-bold md:text-3xl text-blue-400 cursor-pointer'>
                Favourites
            </div>
        </div>
        <div className='border-b-4'></div>
        </>
    );
}

export default Navbar;
