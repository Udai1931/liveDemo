import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
function Favourites() {

    const [favourites, setFavourites] = useState([]);
    const [genres, setGenres] = useState([])
    const [curGenre, setCurGenre] = useState("All Genres")
    const [rating, setRating] = useState(0)
    const [popularity, setPopularity] = useState(0)
    const [search, setSearch] = useState("")
    const [rows, setRows] = useState(5)
    const [curPage, setCurPage] = useState(1)
    // const maxPages 
    //Movies lane ke lia
    useEffect(() => {
        let oldFav = JSON.parse(localStorage.getItem("imdb")) || []
        setFavourites([...oldFav])
    }, [])

    // Get all genres
    useEffect(() => {
        let newGenres = favourites.map((movie => genreids[movie.genre_ids[0]]))
        let temp = new Set(newGenres)
        setGenres(["All Genres", ...temp])
    }, [favourites])

    let deleteFavourites = (id) => {
        let newArray = favourites.filter((movie) => movie.id != id)
        setFavourites([...newArray])
        localStorage.setItem("imdb", JSON.stringify(newArray))
    }

    let genreids = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
        27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    }

    let filteredMovies =
        curGenre == "All Genres" ? favourites : favourites.filter((movie) => genreids[movie.genre_ids[0]] == curGenre)


    if (rating == -1) {
        filteredMovies = filteredMovies.sort(function (objA, objB) {
            return objA.vote_average - objB.vote_average
        })
    } else if(rating==1) {
        filteredMovies = filteredMovies.sort(function (objA, objB) {
            return objB.vote_average - objA.vote_average
        })
    }

    if (popularity == -1) {
        filteredMovies = filteredMovies.sort(function (objA, objB) {
            return objA.popularity - objB.popularity
        })
    } else if(popularity==1) {
        filteredMovies = filteredMovies.sort(function (objA, objB) {
            return objB.popularity - objA.popularity
        })
    }

    filteredMovies = filteredMovies.filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))  //Searching

    let maxPages = Math.ceil(filteredMovies.length / rows)
    let si = (curPage - 1) * rows;
    let ei = Number(si) + Number(rows)

    filteredMovies = filteredMovies.slice(si, ei);

    let goBack = () => {
        if (curPage > 1) {
            setCurPage(curPage - 1)
        }
    }

    let goAhead = () => {
        if (curPage < maxPages) {
            setCurPage(curPage + 1)
        }
    }

    console.log(filteredMovies)

    return <>
        <div className='mt-4 px-2 flex justify-center flex-wrap space-x-2'>
            {
                genres.map((genre) => (
                    <button className={
                        curGenre == genre ?
                            'm-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold' :
                            'm-2 text-lg p-1 px-2 bg-gray-400 text-white rounded-xl font-bold hover:bg-blue-400'
                    }
                        onClick={() => setCurGenre(genre)}
                    >
                        {genre}
                    </button>
                )
                )
            }
        </div>
        <div className='text-center m-4'>
            <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} className='border border-2 text-center p-1 m-2' />
            <input type="number" placeholder='Rows' value={rows} onChange={(e) => { if (e.target.value > 0) { setRows(e.target.value) } }} className='border border-2 text-center p-1 m-2' />
        </div>
        <div className="flex flex-col m-4">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 min-w-full">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        <div className='flex'>
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' className='mr-2 cursor-pointer'
                                                onClick={() => {
                                                    setPopularity(0)
                                                    setRating(-1)
                                                    }} />
                                            Rating
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png'
                                                onClick={() => {
                                                    setPopularity(0)
                                                    setRating(1)
                                                    }}
                                                className='ml-2 mr-2' />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        <div className='flex'>
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png'
                                                    className='mr-2'
                                                onClick={() => {
                                                    setRating(0)
                                                    setPopularity(-1)
                                                    }} />
                                            Popularity
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png'
                                                className='mr-2'
                                                onClick={() => {
                                                    setRating(0)
                                                    setPopularity(1)
                                                    }}
                                                className='ml-2 mr-2' />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Genre
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMovies.map((movie) => (
                                    <tr key={movie.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                                                    <img className="hidden md:block md:h-[100px] md:w-[180px]" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 font-bold">{movie.title}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{movie.vote_average}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{movie.popularity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {genreids[movie.genre_ids[0]]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                            <button href="#" className="text-red-600 hover:text-red-900"
                                                onClick={() => deleteFavourites(movie.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
        {/* <div>Table Container</div> */}
        <div className='text-center m-4'><Pagination curPage={curPage} goBack={goBack} goForward={goAhead} /></div>
    </>;
}

export default Favourites;
