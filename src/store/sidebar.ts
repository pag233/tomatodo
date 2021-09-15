import { Module } from 'vuex';
import { RootStateType } from './index'


interface SideBarListType {
  listType: ListsTypes,
  name: string,
  setItemCount: SetItemCountType,
}

export interface SetItemCountType {
  (items: SideBarListItemType[]): number
}

interface SideBarUserCreateListType {
  listType: ListsTypes.user,
  name: string,
  setItemCount: typeof userCreateListSetItemCount,
  isDeletable: true
}

const userCreateListSetItemCount = (items: SideBarListItemType[], listType: string): number => (
  items.filter(item => item.listType === listType).length
)

interface SideBarListItemType {
  title: string,
  listType: ListsTypes,
  step?: string[],
  isComplete?: boolean,
  isImportant?: boolean,
  isOnTomato?: boolean,
  remindDate?: Date,
  deadLine?: Date,
  repeat?: "day" | "week" | "month" | "year" | "workday",
  note?: string,
}

interface selectType {
  listType: ListsTypes
}

export interface SideBarStateType {
  lists: SideBarListType[]
  userCreateList: SideBarUserCreateListType[];
  items: SideBarListItemType[]
  select: selectType
}

export enum ListsTypes {
  tomato = 'tomato',
  tasks = 'tasks',
  important = 'important',
  plains = 'plains',
  user = 'user',
}

export const SideBarState: SideBarStateType = {
  lists: [
    {
      listType: ListsTypes.tomato,
      name: ListsTypes.tomato,
      setItemCount(items: SideBarListItemType[]): number {
        return items.filter(item => item.isOnTomato).length
      },
    },
    {
      listType: ListsTypes.tasks,
      name: ListsTypes.tasks,
      setItemCount(items: SideBarListItemType[]): number {
        return items.length
      },
    },
    {
      listType: ListsTypes.important,
      name: ListsTypes.important,
      setItemCount(items: SideBarListItemType[]): number {
        return items.filter(item => item.isImportant).length
      },
    },
    {
      listType: ListsTypes.plains,
      name: ListsTypes.plains,
      setItemCount(items: SideBarListItemType[]): number {
        return items.filter(item => item.remindDate || item.deadLine || item.repeat).length
      },
    },
  ],
  userCreateList: [
    {
      listType: ListsTypes.user,
      name: 'foobar',
      setItemCount: userCreateListSetItemCount,
      isDeletable: true,
    }
  ],
  items: [
    {
      title: 'foobar',
      listType: ListsTypes.tomato,
      isOnTomato: true,
    }
  ],
  select: {
    listType: ListsTypes.tomato,
  }
}

export const SideBarStore: Module<SideBarStateType, RootStateType> = {
  namespaced: true,
  state() {
    return SideBarState
  },
  getters: {
    getLists(state) {
      return state.lists;
    },
    getUserCreateLists(state) {
      return state.userCreateList;
    }
  },
  mutations: {
    setSelectName(state, payload) {
      state.select.listType = payload.listType
    }
  }
}