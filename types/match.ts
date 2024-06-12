export interface IPayload {
  id: number
}

interface Odds {
  1: number
  2: number
  12: number
  X: number
  '1X': number
  X2: number
}

export interface IMatchPrediction {
  home_team: string
  away_team: string
  id: number
  market: string
  competition_name: string
  prediction: string
  competition_cluster: string
  status: string
  federation: string
  is_expired: boolean
  season: string
  result: string
  start_date: string
  last_update_at: string
  odds: Odds
}
