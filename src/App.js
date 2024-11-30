import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <Link to='/login '> login</Link>
    </div>
  );
}

export default App;
