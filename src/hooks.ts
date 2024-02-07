import { useEffect, useRef } from "react";

type StateDependentFunction<T extends any[] = any[]> = (...args: T) => void;

export function useCurrentFunction(getFunc: () => StateDependentFunction, deps?: React.DependencyList) {
  const funcRef = useRef(getFunc());

  if (deps) {
    useEffect(() => {
      funcRef.current = getFunc();
    }, deps);
  } else {
    funcRef.current = getFunc();
  }

  const wrappedFunc = () => funcRef.current();
  return wrappedFunc;
}