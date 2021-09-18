import { InjectionKey } from 'vue'
import { createStore, Store, useStore as useBaseStore } from 'vuex'

import { I18nState, I18nStore } from './i18n'
import { SearchState, SearchStore } from './search'
import { ListState, ListStore } from './list'

export type RootStateType = typeof rootState

const rootState = {
  i18n: I18nState,
  search: SearchState,
  list: ListState,
}

export const key: InjectionKey<Store<RootStateType>> = Symbol('RootStoreKey')

export default createStore<RootStateType>({
  modules: {
    i18n: I18nStore,
    search: SearchStore,
    list: ListStore,
  }
})

export function useStore(): Store<RootStateType> {
  return useBaseStore(key)
}