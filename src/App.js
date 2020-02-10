/* global google */
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Firebase, {FirebaseProvider} from './firebase'
import Navbar from "./components/navbar/Navbar"
import routes from "./routes"

function App() {
  return (
    <Router basename={process.env.REACT_APP_BASENAME || ""}>
      <div>
        <Navbar />
        
        {routes.map((route, index) => {
          return (
            <FirebaseProvider value={Firebase}>
              <Route
                path={route.path}
                exact={route.exact}
                key={index}
                render={(props) => <route.component {...props} />}
              />
              </FirebaseProvider>
          );
        })}
        
      </div>
    </Router>
  );
}

export default App;

