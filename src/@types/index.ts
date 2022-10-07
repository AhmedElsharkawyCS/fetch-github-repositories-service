export interface RepositoryResponse<T> {
  total_count: number
  incomplete_results: boolean
  items: T[]
}

export interface GetRepositoriesSearchQuery {
  pageSize: number
  fromDate: string
  programmingLanguage: string
}
