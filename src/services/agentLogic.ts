// src/services/agentLogic.ts
import type { Entry, AgentFeedback } from '../types/Entry'

export function evaluateEntry(entry: Entry): Entry {
  let feedback: AgentFeedback = {
    severity: 'bassa',
    suggestion: 'Nessuna azione necessaria',
    rule_triggered: 'nessuna'
  }

  if (entry.meal.glucose_post > 180) {
    feedback = {
      severity: 'media',
      suggestion: 'Controllare l’assunzione di carboidrati e monitorare la glicemia',
      rule_triggered: 'glicemia post-prandiale > 180 mg/dL'
    }
  }

  if (entry.renal.eGFR < 60) {
    feedback = {
      severity: 'alta',
      suggestion: 'Consultare un nefrologo e monitorare la funzione renale',
      rule_triggered: 'eGFR < 60'
    }
  }

  return {
    ...entry,
    agent_feedback: feedback
  }
}
