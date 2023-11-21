import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../api/todos";
import "../index.css";
import TodoItem from "../components/TodoItem";

const TodoView = () => {
  const [search, setSearch] = useState("");

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

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  const filterTodos = () => {
    if (!todos) return [];

    if (search === "") {
      return todos;
    }

    return todos.filter(todo => {
      if (todo.title && todo.description) {
        return todo.title.toLowerCase().includes(search.toLowerCase());
      }
      return false;
    });
  };

  return (
    <div>
      <input
        className='w-[280px] pt-14 border-b border-gray-200 py-2 focus:outline-none focus:border-purple-600 text-xs'
        value={search}
        onChange={onChangeSearch}
        placeholder='검색어를 입력하세요'
      />
      <div className='pt-14 grid grid-cols-2 gap-4'>
        {filterTodos().map(todo => (
          <TodoItem key={todo.id} todo={todo} data={todos} />
        ))}
      </div>
    </div>
  );
};

export default TodoView;
