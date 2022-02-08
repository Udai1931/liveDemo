import React, { useState } from 'react';

function Counter() {
    const [counter, setCounter] = useState(0);
    function increment(){
        setCounter((prevState)=>prevState+1)
    }
    function decrement(){
        setCounter(counter-1)
    }
    let reset = () => {
        setCounter(0)
    }
    return (
        <>
            <div style={{ fontSize: '5rem' }}>
                {counter}
            </div>
            <button style={{fontSize:'2rem'}} onClick={increment}>+</button>
            <button style={{fontSize:'2rem'}} onClick={decrement}>-</button>
            <button style={{fontSize:'2rem'}} onClick={reset}>0</button>
        </>
    );
}


export default Counter;
