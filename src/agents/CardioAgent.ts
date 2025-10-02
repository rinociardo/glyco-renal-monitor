export interface HealthMetric {
  name: string
  value: number
  unit: string
  timestamp: Date
}

export interface AgentInput {
  metrics: HealthMetric[]
  userProfile: {
    age: number
    sex: 'male' | 'female' | 'other'
    goals: string[]
  }
}

export interface AgentOutput {
  status: 'optimal' | 'elevated' | 'critical'
  insights: string[]
  recommendations: string[]
  explanation: string
}

export class CardioAgent {
  private input: AgentInput

  constructor(input: AgentInput) {
    this.input = input
  }

  evaluate(): AgentOutput {
    const vo2 = this.getMetric('VO2 max')
    const rhr = this.getMetric('Resting Heart Rate')
    const hrv = this.getMetric('HRV')

    const status = this.classify(vo2, rhr, hrv)
    const insights = this.generateInsights(vo2, rhr, hrv)
    const recommendations = this.suggestActions(status)
    const explanation = this.explain(status, insights)

    return { status, insights, recommendations, explanation }
  }

  private getMetric(name: string): HealthMetric | null {
    return this.input.metrics.find(m => m.name === name) || null
  }

  private classify(
    vo2: HealthMetric | null,
    rhr: HealthMetric | null,
    hrv: HealthMetric | null
  ): 'optimal' | 'elevated' | 'critical' {
    const vo2Value = vo2?.value ?? 0
    const rhrValue = rhr?.value ?? 100
    const hrvValue = hrv?.value ?? 0

    if (vo2Value < 30 || rhrValue > 90 || hrvValue < 20) return 'critical'
    if (vo2Value < 40 || rhrValue > 80) return 'elevated'
    return 'optimal'
  }

  private generateInsights(
    vo2: HealthMetric | null,
    rhr: HealthMetric | null,
    hrv: HealthMetric | null
  ): string[] {
    const vo2Value = vo2?.value ?? 0
    const rhrValue = rhr?.value ?? 0
    const hrvValue = hrv?.value ?? 0

    const vo2Unit = vo2?.unit ?? 'ml/kg/min'
    const rhrUnit = rhr?.unit ?? 'bpm'
    const hrvUnit = hrv?.unit ?? 'ms'

    return [
      `VO₂ max: ${vo2Value} ${vo2Unit}`,
      `Resting HR: ${rhrValue} ${rhrUnit}`,
      `HRV: ${hrvValue} ${hrvUnit}`
    ]
  }

  private suggestActions(status: 'optimal' | 'elevated' | 'critical'): string[] {
    if (status === 'critical') return ['Consult a physician', 'Reduce stress', 'Improve sleep hygiene']
    if (status === 'elevated') return ['Add 20 min of cardio 3x/week', 'Track sleep duration']
    return ['Maintain current routine', 'Monitor weekly trends']
  }

  private explain(status: string, insights: string[]): string {
    return `Status: ${status}. ${insights.join(' | ')}`
  }
}
