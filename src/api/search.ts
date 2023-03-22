import { AxiosInstance } from 'axios';
import { createGithubAxiosInstance } from 'utils/axios';
import type {SearchReturnType} from 'api/type'

class GithubSearch {
  private axiosInstance: AxiosInstance;

  constructor(token: string) {
    this.axiosInstance = createGithubAxiosInstance(token,{
        'accept': 'application/vnd.github+json'
    });
  }

  async search(searchType: string, query: string, params: Record<string, any> = {}): Promise<SearchReturnType> {
    try {
      const response = await this.axiosInstance.get(`/${searchType}`, {
        params: { q: query, ...params },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }
}

export default GithubSearch;
