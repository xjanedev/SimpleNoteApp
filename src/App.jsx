import { Route, Routes } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import Todos from "./pages/Todos";
import TodoEditor from "./pages/TodoEditor";
import "./App.css";
import AddTodo from "./components/AddTodo";
import Header from "./components/Header";

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<TodoPage />} />
        <Route path='/todo/:id/new' element={<AddTodo />} />
        <Route path='/todo/:id' element={<Todos />} />
        <Route path='/todo/:id/edit' element={<TodoEditor />} />
      </Routes>
    </div>
  );
}

export default App;
