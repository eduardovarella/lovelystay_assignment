import { useState } from 'react';

import './SearchScreen.css';

import GithubService from '../../services/GithubService';
import Paginator from '../../shared_components/Paginator/Paginator';

function SearchScreen(props)
{
    const usersPerPage = 4;
    const [searchKey, setSearchKey] = useState("");
    const [searchPage, setSearchPage] = useState(1);
    const [searching, setSearching] = useState(false);
    const [loadingUserInfo, setLoadingUserInfo] = useState(false);

    const users = props.result?.items;

    const paginate = async (toPage) => {
        setSearchPage(toPage);
        await searchUsers(toPage);
    }

    const searchUsers = async (toPage) => {

        try 
        {
            setSearching(true);
            const service = new GithubService();
            const searchResult = await service.searchUsersByLogin(searchKey, usersPerPage, toPage || 1);
            props.onSearched(searchResult);
            setSearching(false);
        } 
        catch (error) 
        {
            console.log(error);
            window.alert('Something went wrong getting users from GitHub API!')            
            setSearching(false);
        }
    }

    return <div className='screen search'>
        <div id="search-form">
            <input type="text" id="search-key-input" data-testid="search-key-input" value={searchKey} onChange={(e) => setSearchKey(e.target.value)}/>
            <input disabled={(searchKey === "")} type="button" id="search-button" data-testid="search-button" value="Search" onClick={() => searchUsers(1)}/>
        </div>

        { searching && 
            <div id='searching-message' data-testid='searching-message'>
                Searching Github users...
            </div>
        }

        { loadingUserInfo && 
            <div id='searching-message'>
                Loading user info...
            </div>
        }

          { 
            !searching && users && users.length > 0 && 
            <>
              <div id='user-list'>
              { users.map(user => 
                <div key={`user_` + user.id} className='user-list-item'>
                  <div className='user-image'><img alt={user.login} src={user.avatar_url}/></div>
                  <div className='user-login-label' onClick={() => props.onUserSelected(user)}>{ user.login }</div>
                </div>
              )}
            </div>
                <Paginator items={users} current={searchPage} perpage={usersPerPage} total={props.result?.total_count || 0} onPaginate={paginate}/>
            </>
          }

          { 
            !searching && users && users.length === 0 && 
            <>
              <div id='empty-user-list-message' data-testid='empty-user-list-message'>
               Couldn't find any Github user whoose login contains '{searchKey}'!
              </div>
            </>
          }
    </div>
}

export default SearchScreen;