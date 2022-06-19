import {createContext, useState} from 'react';
import Child from "../components/Child";
const val = createContext();
function Parent() {
    const state = useState('hi')

    return (
        <div>
            <div>{state}</div>
            <val.Provider value={state}>
                <Child />
            </val.Provider>
        </div>
    )
}
export default Parent;
export { val }
