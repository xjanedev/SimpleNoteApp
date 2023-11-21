import TodoForm from "../components/TodoForm";
import useNoteActions from "../hook/useTodoActions";

const TodoEditor = () => {
  const { isLoading, isError, todo, error, handleSubmit } = useNoteActions();

  if (isLoading) return "loading...";
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <TodoForm onSubmit={handleSubmit} initialValue={todo} />
    </div>
  );
};

export default TodoEditor;
