import { Module } from 'vuex';
import { RootStateType } from './index'

export interface SearchStateType {
  value: string
}

export const SearchState: SearchStateType = {
  value: ''
}

export const SearchStore: Module<SearchStateType, RootStateType> = {
  namespaced: true,
  state() {
    return SearchState
  },
  mutations: {
    setSearchValue(state, payload) {
      state.value = payload.value
    }
  }
}