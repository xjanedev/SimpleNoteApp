import { useQuery } from "@tanstack/react-query";
import { fetchTodo } from "../api/todos";

export const useTodo = id => {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodo(id),
    enabled: !!id,
  });
};
