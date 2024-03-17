import { RouterProvider } from "react-router-dom";
import Router from "./router/Router";

function App() {
  return (
    <RouterProvider router={Router} fallbackElement={<>Blank for now</>} />
  );
}

export default App;
