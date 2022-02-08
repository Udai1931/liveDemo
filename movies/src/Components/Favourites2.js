import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';
 
function Favourites2() {
    const [favourites, setFavourites] = useState([])
    const [genres,setGenres] = useState([])
    const [curGenre, setCurGenre] = useState("All Genres")
    const [filtered,setFiltered] = useState([])
    const [src,setSrc] = useState("")
    const [rows,setRows] = useState(5)
    const [curPage,setCurPage] = useState(1)
    const [pages,setPages] = useState(1)

    let genreids = {
        28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
        27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
    }

    useEffect(() => {
        let oldFav = JSON.parse(localStorage.getItem("imdb")) || []
        setFavourites([...oldFav])
        console.log(oldFav)
    }, [])

    useEffect(()=>{
        let newArray = favourites.map((movie)=>{
            return genreids[movie.genre_ids[0]]
        })
        let set = new Set(newArray)
        setGenres(["All Genres",...set])


        let tempArray=[]
        if(curGenre!="All Genres"){
            tempArray = favourites.filter((movie)=>{
                return curGenre == genreids[movie.genre_ids[0]]
            })
        }else{
            tempArray = favourites
        }
        
        
        if(src!=""){
            tempArray = tempArray.filter((movie)=>{
                return movie.title.toLowerCase().includes(src.toLowerCase())
            })
        }

        // setCurPage(1)
        setPages(Math.ceil(tempArray.length / rows))

        let si = (curPage-1)*rows
        let ei = si+Number(rows)

        console.log(si+" "+ei+" "+curPage)

        tempArray = tempArray.slice(si,ei)

        setFiltered([...tempArray])

    },[favourites,curGenre,src,rows,curPage])

    let goBack = () => {
        if(curPage>1)
            setCurPage(curPage-1)
    }

    let goForward = () => {
        if(curPage<pages){
            setCurPage(curPage+1)
        }
    }

    let ratingDesc = () => {
        favourites.sort((objA,objB)=>{
            return objB.vote_average - objA.vote_average
        })
        setFavourites([...favourites])
    }

    let ratingAsc = () => {
        favourites.sort((objA,objB)=>{
            return objA.vote_average - objB.vote_average
        })
        setFavourites([...favourites])
    }
    let popuDesc = () => {
        favourites.sort((objA,objB)=>{
            return objB.popularity - objA.popularity
        })
        setFavourites([...favourites])
    }
    let popuAsc = () => {
        favourites.sort((objA,objB)=>{
            return objA.popularity - objB.popularity
        })
        setFavourites([...favourites])
    }

    let removeFromFavourites = (id) => {
        let newFav = favourites.filter((movie)=> movie.id!=id)
        setFavourites([...newFav])
        localStorage.setItem("imdb",JSON.stringify(newFav))
    }

    return <div className='mt-4'>
        <div className='px-12 py-4 text-center'>
            {/* <button className='p-2 m-2 rounded-xl font-bold text-white bg-blue-400'>All Genres</button> */}
            {
                genres.map((genre)=>(
                    <button className={
                        genre == curGenre ?
                        "p-2 m-2 rounded-xl font-bold text-white bg-blue-400" :
                        'p-2 m-2 rounded-xl font-bold text-white bg-gray-400 hover:bg-blue-400'
                    }
                    onClick={()=>setCurGenre(genre)}
                    >{genre}</button>
                ))
            }
        </div>
        <div className='text-center m-4'>
            <input type="text" value={src} onChange={(e)=>setSrc(e.target.value)} placeholder='Search' className='border border-2 text-center p-1 m-2' />
            <input type="number" value={rows} onChange={(e)=>setRows(e.target.value)} placeholder='Rows' className='border border-2 text-center p-1 m-2' />
        </div>
        <div className="flex flex-col px-8 mt-4 shadow">
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
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' className='mr-2 cursor-pointer' onClick={ratingDesc}/>
                                            Rating
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' 
                                            onClick={ratingAsc}
                                            className='ml-2 mr-2' />
                                        </div>
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        <div className='flex'>
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png' onClick={popuDesc} className='mr-2' />
                                            Popularity
                                            <img src='https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png' onClick={popuAsc} className='ml-2 mr-2' />
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
                                {filtered.map((movie) => (
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
                                            onClick={()=> removeFromFavourites(movie.id)}>
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
        <div className='text-center'>
            <Pagination curPage={curPage} goBack={goBack} goForward={goForward}/>
        </div>
    </div>;
}

export default Favourites2;
