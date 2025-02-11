import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Analizer from './components/Analizer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analizler" element={<Analizer />} />
      </Routes>
    </Router>
  );
}

export default App;
