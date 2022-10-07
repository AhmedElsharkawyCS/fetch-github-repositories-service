import axios from "axios"
import { Repository } from "../models"
import { GetRepositoriesSearchQuery, RepositoryResponse } from "../@types"
import config from "../config"

class RepositoryService {
  constructor() {}

  /**
   * @description get repositories from github api
   * @param param0 - pageSize, fromDate, programmingLanguage
   * @returns {Promise<RepositoryResponse<Repository>>}
   * @example const repositories = await repositoryService.getRepositories({ pageSize: 10, fromDate: "2021-01-01", programmingLanguage: "javascript" })
   */
  async getRepository({ pageSize, programmingLanguage, fromDate }: GetRepositoriesSearchQuery): Promise<RepositoryResponse<Repository>> {
    let searchQuey = `sort=stars&order=desc`
    if (pageSize) searchQuey += `&per_page=${pageSize}`
    if (programmingLanguage || fromDate) {
      searchQuey += `&q=`
      if (programmingLanguage) searchQuey += `language:${programmingLanguage}`
      if (fromDate) searchQuey += `+created:>${fromDate}`
    }
    const { data } = await axios.get(`${config.GITHUB_API_BASE_URL}/search/repositories?${searchQuey}`)
    return data
  }
}

export const repositoryService = new RepositoryService()
