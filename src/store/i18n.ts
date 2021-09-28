import { Module } from 'vuex'
import { RootStateType } from './index'


export interface I18nStateType {
  currentLocale: 'en-us' | 'zh-cn' | 'zh-tw',
}
const I18nState: I18nStateType = {
  currentLocale: 'en-us'
}

export const I18nStore: Module<I18nStateType, RootStateType> = {
  namespaced: true,
  state() {
    return I18nState
  }
}