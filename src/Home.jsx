import { getDatabase, onValue, ref, set } from 'firebase/database'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, hit, setData } from './features/todoSlice'
import { app } from './firbaseconfig'
const Home = () => {
    const [mode, setMode] = useState({ mode: 'Add new task', id: -1 })
    const [filterMode, setFilterMode] = useState('all')
    const db = getDatabase(app);
    const dispatch = useDispatch()
    const state = useSelector(state => state.reducer)
    let inputText = useRef()

    const Upload = (obj) => {
        if (mode.mode == 'Update todo') {
            set(ref(db, `/todos/${mode.id}/text`), inputText.current.value)
            setMode({ mode: 'Add new task', id: -1 })
        }
        else {
            dispatch(addTodo(obj))
        }
        inputText.current.value = ''
    }

    const updator = (id, text) => {
        setMode({ mode: "Update todo", id: id })
        inputText.current.value = text

    }

    const checkBoxHandler = (id, comp) => {

        set(ref(db, `/todos/${id}/complete`), !comp)
    }

    const deletor = (id, number = 'single') => {
        if (number == 'single') {
            dispatch(deleteTodo(id))
        } else {
            state.todo.forEach(x => {
                console.log(x, number);
                (number == 'all') ? dispatch(deleteTodo(x.id)) : (number == 'done' && x.complete) ? dispatch(deleteTodo(x.id)) : (number == 'todo' && !x.complete) &&
                    dispatch(deleteTodo(x.id))
            })
        }
    }

    const filterer = (filtermode) => {
        if (filtermode != 'all') {
            let arr = state.todo.filter(x => {
                return (x.complete == ((filtermode == 'done') ? true : false))
            })
            return arr
        }



        return state.todo
    }

    useEffect(() => {

        const todoRef = ref(db, "/todos");
        onValue(todoRef, (snapshot) => {
            const todos = snapshot.val();
            const newTodoList = [];
            for (let id in todos) {
                newTodoList.push({ id, ...todos[id] });
            };
            setTimeout(() => {
                dispatch(setData(newTodoList))
            }, 5)

        })
    }, []);



    console.log("state", state)
    return (<>
        <div className="col-12 d-flex flex-column align-items-center">
            <p className="fs-4 bold my-2">Todo<a href="">Input</a></p>
            <div className="col-12 border rounded p-3">
                <div className="input-group mb-3">
                    <span className="input-group-text bg-warning" id="basic-addon1"><i className="bi bi-journal-bookmark-fill"></i></span>
                    <input ref={inputText} type="text" className="form-control" placeholder="New Todo" aria-label="Username" aria-describedby="basic-addon1" />
                </div>
                <button onClick={() =>{(inputText.current.value)?Upload({ text: inputText.current.value, complete: false }):alert('Please Enter The Note.')}} className="btn btn-warning col-12">{mode.mode}</button>
            </div>

            <p className="fs-4 bold my-2 mt-3">TodoList</p>
            <div className="col-12 d-flex justify-content-between mb-4">
                <button className="btn btn-warning col-3" onClick={() => setFilterMode('all')}>All</button>
                <button className="btn btn-warning col-3" onClick={() => setFilterMode('done')}>Done</button>
                <button className="btn btn-warning col-3" onClick={() => setFilterMode('todo')}>Todo</button>
            </div>
            {
                filterer(filterMode).map(x => {
                    return (!x.complete) ? <div className="border rounded d-flex justify-content-between col-12 m-2 py-2 px-3">
                        <div className="col-8">
                            <p className='m-0'>{x.text}</p>
                        </div>
                        <div className="col-3 d-flex justify-content-end align-items-center">
                            <div className=" d-flex justify-content-center form-check">
                                <input key={x.id + x.complete + 'checkbox'} onClick={() => checkBoxHandler(x.id, x.complete)} type="checkbox" className="form-check-input" id="exampleCheck1" />
                            </div>

                            <i onClick={() => updator(x.id, x.text)} className="bi bi-pencil-fill text-warning mx-3"></i>
                            <i onClick={() => deletor(x.id)} className="bi bi-trash3-fill text-danger" ></i>
                        </div>
                    </div> : <div className="border rounded d-flex justify-content-between col-12 m-2 py-2 px-3">
                        <div className="col-8">
                            <p className='m-0 text-decoration-line-through text-danger'>{x.text}</p>
                        </div>
                        <div className="col-3 d-flex justify-content-end align-items-center">
                            <div className=" d-flex justify-content-center form-check">
                                <input key={x.id + x.complete + 'checkbox'} onClick={() => checkBoxHandler(x.id, x.complete)} type="checkbox" className="form-check-input" id="exampleCheck1" checked />
                            </div>

                            <i onClick={() => updator(x.id, x.text)} className="bi bi-pencil-fill text-warning mx-3"></i>
                            <i onClick={() => deletor(x.id)} className="bi bi-trash3-fill text-danger" ></i>
                        </div>
                    </div>;
                })
            }




            <div className=" d-flex justify-content-around col-12 my-4 ">
                <button className="btn btn-danger col-4 " onClick={() => deletor('n', 'todo')}>Delete todo tasks</button>
                <button className="btn btn-danger col-4 mx-1" onClick={() => deletor('n', 'done')}>Delete done tasks</button>
                <button className="btn btn-danger col-4 " onClick={() => deletor('n', 'all')}>Delete all tasks</button>
            </div>
        </div>
    </>
    )
}

export default Home