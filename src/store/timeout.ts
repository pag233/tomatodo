import { Module } from 'vuex'
import { RootStateType } from './index'

interface TimeoutType {
  id: number
  clearId: number
  timeout: number
}

export interface TimeoutStateType {
  timeout: TimeoutType[]
}
export const TimeoutState: TimeoutStateType = {
  timeout: []
}

export const TimeoutStore: Module<TimeoutStateType, RootStateType> = {
  namespaced: true,
  state() {
    return TimeoutState
  }
}