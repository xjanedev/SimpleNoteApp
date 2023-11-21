import { useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todos";
import useNoteActions from "../hook/useTodoActions";

function TodoItem({ todo }) {
  const queryClient = useQueryClient();
  const { navigate, handleDeleteTodo } = useNoteActions({
    todo,
  });

  const onChangeCheckbox = () => {
    const updatedTodo = { ...todo, isDone: !todo.isDone };
    const optimisticUpdate = oldData => {
      return oldData.map(item =>
        item.id === updatedTodo.id ? updatedTodo : item
      );
    };

    updateTodo(updatedTodo)
      .then(() => {})
      .catch(() => {});
    queryClient.setQueryData(["todos"], optimisticUpdate);
  };

  return (
    <div key={todo.id} className='p-4 mb-4 bg-purple-100 rounded-lg text-sm'>
      <div className='flex items-center pb-2'>
        <input
          type='checkbox'
          onChange={onChangeCheckbox}
          checked={todo.isDone || false}
          className='hidden'
        />
        <label
          className='inline-flex items-center justify-center h-5 w-5 mr-2 border-2 border-purple-500 rounded-md bg-purple-200 cursor-pointer'
          onClick={onChangeCheckbox}
        >
          {todo.isDone && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              className='h-3 w-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='3'
                d='M5 13l4 4L19 7'
              />
            </svg>
          )}
        </label>
        <h4
          className='text-gray-900 cursor-pointer'
          onClick={() => navigate(`/todo/${todo.id}`)}
        >
          {todo.title}
        </h4>
      </div>
      {todo.deadline && (
        <div className='text-gray-500 text-xs pb-3'>
          마감일: {new Date(todo.deadline).toLocaleDateString()}
        </div>
      )}
      {todo.tags && (
        <div className='flex space-x-2 pb-2'>
          {todo.tags.split(",").map((tag, index) => (
            <div
              key={index}
              className={`text-gray-100 text-xs px-2 py-1 rounded-md ${
                tag === "시작 전"
                  ? "bg-blue-500"
                  : tag === "진행 중"
                  ? "bg-yellow-500"
                  : tag === "완료"
                  ? "bg-green-500"
                  : "bg-gray-300"
              }`}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
      <div className='text-gray-500 text-xs line-clamp-1'>
        {todo.description}
      </div>
      <div className='flex justify-end pt-4 gap-2'>
        <button
          className='bg-purple-500 text-white w-auto px-4 py-2 rounded-full'
          onClick={() => navigate(`/todo/${todo.id}/edit`)}
        >
          Edit
        </button>
        <button
          className='bg-purple-600 text-white w-auto px-4 py-2 rounded-full'
          onClick={() => handleDeleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
