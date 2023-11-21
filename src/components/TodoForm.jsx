import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const TodoForm = ({ onSubmit, initialValue }) => {
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: initialValue.title || "",
    description: initialValue.description || "",
    isDone: initialValue.isDone || false,
    deadline: initialValue.deadline || "",
    tags: initialValue.tags || "",
  });

  const handleChangeInput = e => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const handleButtonClick = () => {
    onSubmit(todo);
    setTodo({
      title: "",
      description: "",
      isDone: false,
      deadline: "",
      tags: "",
    });
    navigate("/");
  };

  return (
    <div className='text-sm flex flex-col'>
      <div className='w-[580px] h-[auto] m-auto pt-10'>
        <Button />
        <form className='w-[580px] h-[auto] m-auto p-4 mb-4 bg-purple-100 rounded-lg border border-purple-500'>
          <div className='mb-4'>
            <label htmlFor='title' className='text-md'>
              Title
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={todo.title}
              onChange={handleChangeInput}
              className='w-full p-2 border border-gray-300 focus:outline-none rounded'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='description' className='text-md'>
              Description
            </label>
            <textarea
              id='description'
              name='description'
              value={todo.description}
              onChange={handleChangeInput}
              rows='4'
              style={{ resize: "none" }}
              className='w-full p-2 border border-gray-300 focus:outline-none rounded'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='deadline' className='text-md'>
              Deadline
            </label>
            <input
              type='date'
              id='deadline'
              name='deadline'
              value={todo.deadline}
              onChange={handleChangeInput}
              className='w-full p-2 border border-gray-300 focus:outline-none rounded'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='tags' className='text-md'>
              Tags
            </label>
            <select
              id='tags'
              name='tags'
              value={todo.tags}
              onChange={handleChangeInput}
              className='w-full p-2 border border-gray-300 focus:outline-none rounded'
            >
              <option value=''>Select a tag</option>
              <option value='시작 전'>시작 전</option>
              <option value='진행 중'>진행 중</option>
              <option value='완료'>완료</option>
            </select>
          </div>
        </form>
        <div className='py-2'>
          <button
            type='button'
            onClick={handleButtonClick}
            className='bg-purple-600 text-white text-sm w-auto px-4 py-2 rounded-full flex ml-auto'
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
