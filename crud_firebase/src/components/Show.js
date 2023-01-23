import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig/Firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Show = () => {
    // 1.Configuramos los hooks
    const [maestros,setMaestros] = useState( [] );

    // 2. Referenciamos la DB firestore
    const maestrosCollection = collection(db, "maestros");

    // 3. Funcion para mostrar todos los docs
    const getMaestros = async () => {
        const data = await getDocs(maestrosCollection);
        //console.log(data.docs);
        setMaestros (
          data.docs.map( (doc) => ( {...doc.data(), id:doc.id} ) )
        )
        //console.log(maestros);
    }

    // 4. Funcion para eliminar un doc
    const deleteMaestros = async (id) => {
      const maestrosDoc = doc(db, "maestros", id)
      await deleteDoc(maestrosDoc)
      getMaestros()
    }

    // 5. Funcion de configuracion para sweetalert2
    const confirmDelete = (id) => {
      MySwal.fire({
        title: '¿Eliminar Maestro?',
        text: "No podras revertir el cambio!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Si, borrar!'
      }).then((result) => {
        if (result.isConfirmed) { 
          //llamamos a la fcion para eliminar   
          deleteMaestros(id)               
          Swal.fire(
            'Borrado!',
            'Su registro a sido eliminado',
            'success'
          )
        }
      })    
    }



    // 6. Usamos useEffect
    useEffect( () => {
        getMaestros();
        // eslint-disable-next-line
    }, [] );

    // 7. Devolvemos vista de nuestro componente
  return (
    <>
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='d-grid gap-2'>
          <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
          </div>

          <table className='table table-dark table-hover'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Curso</th>
                <th>Salon</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              { maestros.map( (maestro)  => (
                <tr key={maestro.id}>
                  <td>{ maestro.nombre }</td>
                  <td>{ maestro.curso }</td>
                  <td>{ maestro.salon } </td>
                  <td>
                    <Link to={`/edit/${maestro.id}`} className='btn btn-light'><i className="fa-solid fa-pen-to-square"></i></Link>
                    <button onClick={ () => {confirmDelete(maestro.id)}} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button>
                  </td>
                </tr>
              ))}
                

            </tbody>

          </table>
        </div>
      </div>
    </div>
    </> 
  )
}

export default Show;