import { memo } from "react";

function Header() {
  return (
    <>
      <div className='py-3 px-3 border-b'>✏️</div>
    </>
  );
}

const OptimizedHeaderComponent = memo(Header);

export default OptimizedHeaderComponent;
