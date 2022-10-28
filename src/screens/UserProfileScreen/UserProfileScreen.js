import { useState, useEffect } from 'react';
import GithubService from '../../services/GithubService';
import Paginator from '../../shared_components/Paginator/Paginator';
import './UserProfileScreen.css';

function UserProfileScreen(props)
{
    const reposPerPage = 5;
    const [user, setUser] = useState(null);
    const [reposPage, setReposPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const service = new GithubService();
                const user = props.user;
                user.detailedUserInfo = await service.getUserByLogin(props.user.login);
                user.repos = await service.getUserReposByLoginn(props.user.login, reposPerPage, reposPage);
                setUser(user);    
            } catch (error) {
                window.alert('Something went wrong getting user repos from GitHub API!')
                console.log(error);                
            }   
        }
    
        fetchData();
      }, [])

    const paginate = async (toPage) => {

        try {
            const service = new GithubService();
            const repos = await service.getUserReposByLoginn(props.user.login, reposPerPage, toPage);
            setUser(Object.assign(user, { repos }));
            setReposPage(toPage);
        } 
        catch (error) 
        {
            window.alert('Something went wrong getting user repos from GitHub API!')
            console.log(error);            
        }
    }

    

    return <div className='screen user-profile'>
        {!user && 
            <div>Loading detailed user data</div>
        }
        { 
            user &&
            <>
            <div id='user-profile'>
                <div id='user-image'>
                    <img src={props.user.avatar_url}/>
                </div>
                <div id="user-info">
                    <div className='user-prop-label'>Login</div>
                    <div className='user-prop-value'>{ user.login }</div>
                    <div className='user-prop-label'>Name</div>
                    <div className='user-prop-value'>{ user.detailedUserInfo?.name || "Name is undefined" }</div>
                    <div className='user-prop-label'>Email</div>
                    <div className='user-prop-value'>{ user.detailedUserInfo?.name || "Emaill is undefined" }</div>
                    <div className='user-prop-label'># public repositories</div>
                    <div className='user-prop-value'>{ user.detailedUserInfo?.public_repos }</div>
                </div>
            </div>
            <div id='user-repos'>
                { (user.repos || []).length === 0 && 
                    <h2>This user has no public repositories</h2>
                }
                { (user.repos || []).length > 0 && <>
                    <h2>Repos</h2>
                    { (user.repos || []).map(repo =>
                    <div className='repo' key={`repo_${repo.id}`}>
                        <div className='repo-name'>{repo.name}</div>
                        <div className='repo-description'>{repo.description || "No description provided"}</div>    
                    </div>
                    )}
                    <Paginator items={user.repos || []} current={reposPage} perpage={reposPerPage} total={user.detailedUserInfo?.public_repos|| 0} onPaginate={paginate}/>
                </>}
            </div>
            <div id='back-to-search'>
                <input id="back-button" type="button" value="Back to Search Results" onClick={props.onBack}/>
            </div>
            </>
        }
    </div>
}

export default UserProfileScreen;