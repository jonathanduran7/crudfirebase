import React from 'react'
import {firebase} from './firebase'

function App() {


    React.useEffect(()=>{

      const obtenerDatos = async () =>{
        const db = firebase.firestore()
        const data = await db.collection('tareas').get()
        
        try {
          
        } catch (error) {
          console.log(error)  
        }
      }

      obtenerDatos()
    },[])

    return (
    <div className="container mt-3">
      todo ok
    </div>
  );
}

export default App;
