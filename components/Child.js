import React, {useContext} from 'react'
import {val} from "../pages/parent";

export default function Child() {
    const [greet,setGreet] = useContext(val)
    return (
        <>

            <button onClick={() => {
                console.log(greet)
                if(greet=='hi') return setGreet('hello');
               return  setGreet('hi')
            }}>Change to hello</button>
        </>
    )
}
