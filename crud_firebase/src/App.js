import './App.css';
// Importamos los componentes
import Show from './components/Show';
import Edit from './components/Edit';
import Create from './components/Create';

// Importamos el router
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Show /> }/>
          <Route path='/create' element={ <Create /> }/>
          <Route path='/edit/:id' element={ <Edit /> }/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
