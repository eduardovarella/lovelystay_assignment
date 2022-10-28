import './App.css';
import { useState } from 'react';
import SearchScreen from './screens/SearchScreen/SearchScreen';
import UserProfileScreen from './screens/UserProfileScreen/UserProfileScreen';
 
function App() 
{
  const [searchResult, setSearchResult] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="App">
      <div id="welcome-message">GitHub users search app</div>
      { 
        !selectedUser && <SearchScreen result={searchResult} onSearched={setSearchResult} onUserSelected={setSelectedUser}/>
      }

      {
        selectedUser && <UserProfileScreen user={selectedUser} onBack={() => setSelectedUser(null)}/>        
      }
      
   </div>
   );
}
 
export default App;