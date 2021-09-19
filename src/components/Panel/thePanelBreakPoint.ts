export type PanelBreakPointsType = {
  sidebar: number
  content: number
  [key: string]: number
}

export const panelBreakPoints: PanelBreakPointsType = {
  sidebar: 360,
  content: 610,
}