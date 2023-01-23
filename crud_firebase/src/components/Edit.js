import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from './firebaseConfig/Firebase';
import { Link } from 'react-router-dom';

const Edit = () => {
  const [ names, setNames ] = useState('');
  const [ cursos, setCursos ] = useState('');
  const [ salones, setSalones ] = useState();

  const navigate = useNavigate()
  const {id} = useParams()

  const update = async (e) => {
    e.preventDefault()
    const salon = doc(db, "salones", id)
    const data = { names: names, cursos: cursos, salones: salones }
    await updateDoc(salon, data )
    navigate('/')
  }

  const getMaestrosById = async (id) => {
    const salon = await getDoc(doc(db, "salones", id))
    if(salon.exists()) {
      setNames(salon.data().names)
      setCursos(salon.data().cursos)
      setSalones(salon.data().salones)
    }else {
      console.log('El producto no existe')
    }
  }

  useEffect( () => {
    getMaestrosById(id)
    // eslint-disable-next-line
  }, [])
  return (
    <div className='container'>
    <div className='row'>
      <div className='col'>
        <h1>Editar maestro</h1>

        <form onSubmit={ update }>

          <div className='mb-3'>
            <label className='form-label'>Maestro</label>
            <input 
              value={ names }
              onChange={ (e) => setNames(e.target.value)}
              type="text"
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Curso</label>
            <input 
              value={ cursos }
              onChange={ (e) => setCursos(e.target.value)}
              type="text"
              className='form-control'
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Salon</label>
            <input 
              value={ salones }
              onChange={ (e) => setSalones(e.target.value)}
              type="number"
              className='form-control'
            />
          </div>
          <button type='submit' className='btn btn-primary'>Actualizar</button>
          <Link to="/" className='btn btn-secondary mt-2 mb-2'>Back</Link>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Edit