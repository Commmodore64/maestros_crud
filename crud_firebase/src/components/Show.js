import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebaseConfig/Firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Show = () => {
    // 1.Configuramos los hooks
    const [products,setProducts] = useState( [] );

    // 2. Referenciamos la DB firestore
    const productsColletion = collection(db, "products");

    // 3. Funcion para mostrar todos los docs
    const getProducts = async () => {
        const data = await getDocs(productsColletion);
        console.log(data);
    }

    // 4. Funcion para eliminar un doc

    // 5. Funcion de configuracion para sweetalert2

    // 6. Usamos useEffect
    useEffect( () => {
        getProducts();
    }, [] );

    // 7. Devolvemos vista de nuestro componente
  return (
    <div>show</div>
  )
}

export default Show;