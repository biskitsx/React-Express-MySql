import { useEffect, useState } from 'react';

import './App.css'

function App() {

    // const datas = fetch('http://localhost1500/read').then(res=>res.json())
    
    const [post,setPost] = useState([]);

    function getData() {
        fetch('http://localhost:1500/read')
            .then(res=>res.json())
            .then(data=>{
                setPost(data);
            })
    }

    useEffect(getData,[]);

    const datas = post.map((data)=>{
        return (
            <div className='w-8/12 border border-gray-400 shadow-md rounded-lg flex-col flex p-3'>
                <h4 className='text-lg'>{data.message}</h4>
                <h5 className='text-end '>{data.name}</h5>
            </div>
        )
    })

    return (
        <div className="App">
            <nav className=' grid place-items-center p-4'>
                <h1 className='text-3xl'>Duchshund !</h1>
            </nav>

            <div className='flex flex-col justify-center items-center gap-6'>
                {datas}
            </div>
        </div>
    )
}

export default App
