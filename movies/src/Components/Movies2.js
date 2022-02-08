import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Movies2() {

    const [hover, setHover] = useState("")
    const [movies, setMovies] = useState([]);
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || []);
    const [curPage, setCurPage] = useState(1);

    useEffect(async () => {
        let res = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=5540e483a20e0b20354dabc2d66a31c9&&page=${curPage}`)
        console.log(res.data.results)
        setMovies(res.data.results)
        console.log(favourites)
    }, [curPage])


    let addToFavourites = (movie) => {
        let newFavourites = [...favourites, movie];
        setFavourites([...newFavourites])
        console.log(newFavourites)
        console.log("added")
        localStorage.setItem('favourites', JSON.stringify(newFavourites))
    }

    let removeFromFavourites = (movie) => {
        let newFavourites = favourites.filter(function (obj) {
            return obj.id != movie.id
        })
        setFavourites([...newFavourites])
        console.log("deleted")
        localStorage.setItem('favourites', JSON.stringify(newFavourites))
    }

    let goBack = () => {
        if (curPage == 1) {
            return
        }
        setCurPage(curPage - 1)
    }

    let goForward = () => {
        console.log("going forward")
        setCurPage(curPage + 1)
    }

    return (
        <div className='mt-8 max-w-[100vw]'>
            <div className='font-bold text-2xl'>Trending Movies</div>
            {/* <div class="shadow rounded-md p-4 w-[300px] mx-auto">
                <div class="animate-pulse flex space-x-4">
                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-8 bg-slate-200 rounded"></div>
                        <div class="h-8 bg-slate-200 rounded"></div>
                        <div class="h-8 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div> */}
            <div className='flex flex-wrap justify-center mt-8 '>
                {
                    movies.map((movie, index) => (
                        <div key={movie.id} className={` shadow w-[150px] h-[25vh] md:w-[300px] md:h-[35vh] bg-gray-500 rounded-3xl m-4 relative bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] bg-center hover:scale-110 ease-out duration-300`} onMouseEnter={() => setHover(movie.id)} onMouseLeave={() => setHover('')}>
                            {/* <div className='bg-gray-900 absolute bottom-4 left-4 text-white text-lg'>{movie.title}</div> */}
                            {
                                hover == movie.id ? !favourites.find((m) => m.id == movie.id ? true : false) ?
                                    <button className='p-4 bg-gray-900 rounded-xl absolute right-4 top-4' onClick={() => addToFavourites(movie)}>😍</button>
                                    :
                                    <button className='p-4 bg-gray-900 rounded-xl absolute right-4 top-4' onClick={() => removeFromFavourites(movie)}>❌</button>
                                    :
                                    <></>
                            }
                            <div className='absolute bg-gray-900 h-[40px] bottom-0 w-full text-white flex justify-center items-center font-bold rounded-b-xl'>{
                                movie.title
                            }

                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='m-4'>

                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                        className="relative bg-indigo-50 inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium  text-gray-500 hover:bg-gray-50 border-indigo-500 text-indigo-600" onClick={goBack}
                    >
                        Previous
                    </button>
                    <button
                        aria-current="page"
                        className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                        {curPage}
                    </button>
                    <button
                        className="relative bg-indigo-50 inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 border-indigo-500 text-indigo-600" onClick={goForward}
                    >
                        Next
                    </button>
                </nav>
            </div>
            {/* <button className='p-4 border  border-indigo-500 text-indigo-500 border-r-0 rounded-l-lg'>Previous</button>
            <button className='p-4 border bg-gray-200 border-indigo-500 text-indigo-500'>1</button>
            <button className='p-4 border border-indigo-500 text-indigo-500 border-l-0 rounded-r-lg'>Next</button> */}
        </div>
    )
}

export default Movies2;
