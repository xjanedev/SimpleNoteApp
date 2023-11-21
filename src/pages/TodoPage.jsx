import TodoView from "./TodoView";
import TodoSummary from "../components/TodoSummary";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todos";
import NewTodoBtn from "../components/NewTodoBtn";

export default function TodoList() {
  const currentDate = new Date();
  const {
    isLoading,
    isError,
    data: todos,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return "Loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='w-full md:w-1/5 py-6 px-4 md:sticky md:top-0 md:h-screen'>
        <NewTodoBtn />
        <TodoSummary todos={todos} />
      </div>
      <div className='w-full md:w-3/4 py-4 px-4'>
        <h1 className='text-gray-900 py-5 text-2xl'>
          {currentDate.toDateString()}
        </h1>
        <TodoView />
      </div>
    </div>
  );
}
