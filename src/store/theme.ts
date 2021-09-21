import { Module } from 'vuex';
import { RootStateType } from './index'

const ThemeColors = {
  tomato: '#bf0a2b',
  leaf: '#65bfaf',
  yellow: '#c7aa57',
  pink: '#f27983',
  blue: '#009dcf',
}

export interface ThemeStateType {
  currentTheme: keyof typeof ThemeColors
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
    getThemeColor(state) {
      return ThemeColors[state.currentTheme];
    }
  },
  mutations: {
    setCurrentTheme(state, payload) {
      state.currentTheme = payload.theme
    }
  }
}