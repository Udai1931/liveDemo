import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Pagination from './Pagination';
import { Oval } from 'react-loader-spinner'
// import "node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function Movies3() {

    const [movies, setMovies] = useState([])
    const [hover, setHover] = useState("")
    const [favourites, setFavourites] = useState([])
    const [curPage, setCurPage] = useState(1)

    useEffect(async () => {
        let res = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=5540e483a20e0b20354dabc2d66a31c9&page=${curPage}`)
        // console.log(res.data.results)
        setMovies(res.data.results)

        let oldFavourites = JSON.parse(localStorage.getItem("imdb")) || []
        setFavourites([...oldFavourites])
    }, [curPage])


    let goForward = () => {
        setCurPage(curPage + 1)
    }

    let goBack = () => {
        if (curPage != 1)
            setCurPage(curPage - 1)
    }


    function addToFavourites(movie) {
        let newArray = [...favourites, movie]
        setFavourites([...newArray])
        localStorage.setItem('imdb', (JSON.stringify(newArray)));
    }

    function removeFromFavourites(movie) {
        let newArray = favourites.filter(function (mObj) {
            return movie.id != mObj.id
        })
        setFavourites([...newArray])
        localStorage.setItem('imdb', JSON.stringify(newArray));
    }

    return <div className='mt-8 max-w-[100vw]'>
        <div class="flex items-center justify-center">
        </div>
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
                    <div key={movie.id} className={` shadow w-[150px] h-[25vh] md:w-[300px] md:h-[35vh] bg-gray-500 rounded-3xl m-4 relative bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] bg-center hover:scale-110 ease-out duration-300`}
                        onMouseEnter={() => setHover(movie.id)} onMouseLeave={() => setHover('')}
                    >
                        {/* {
                            hover == movie.id ? !favourites.find((m) => m.id == movie.id ? true : false) ?
                                <button className='p-4 bg-gray-900 rounded-xl absolute right-4 top-4' 
                                // onClick={() => addToFavourites(movie)}
                                >😍</button>
                                :
                                <button className='p-4 bg-gray-900 rounded-xl absolute right-4 top-4' 
                                // onClick={() => removeFromFavourites(movie)}
                                >❌</button>
                                :
                                <></>
                        } */}
                        {
                            hover == movie.id &&
                            <>
                                {
                                    favourites.find((mObj) => mObj.id == movie.id) ?
                                        <button onClick={function () { removeFromFavourites(movie) }} className='p-2 bg-gray-900 rounded-2xl bg-opacity-80 absolute right-2 top-2'>
                                            ❌
                                        </button>
                                        :
                                        <button onClick={function () { addToFavourites(movie) }} className='p-2 bg-gray-900 rounded-2xl bg-opacity-80 absolute right-2 top-2'>
                                            😍
                                        </button>
                                }
                            </>
                        }
                        <div className='absolute bg-gray-900 h-[40px] bottom-0 w-full text-white flex justify-center items-center font-bold rounded-b-xl'>{
                            movie.title
                        }

                        </div>
                    </div>
                ))
            }
        </div>
        <Pagination curPage={curPage} goBack={goBack} goForward={goForward} setCurPage={setCurPage} />
        {/* <button className='p-4 border  border-indigo-500 text-indigo-500 border-r-0 rounded-l-lg'>Previous</button>
  <button className='p-4 border bg-gray-200 border-indigo-500 text-indigo-500'>1</button>
  <button className='p-4 border border-indigo-500 text-indigo-500 border-l-0 rounded-r-lg'>Next</button> */}
    </div>
}

export default Movies3;
