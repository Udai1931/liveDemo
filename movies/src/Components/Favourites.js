import React, { useState, useEffect } from 'react';

function Favourites() {
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem("favourites")) || []);
    const [filtered, setFiltered] = useState([]);
    const [genres, setGenres] = useState([])
    const [curGenre, setCurGenre] = useState("All Genres")
    const [src, setSrc] = useState("")
    const [rows, setRows] = useState(5)
    const [pages, setPages] = useState([])
    const [curPage, setCurPage] = useState(1)

    let genreids = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
        27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    }

    let remove = (id) => {
        let newFavourites = favourites.filter((f) => f.id != id)
        setFavourites([...newFavourites])
        localStorage.setItem("favourites", JSON.stringify(newFavourites))
    }

    let changeGenre = (genre) => {
        setCurGenre(genre)
    }

    useEffect(() => {
        let newGenres = favourites.map((movie) => {
            return genreids[movie.genre_ids[0]]
        })
        let unique = new Set(newGenres)
        setGenres(["All Genres", ...unique])


        let tempArray = []
        if (curGenre == "All Genres") {
            tempArray = [...favourites]
        } else {
            tempArray = favourites.filter((movie) => {
                return genreids[movie.genre_ids[0]] == curGenre
            })
        }
        console.log(tempArray + "abc")
        tempArray = tempArray.filter((movie) => {
            return movie.title.toLowerCase().includes(src.toLowerCase())
        })

        console.log(tempArray + "abc")
        let pagesArrLength = Math.ceil(tempArray.length / rows)
        let pagesArr = []
        for (let i = 0; i < pagesArrLength; i++) {
            pagesArr.push(i + 1)
        }
        setPages([...pagesArr])

        //Page change
        let start = (curPage - 1) * rows
        let end = start + rows
        tempArray = tempArray.slice(start, end)
        setFiltered([...tempArray])


    }, [favourites, curGenre, curPage, src, rows])


    let ascRating = () => {
        let temp = favourites.sort((a, b) => {
            return a.vote_average - b.vote_average
        })
        setFavourites([...temp])
    }

    let dscRating = () => {
        let temp = favourites.sort((a, b) => {
            return b.vote_average - a.vote_average
        })
        setFavourites([...temp])
    }

    let ascPop = () => {
        let temp = favourites.sort((a, b) => {
            // console.log(a.popularity+" "+b.popularity+" "+a.popularity - b.popularity)
            return a.popularity - b.popularity
        })
        setFavourites([...temp])
    }

    let dscPop = () => {
        let temp = favourites.sort((a, b) => {
            return b.popularity - a.popularity
        })
        setFavourites([...temp])
    }
    // useEffect(()=>{
    // },[curGenre])


    return (
        <>
            <div className='py-4 px-8'>
                <ul className='flex flex-wrap items-center '>
                    {
                        genres.map((genre, index) => (
                            <li><button onClick={() => changeGenre(genre)} className={curGenre == genre ? 'bg-blue-400 p-2 m-4 rounded-xl text-white font-bold hover:bg-blue-400' : 'bg-gray-400 p-2 m-4 rounded-xl text-white font-bold hover:bg-blue-400'}>{genre}</button></li>
                        ))
                    }
                </ul>

                <div >
                    <input type="text" placeholder="Search" className="h-[35px] w-[200px] border border-2 border-gray-400 m-2" value={src} onChange={(e) => setSrc(e.target.value)} />
                    <input type="number" placeholder="No of Rows" className="h-[35px] w-[200px] border border-2 border-gray-400 m-2" value={rows} onChange={(e) => {
                        if (e.target.value > 0)
                            setRows(e.target.value)
                    }} />
                </div>
            </div>
            <div className="flex flex-col p-8">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 table-auto">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" className='mr-2 cursor-pointer inline-block' onClick={dscRating}/>
                                            Rating
                                            <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" className='ml-2 cursor-pointer inline-block' onClick={ascRating}/>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png" className='mr-2 cursor-pointer inline-block' onClick={dscPop}/>
                                            Popularity
                                            <img src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png" className='ml-2 cursor-pointer inline-block' onClick={ascPop}/>
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
                                    {filtered.map((movie) => (
                                        <tr key={movie.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-20 w-40">
                                                        <img className="h-20 w-40" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                                                        {/* <div className="text-sm text-gray-500">{person.email}</div> */}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{movie.vote_average}</div>
                                                {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{movie.popularity}</div>
                                                {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    {genreids[movie.genre_ids[0]]}
                                                </span>
                                            </td>
                                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{person.role}</td> */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button href="#" className="text-red-600 hover:text-red-900" onClick={() => remove(movie.id)}>
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
            <div className='m-4'>

                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    {
                        pages.map((page, index) => (
                            <button
                                className={page == curPage ? "z-10 bg-blue-500 border-blue-500 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium" : "z-10 bg-indigo-50 border-gray-500 text-gray-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"}
                                onClick={() => setCurPage(page)}
                            >
                                {page}
                            </button>
                        ))
                    }
                </nav>
            </div>
        </>
    )
}

export default Favourites;
