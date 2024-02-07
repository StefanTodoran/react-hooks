import { useState } from "react";
import BrokenListener from "./examples/BrokenListener";
import BasicSolution from "./examples/BasicSolution";
import HookImplementation from "./examples/HookImplementation";
import "./App.css";

enum Page {
  MENU,
  BROKEN,
  SOLUTION,
  HOOK,
}

function App() {
  const [page, setPage] = useState<Page>(Page.MENU);
  const goBack = () => setPage(Page.MENU);

  switch (page) {
    case Page.MENU:
      return (
        <>
          <p>
            Using state-depedent functions and ensure up-to-date state values
            when called from useEffects which should trigger infrequently (or
            less frequently than said state updates).
          </p>
          <div className="row">
            <button onClick={() => setPage(Page.BROKEN)}>Problem Illustration</button>
            <button onClick={() => setPage(Page.SOLUTION)}>Basic Solution</button>
            <button onClick={() => setPage(Page.HOOK)}>Hook Implementation</button>
          </div>
        </>
      );
    case Page.BROKEN:
      return <BrokenListener goBack={goBack} />;
    case Page.SOLUTION:
      return <BasicSolution goBack={goBack} />;
    case Page.HOOK:
      return <HookImplementation goBack={goBack} />;
  }
}

export default App;
