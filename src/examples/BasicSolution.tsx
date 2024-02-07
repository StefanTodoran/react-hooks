import { useEffect, useRef, useState } from "react";

interface Props {
  goBack: () => void,
}

function BasicSolution({ goBack }: Props) {
  const [count, setCount] = useState(0);

  // This updating of the state-dependent function closure could be done within
  // a useEffect, but a function declaration isn't really expensive enough to
  // warrant this. 
  const stateDependentFunction = useRef(() => {});
  stateDependentFunction.current = () => alert(`Count is ${count}.`);

  useEffect(() => {
    // We do need to wrap our ref, so that the event listener functions have a 
    // consistent pointer (we can't just pass stateDependentFunction.current directly).
    const wrappedFunction = () => stateDependentFunction.current();
    addEventListener("doAlert", wrappedFunction); 
    return () => removeEventListener("doAlert", wrappedFunction);
  }, []); 

  return (
    <>
      <div className="title">
        <button onClick={goBack}>👈</button>
        <h1>Basic Solution</h1>
      </div>

      <p>
        Count: {count}
      </p>
      <button onClick={() => setCount((count) => count + 1)}>
        Increment Count ➕
      </button>
      <button onClick={() => {
        const event = new Event("doAlert");
        dispatchEvent(event);
      }}>
        Trigger Event 🚨
      </button>
    </>
  );
}

export default BasicSolution;
