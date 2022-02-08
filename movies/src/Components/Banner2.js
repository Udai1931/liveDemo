import React,{useEffect,useState} from 'react';
import axios from 'axios';
function Banner2() {
    const [movie,setMovie] = useState([]);
    useEffect(async()=>{
        let res = await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=5540e483a20e0b20354dabc2d66a31c9&&page=1")
        console.log(res.data.results)
        setMovie(res.data.results[0])
    },[])
    return ( 
        <div className={`h-[40vh] md:h-[60vh] bg-[url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})] flex flex-col justify-between bg-no-repeat bg-cover bg-center`} >
            <div></div>
            <div className='h-1/5 bg-gray-900 bg-opacity-50 rounded-3xl flex items-center justify-center'>
                <div className='font-bold text-2xl text-white'>{movie.title}</div>
            </div>
        </div>
        // <div className='h-[60vh] bg-[url(https://image.tmdb.org/t/p/original//iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg)] bg-center bg-no-repeat bg-cover flex flex-col justify-between'>
        //     <div></div>
        //     <div className='text-white font-bold text-5xl bg-gray-900 h-1/5 bg-opacity-50 rounded-3xl flex'><div>Title</div></div>
        // </div>
    );  
}

export default Banner2;
