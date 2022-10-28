import axios from 'axios';

export default class GithubService {

    constructor(){
        this.baseURL = "https://api.github.com";
    }

    searchUsersByLogin = async (searchKey, per_page, page) => {
        try 
        {
          const response = await axios.get(`${this.baseURL}/search/users?sort=login&per_page=${per_page}&page=${page}&q=${searchKey} in:login`);
          return response.data;
        } 
        catch (error) 
        {
          throw error
        }
    }

    getUserByLogin = async (login) => {
        try 
        {
          const response = await axios.get(`${this.baseURL}/users/${login}`);
          return response.data;
        } 
        catch (error) 
        {
          throw error;
        }
    }

    getUserReposByLoginn = async (login, per_page, page) => {
        try 
        {
          const response = await axios.get(`${this.baseURL}/users/${login}/repos?per_page=${per_page}&page=${page}`);
          return response.data;
        } 
        catch (error) 
        {
          throw error;
        }
    }
}