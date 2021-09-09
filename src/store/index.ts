import { InjectionKey } from 'vue'
import { createStore, Store, useStore as useBaseStore } from 'vuex'
import I18nStore from './i18n'

const rootState = {
  i18n: I18nStore.state
}

type RootStateType = typeof rootState

export const key: InjectionKey<Store<RootStateType>> = Symbol()

export default createStore<RootStateType>({
  modules: {
    i18n: {
      namespaced: true,
      ...I18nStore
    }
  }
})

export function useStore(): Store<RootStateType> {
  return useBaseStore(key)
}