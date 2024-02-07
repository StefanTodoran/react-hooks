import { useEffect, useState } from "react";

interface Props {
  goBack: () => void,
}

function BrokenListener({ goBack }: Props) {
  const [count, setCount] = useState(0);
  const stateDependentFunction = () => alert(`Count is ${count}.`);

  useEffect(() => {
    // This reference to stateDependentFunction will point to the function closure
    // generated on first render (so count will always be zero in the alert).
    addEventListener("doAlert", stateDependentFunction); 
    return () => removeEventListener("doAlert", stateDependentFunction);
    
    // We need an empty depedency array, to avoid setting and unsetting the event
    // listener any time count changes. Count doesn't change often, so in theory
    // we could do that, but for a state variable which changes frequently or other
    // situations where we need to specifically trigger only on unmount, this
    // will not be a viable workaround.
  }, []); 

  return (
    <>
      <div className="title">
        <button onClick={goBack}>👈</button>
        <h1>Problem Illustration</h1>
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

export default BrokenListener;
