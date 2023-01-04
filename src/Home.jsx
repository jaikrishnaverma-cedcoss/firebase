import { onValue, ref } from 'firebase/database'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, fetchData, setData } from './features/todoSlice'
const Home = () => {
    const dispatch = useDispatch()
    const state=useSelector(state=>state.reducer)
    let inputText=useRef()
    const Upload = (obj)=>{
        dispatch(addTodo(obj))
    }
    useEffect(() => {
       fetchData()
      },[]);

      console.log("state",state)
    return (
        <>
            <div className="col-12 d-flex flex-column align-items-center">
                <p className="fs-4 bold my-2">TodoInput</p>
                <div className="col-12 border rounded p-3">
                    <div className="input-group mb-3">
                        <span className="input-group-text bg-warning" id="basic-addon1"><i className="bi bi-journal-bookmark-fill"></i></span>
                        <input ref={inputText} type="text" className="form-control" placeholder="New Todo" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                    <button onClick={()=>Upload({text:inputText.current.value,complete:false})} className="btn btn-warning col-12">Add new task</button>
                </div>

                <p className="fs-4 bold my-2 mt-3">TodoList</p>
                <div className="col-12 d-flex justify-content-between mb-4">
                    <button className="btn btn-warning col-3">All</button>
                    <button className="btn btn-warning col-3">Done</button>
                    <button className="btn btn-warning col-3">Todo</button>
                </div>

                <div className="border rounded d-flex justify-content-between col-12 m-2 py-2 px-3">
                    <div className="col-8">
                        <p className='m-0'>Learn reactJS basics</p>
                    </div>
                    <div className="col-3 d-flex justify-content-end align-items-center">
                        <div className=" d-flex justify-content-center form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        </div>

                        <i className="bi bi-pencil-fill text-warning mx-3"></i>
                        <i className="bi bi-trash3-fill text-danger"></i>
                    </div>
                </div>

                <div className="border rounded d-flex justify-content-between col-12 m-2 py-2 px-3">
                    <div className="col-8">
                        <p className='m-0 text-decoration-line-through text-danger'>Learn reactJS basics</p>
                    </div>
                    <div className="col-3 d-flex justify-content-end align-items-center">
                        <div className=" d-flex justify-content-center form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked />
                        </div>

                        <i className="bi bi-pencil-fill text-warning mx-3"></i>
                        <i className="bi bi-trash3-fill text-danger"></i>
                    </div>
                </div>

                <div className=" d-flex justify-content-around col-12 my-4 ">
                    <button className="btn btn-danger col-6 me-1">Delete done tasks</button>
                    <button className="btn btn-danger col-6 ms-1">Delete all tasks</button>
                </div>
            </div>
        </>
    )
}

export default Home