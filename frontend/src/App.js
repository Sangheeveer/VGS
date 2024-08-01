import Header from './components/common/Header';
import { Outlet } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';



function App() {
  return (
    <>
      <Header />
      <main>
          <Outlet />      
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
