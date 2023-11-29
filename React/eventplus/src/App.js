import { UserContext } from './context/AuthContext';
import Rotas from './routes'
import { useState } from 'react';

function App() {
    const [userData, setUserData] = useState(UserContext)

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            <Rotas />
        </UserContext.Provider>
    );
}


export default App;
