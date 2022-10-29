import { useRef, useContext, createContext } from "react";
import Dashboard from "./components/Dashboard";
import Authentication from "./components/Authentication";
import { useLocalStorage } from "./hooks/useLocalStorage";

const TokenContext = createContext();

export function useToken() {
  return useContext(TokenContext);
}

export default function App() {
  const [token, setToken] = useLocalStorage('token', null);

  const checkboxRef = useRef();

  function openDrawer() {
    checkboxRef.current.checked = true;
  }

  return (
    <TokenContext.Provider value={[token, setToken]}>
      <div className="App">
        {
          token ?
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" ref={checkboxRef} />
              <div className="drawer-content">

                <Dashboard openDrawer={openDrawer} />

              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                  <li><a>Sidebar Item 1</a></li>
                  <li><a>Sidebar Item 2</a></li>
                </ul>
              </div>
            </div> : <Authentication />
        }

      </div>
    </TokenContext.Provider>
  )
}
