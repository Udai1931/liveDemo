import React from 'react';

function Pagination({goBack,curPage,goForward,setCurPage}) {

let goBack1 = () => {
    setCurPage(curPage-1)
}

    return <div className='m-4'>

        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
                className="relative bg-indigo-50 inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium  text-gray-500 hover:bg-gray-50 border-indigo-500 text-indigo-600"
                onClick={goBack}
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
                className="relative bg-indigo-50 inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 border-indigo-500 text-indigo-600"
                onClick={goForward}
            >
                Next
            </button>
        </nav>
    </div>
}

export default Pagination;
