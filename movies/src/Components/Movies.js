import React from 'react';

function Movies() {
    return (
        <div className='mt-8 max-w-screen'>
            <h1 className='font-bold text-3xl'>Trending Movies</h1>
            <div className='my-8 mx-4 flex flex-wrap justify-center items-center'>
                <div className="w-1/3 h-52 md:w-1/5 md:h-60 bg-[url('https://picsum.photos/600/400/?random')] bg-center rounded-lg m-4 ">
                    jjjjj
                </div>
                <div className="w-1/3 h-52 md:w-1/5 md:h-60 bg-[url('https://picsum.photos/600/400/?random')] bg-center rounded-lg m-4">
                    jjjjj
                </div>
                <div className="w-1/3 h-52 md:w-1/5 md:h-60 bg-[url('https://picsum.photos/600/400/?random')] bg-center rounded-lg m-4">
                    jjjjj
                </div>
                <div className="w-1/3 h-52 md:w-1/5 md:h-60 bg-[url('https://picsum.photos/600/400/?random')] bg-center rounded-lg m-4">
                    jjjjj
                </div>
                <div className="w-1/3 h-52 md:w-1/5 md:h-60 bg-[url('https://picsum.photos/600/400/?random')] bg-center rounded-lg m-4">
                    jjjjj
                </div>
                <div className="w-1/3 h-52 md:w-1/5 md:h-60 bg-[url('https://picsum.photos/600/400/?random')] bg-center rounded-lg m-4">
                    jjjjj
                </div>
            </div>
            <div className='mb-8'>
            <a href="#"
                    className="bg-white border-gray-300 text-blue-400 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ">
                    Previous
                </a>
                <a href="#"
                    className="bg-white border-gray-300 text-blue-400 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ">
                    1
                </a>
                <a href="#"
                    className="bg-white border-gray-300 text-blue-400 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ">
                    Next
                </a>
            </div>
        </div>
    )
}

export default Movies;
