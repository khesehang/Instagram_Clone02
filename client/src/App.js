import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouting from './AppRouting';


function App() {
  return (
    <div className="App">
    <AppRouting />
    <ToastContainer />
    </div>
  );
}

export default App;
