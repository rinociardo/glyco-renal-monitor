export interface Entry {
  entry_id: string
  timestamp: string
  meal: {
    carbs: number
    glucose_pre: number
    glucose_post: number
    insulin_dose: number | null
  }
  renal: {
    creatinine: number
    eGFR: number
  }
  symptoms: string[]
  context_notes: {
    medications: string[]
    activities: string[]
    stress_level: 'basso' | 'moderato' | 'alto'
    additional_notes: string
  }
  agent_feedback?: AgentFeedback | null
}

export interface AgentFeedback {
  suggestion: string
  severity: 'bassa' | 'media' | 'alta'
  rule_triggered: string
}
