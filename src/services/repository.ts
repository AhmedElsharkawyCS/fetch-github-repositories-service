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
  async getRepositories({ pageSize, programmingLanguage, fromDate }: GetRepositoriesSearchQuery): Promise<RepositoryResponse<Repository>> {
    let query = `q=created:>${fromDate}`
    if (programmingLanguage) query += `+language:${programmingLanguage}`
    query += `&sort=stars&order=desc&per_page=${pageSize}`
    const { data } = await axios.get(`${config.GITHUB_API_BASE_URL}/search/repositories?${query}`)
    return data
  }
}

export const repositoryService = new RepositoryService()
