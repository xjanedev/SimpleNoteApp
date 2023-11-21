import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createTodo, fetchTodo, updateTodo, deleteTodo } from "../api/todos";
import { v4 as uuidv4 } from "uuid";

const useTodoActions = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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

  const addTodoMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      navigate("/");
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDeleteTodo = id => {
    deleteTodoMutation.mutate(id);
  };

  const handleAddTodo = todo => {
    addTodoMutation.mutate({
      id: uuidv4(),
      ...todo,
    });
  };

  const handleUpdateTodo = updatedTodo => {
    updateTodoMutation.mutate({ id, ...updatedTodo });
  };

  const handleSubmit = updatedTodo => {
    updateTodoMutation.mutate({ id, ...updatedTodo });
  };

  return {
    navigate,
    isLoading,
    isError,
    todo,
    error,
    handleSubmit,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};

export default useTodoActions;
