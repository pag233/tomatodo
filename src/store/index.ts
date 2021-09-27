import { InjectionKey } from 'vue'
import { createStore, Store, useStore as useBaseStore } from 'vuex'

import { I18nStateType, I18nStore } from './i18n'
import { SearchStateType, SearchStore } from './search'
import { ListStateType, ListStore } from './list'
import { ThemeStateType, ThemeStore } from './theme'
import { TimeoutsStateType, TimeoutsStore } from './timeouts'

export interface RootStateType {
  i18n: I18nStateType
  search: SearchStateType
  list: ListStateType
  theme: ThemeStateType
  timeouts: TimeoutsStateType
}

export const key: InjectionKey<Store<RootStateType>> = Symbol('RootStoreKey')

export default createStore<RootStateType>({
  modules: {
    i18n: I18nStore,
    search: SearchStore,
    list: ListStore,
    theme: ThemeStore,
    timeouts: TimeoutsStore,
  }
})

export function useStore(): Store<RootStateType> {
  return useBaseStore(key)
}