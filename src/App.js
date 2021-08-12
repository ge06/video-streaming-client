import './App.css';
import AuthPage from "./pages/AuthPage";
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import UserContext from './context/UserContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [username, setUsername] = useState('')

  useEffect(() => {
    axios.get('http://localhost:4000/user', { withCredentials: true })
      .then(response => {
        setUsername(response.data.username)
      })
  }, [])

  const Logout = () => {
    axios.post('http://localhost:4000/logout', {}, { withCredentials: true })
      .then(() => setUsername(''))
  }

  return (

    <UserContext.Provider value={{ username, setUsername }}>

      <Router className="App">
        <div>
          {username && (
            <div>Logged in as {username}
              <Link to= "/auth"><button onClick={() => Logout()}>Log Out</button></Link>
            </div>

          )}
          {!username && (
            <div>Not Logged in
              <Link to="/auth">
                <button>Login</button>
              </Link>
            </div>

          )}
        </div>
        <hr />

        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/auth" >
            <AuthPage />
          </Route>

        </Switch>

      </Router>
    </UserContext.Provider>
  );
}

export default App;
