import { useEffect, useState } from 'react';
import Axios from 'axios'

import './App.css'
import axios from 'axios';

function App() {

    const [post,setPost] = useState([]);

    const readAPI = 'http://localhost:1500/read' ;
    const addAPI = 'http://localhost:1500/insert';
    const updateAPI = 'http://localhost:1500/update';
    const deleteAPI = 'http://localhost:1500/delete';

    function getData() {
        try {
            fetch(readAPI)
                .then(res=>res.json())
                .then(data=>{
                    setPost(data);
                }).catch(err=>{
                    console.log(err);
                })
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(getData,[]);



    const [textUpdate,setTextUpdate] = useState('');

    //read data
    const datas = post.map((data)=>{
        return (
            <div className='w-10/12 shadow-md rounded-lg flex-col flex p-3 bg-slate-100' key={data.id}>
                <h4 className='text-lg '>{data.message}</h4>
                <h5 className='text-end font-medium'>{data.name}</h5>
                <div className="flex gap-2">
                    <input
                        type="text" 
                        className='border border-gray-400 rounded-sm w-full p-1 ' 
                        placeholder='Enter your message'
                        onChange={(e)=>{
                            setTextUpdate(e.target.value);
                        }}
                    />
                    <button className='bg-yellow-300 px-2 rounded-md' onClick={(e)=>{updateData(e,data.id)}}>UPDATE</button>
                    <button className='bg-red-400 px-2 rounded-md text-white' onClick={(e)=>{deleteData(e,data.id)}}>DELETE</button>
                    
                </div>
            </div>
        )
    })

    datas.reverse()

    //form 
    const [text,setText] = useState("");
    const [name,setName] = useState("");

    function addData(e) {
        e.preventDefault() ;
        axios.post(addAPI,{
            message : text,
            name : name 
        })
        .then(()=>{
            setPost([...post,{
                message : text,
                name : name 
            }])
        })

        setText('');
        setName('');
    }

    
    //UPDATE
    function updateData(event,id) {
        event.preventDefault();
        axios.patch(updateAPI,{id:id,message:textUpdate})
            .then(()=>{
                setPost(()=>{
                    return (post.map((x)=>{
                        if (x.id === id) {
                            x.message = textUpdate
                        }
                        return x ;
                    }))
                })
            }).then(()=>{
                console.log("update succesfully");
            })
        setTextUpdate('');
    }

    function deleteData(event,id) {
        event.preventDefault();
        axios.delete(`http://localhost:1500/delete/${id}`).then((res)=>{
            setPost((prevPost) => {
                return prevPost.filter((x)=>{
                    return x.id !== id
                })
            })
        })
    }


    return (
        <div className="App bg-white">
            <nav className=' grid place-items-center p-3 bg-gray-700'>
                <h1 className='text-2xl text-white tracking-wider'>TWITTER </h1>
            </nav>
            <div className='flex flex-col justify-center items-center gap-6 p-6'>
                <form className='w-10/12 border p-3 gap-2 flex flex-col' onSubmit={addData}>
                    <h2>NEW POST</h2>
                    <h4>TEXT : </h4>
                    <input
                        type="text" 
                        className='border border-gray-400 rounded-sm w-full p-1 ' 
                        placeholder='Enter your message'
                        onChange={(e)=>{
                            setText(e.target.value);
                        }}
                        value={text}
                    />
                    <h4>Author Name : </h4>

                    <input 
                        type="text" 
                        className='border border-gray-400 rounded-sm w-full p-1' 
                        placeholder='Enter your name'
                        onChange={(e)=>{
                            setName(e.target.value);
                        }}
                        value={name}
                    />

                    <button className='bg-green-400 rounded-lg p-1'>SUBMIT</button>
                    
                </form>
                {datas}
            </div>
        </div>
    )
}

export default App