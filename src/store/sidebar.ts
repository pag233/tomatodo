import { Module } from 'vuex';
import { RootStateType } from './index'
import { join2Filters } from '@/helper'

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

export interface SideBarListItemType {
  id: number,
  title: string,
  listType: ListsTypes,
  createdDate: Date,
  step?: string[],
  isComplete?: boolean,
  isImportant?: boolean,
  isOnTomato?: boolean,
  remindDate?: Date,
  deadLine?: Date,
  repeat?: "day" | "week" | "month" | "year" | "workday",
  note?: Date,
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

function noCompleteFilter(item: SideBarListItemType): boolean {
  return !item.isComplete
}
const withNoCompleteFiter = join2Filters(noCompleteFilter);

const getTomatoItems = (items: SideBarListItemType[]) =>
  items.filter(withNoCompleteFiter(item => item.isOnTomato ? true : false))


export const SideBarState: SideBarStateType = {
  lists: [
    {
      listType: ListsTypes.tomato,
      name: ListsTypes.tomato,
      setItemCount(items: SideBarListItemType[]): number {
        return getTomatoItems(items).length
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
      id: 1,
      title: 'foo',
      listType: ListsTypes.tasks,
      createdDate: new Date(),
      isOnTomato: true,
      isComplete: true,
      isImportant: true,
      remindDate: new Date(),
      deadLine: new Date(),
      repeat: 'day',
    },
    {
      id: 2,
      title: 'bar',
      listType: ListsTypes.tasks,
      createdDate: new Date(),
      // isOnTomato: true,
    },
    {
      id: 3,
      title: 'foobar',
      listType: ListsTypes.tasks,
      createdDate: new Date(),
      isOnTomato: true,
    },
  ],
  select: {
    listType: ListsTypes.tomato,
  }
}


function getItemById(items: SideBarListItemType[], id: number): SideBarListItemType {
  const result = items.find(item => item.id === id)
  if (!result) throw new Error("Can't find item while setting attribute")
  return result
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
    },
    getTomato(state) {
      return getTomatoItems(state.items);
    },
  },
  mutations: {
    setSelectName(state, payload) {
      state.select.listType = payload.listType
    },
    setItemComplete(state, payload) {
      const item = getItemById(state.items, payload.id);
      item.isComplete = payload.isComplete;
    },
    setItemImportant(state, payload) {
      const item = getItemById(state.items, payload.id);
      item.isImportant = payload.isImportant;
    }
  }
}