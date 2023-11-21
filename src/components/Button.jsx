import { useNavigate } from "react-router-dom";
import { memo, useCallback } from "react";

function Button() {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <button
      onClick={handleClick}
      className='bg-purple-600 text-white text-sm py-2 px-4 rounded-3xl mb-4'
    >
      Back to Lists
    </button>
  );
}

const OptimizedButtonComponent = memo(Button);

export default OptimizedButtonComponent;
