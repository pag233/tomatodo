import { Module } from 'vuex'
import { RootStateType } from './index'
import { ListType } from './list'


export interface SelectStateType {
  listName: ListType | 'user'
  itemId: number
}

const SelectState: SelectStateType = {
  listName: ListType.tomato,
  itemId: -1,
}

export const SelectStore: Module<SelectStateType, RootStateType> = {
  namespaced: true,
  state() {
    return SelectState
  },
  getters: {
    getSelectItemId(state) {
      return state.itemId
    },
    getSelectItem(state, getters, rootState) {
      return rootState.list.items.find(item => item.id == state.itemId)
    },
  },
  mutations: {
    setSelectListName(state, payload) {
      state.listName = payload.listName
    },
    setSelectItemId(state, payload) {
      state.itemId = payload.id;
    },
  }
}