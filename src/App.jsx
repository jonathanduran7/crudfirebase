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
      
      try {
        
        const db = firebase.firestore()
        const nuevaTarea = {
          name: tarea,
          fecha: Date.now()
        }

        const data = await db.collection('tareas').add(nuevaTarea)
        setTarea('')
        setTareas([
          ...tareas, {...nuevaTarea, id: data.id}
        ])

      } catch (error) {
        console.log(error)
      }

    }

    const eliminar = async (id) =>{
      try {
        const db = firebase.firestore()
        await db.collection('tareas').doc(id).delete()
        const arrayFiltrado = tareas.filter(item => item.id !== id)
        setTareas(arrayFiltrado)
      } catch (error) {
        console.log(error)
      }
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
                  <button className="btn btn-danger btn-sm float-end ms-2"
                  onClick={()=> eliminar(item.id)}>
                    Eliminar
                  </button>
                  <button className="btn btn-warning btn-sm float-end">
                    Editar
                  </button>
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
