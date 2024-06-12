import { API_VERSION } from '@/constants/common'
import type { IApiResponse } from '@/types/api'
import type { IMatchPrediction } from '@/types/match'
import ENDPOINT from '@/constants/endpoint'
/*
- example
- todo
*/

const getHotMatch = async (payload: string): Promise<IApiResponse<IMatchPrediction>> => {
  return await useApi(`${API_VERSION.V2}${ENDPOINT.match.hotmatch}${payload}`)
}
export interface RepoMatch {
  getHotMatch: (payload: string) => Promise<IApiResponse<IMatchPrediction>>
}

const matchs: RepoMatch = {
  getHotMatch
}
export default matchs
