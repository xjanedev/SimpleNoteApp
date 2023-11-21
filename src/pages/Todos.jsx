import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchTodo } from "../api/todos";
import Button from "../components/Button";

const Todos = () => {
  const { id } = useParams();
  const {
    isLoading,
    isError,
    data: todo,
    error,
  } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => fetchTodo(id),
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div className='text-sm flex flex-col items-center py-3 pt-10'>
      <div className='w-[580px]'>
        <Button />
      </div>
      <div className='w-[580px] h-[500px] p-4 mb-4 bg-purple-100 rounded-lg border border-purple-500'>
        <h3 className='text-2xl font-bold text-gray-900 mb-2'>{todo.title}</h3>
        {todo.deadline && (
          <div className='text-gray-500 text-sm mb-2'>
            마감일: {new Date(todo.deadline).toLocaleDateString()}
          </div>
        )}
        <div className='flex space-x-2 pb-6'>
          {todo.tags &&
            todo.tags.split(",").map((tag, index) => (
              <div
                key={index}
                className={`text-gray-100 text-sm px-2 py-1 rounded ${
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
        <p className='text-gray-600 mb-4 border-t pt-4 border-purple-500'>
          {todo.description}
        </p>
      </div>
    </div>
  );
};

export default Todos;
