import type { AgentInput } from '../agents/CardioAgent'

export const input: AgentInput = {
  metrics: [
    {
      name: 'Resting Heart Rate',
      value: 72,
      unit: 'bpm',
      timestamp: new Date('2025-09-21T08:00:00Z')
    },
    {
      name: 'VO2 max',
      value: 28,
      unit: 'ml/kg/min',
      timestamp: new Date('2025-09-20T07:30:00Z')
    },
    {
      name: 'HRV',
      value: 25,
      unit: 'ms',
      timestamp: new Date('2025-09-21T08:00:00Z')
    }
  ],
  userProfile: {
    age: 45,
    sex: 'male',
    goals: ['Increase HRV', 'Improve sleep quality']
  }
}