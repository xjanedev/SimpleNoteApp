import { useNavigate } from "react-router-dom";
import { memo } from "react";
function NewTodoBtn() {
  const navigate = useNavigate();

  return (
    <div className='py-3'>
      <button
        className='w-[258px] bg-purple-600 text-white text-sm py-2 rounded-full'
        onClick={() => navigate("/todo/:id/new")}
      >
        Add New Note
      </button>
    </div>
  );
}

const OptimizedComponent = memo(NewTodoBtn);

export default OptimizedComponent;
