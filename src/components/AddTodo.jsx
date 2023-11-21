import TodoForm from "./TodoForm";
import useNoteActions from "../hook/useTodoActions";

const AddTodo = () => {
  const { handleAddTodo } = useNoteActions();

  return (
    <div>
      <TodoForm onSubmit={handleAddTodo} initialValue={{}} />
    </div>
  );
};

export default AddTodo;
