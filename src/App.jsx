import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Team from './pages/Team';

const App = () => {

  return (
    <BrowserRouter>
      <Nav/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/stats/:name" element={<Stats/>}/>
            <Route path="/team" element={<Team/>}/>
        </Routes>
    </BrowserRouter>  
  )}

export default App
