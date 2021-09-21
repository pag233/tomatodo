import { Module } from 'vuex';
import { RootStateType } from './index'

const ThemeColors = {
  tomato: '#cc6666',
  leaf: '#65bfaf',
  yellow: '#f2ac57',
  pink: '#f27983',
  blue: '#009dcf',
}

export type ThemeNameType = keyof typeof ThemeColors

export interface ThemeStateType {
  currentTheme: ThemeNameType,
}

interface Payload {
  theme: ThemeNameType,
}

export const ThemeState: ThemeStateType = {
  currentTheme: 'tomato'
}

export const ThemeStore: Module<ThemeStateType, RootStateType> = {
  namespaced: true,
  state() {
    return ThemeState
  },
  getters: {
    getCurrentThemeColor(state) {
      return ThemeColors[state.currentTheme];
    },
    getThemeColor() {
      return (payload: Payload) => ThemeColors[payload.theme]
    }
  },
  mutations: {
    setCurrentTheme(state, payload: Payload) {
      state.currentTheme = payload.theme
    }
  }
}