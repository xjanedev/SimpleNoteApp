import { useState } from "react";
import TodoItem from "../components/TodoItem";
import { useTodos } from "../hooks/useTodos";
import "../index.css";

const TodoView = () => {
  const [search, setSearch] = useState("");
  const { isLoading, isError, data: todos, error } = useTodos();

  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  const filteredTodos = () => {
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

  console.log(search);

  return (
    <div>
      <input
        className='w-[280px] pt-14 border-b border-gray-200 py-2 focus:outline-none focus:border-purple-600 text-xs'
        value={search}
        onChange={onChangeSearch}
        placeholder='검색어를 입력하세요'
      />
      <div className='pt-14 grid grid-cols-2 gap-4'>
        {filteredTodos().map(todo => (
          <TodoItem key={todo.id} todo={todo} data={todos} />
        ))}
      </div>
    </div>
  );
};

export default TodoView;
