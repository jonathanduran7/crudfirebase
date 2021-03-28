import React from 'react'
import {firebase} from './firebase'

function App() {

    const [tareas,setTareas] = React.useState([])
    const [tarea,setTarea] = React.useState('')

    React.useEffect(()=>{

      const obtenerDatos = async () =>{
        const db = firebase.firestore()
        const data = await db.collection('tareas').get()
        const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data() }))
        setTareas(arrayData)
        try {
          
        } catch (error) {
          console.log(error)  
        }
      }

      obtenerDatos()
    },[])

    const agregar = async (e) =>{
      e.preventDefault()

      if(!tarea.trim()){
        console.log('esta vacio')
        return
      }
      console.log(tarea)
    }

    return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {
              tareas.map(item=>(
                <li className="list-group-item" key={item.id}>
                  {item.name}
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-md-6">
         <h2>Formulario</h2>
         <form onSubmit={agregar}>
            <input 
              type="text"
              placeholder="Ingrese tarea"
              className="form-control mb-2"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />
            <button 
            className='btn btn-dark'
            type="submit">
               Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
