import { useEffect, useState } from "react";
import { useCurrentFunction } from "../hooks";

interface Props {
  goBack: () => void,
}

function HookImplementation({ goBack }: Props) {
  const [count, setCount] = useState(0);

  // Notice how, by implementing our own custom hook, we don't just make the code
  // cleaner, we make the event listener useEffect look the same way the broken,
  // naive implementation does, except it works.
  const stateDependentFunction = useCurrentFunction(() => {
    return () => alert(`Count is ${count}.`);
  }, [count]);

  useEffect(() => {
    addEventListener("doAlert", stateDependentFunction);
    return () => removeEventListener("doAlert", stateDependentFunction);
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

export default HookImplementation;
