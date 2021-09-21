import { Module } from 'vuex';
import { RootStateType } from './index'
import { join2Filters } from '@/helper'

interface SideBarListType {
  listType: ListsTypes,
  name: string,
  setItemCount: SetItemCountType,
}

export interface SetItemCountType {
  (items: ListItemType[]): number
}

interface SideBarUserCreateListType {
  listType: ListsTypes.user,
  name: string,
  setItemCount: typeof userCreateListSetItemCount,
  isDeletable: true
}

const userCreateListSetItemCount = (items: ListItemType[], listType: string): number => (
  items.filter(item => item.listType === listType).length
)

export interface ListItemStepType {
  id: number,
  title: string,
  isComplete?: boolean,
}

export interface ListItemType extends ListItemStepType {
  // id: number,
  // title: string,
  // isComplete?: boolean,
  listType: ListsTypes,
  createdDate: Date,
  steps: ListItemStepType[],
  isImportant?: boolean,
  isOnTomato?: boolean,
  remindDate?: Date,
  deadLine?: Date,
  repeat?: "day" | "week" | "month" | "year" | "workday",
  note?: Date,
}

interface selectType {
  listType: ListsTypes,
  item: ListItemType | null,
}

export interface ListStateType {
  lists: SideBarListType[]
  userCreateList: SideBarUserCreateListType[]
  items: ListItemType[]
  select: selectType
}

export enum ListsTypes {
  tomato = 'tomato',
  tasks = 'tasks',
  important = 'important',
  plans = 'plans',
  user = 'user',
}

function noCompleteFilter(item: ListItemType): boolean {
  return !item.isComplete
}
const withNoCompleteFiter = join2Filters(noCompleteFilter);

const getTomatoItems = (items: ListItemType[]) =>
  items.filter(withNoCompleteFiter(item => item.isOnTomato ? true : false))


export const ListState: ListStateType = {
  lists: [
    {
      listType: ListsTypes.tomato,
      name: ListsTypes.tomato,
      setItemCount(items: ListItemType[]): number {
        return getTomatoItems(items).length
      },
    },
    {
      listType: ListsTypes.tasks,
      name: ListsTypes.tasks,
      setItemCount(items: ListItemType[]): number {
        return items.length
      },
    },
    {
      listType: ListsTypes.important,
      name: ListsTypes.important,
      setItemCount(items: ListItemType[]): number {
        return items.filter(item => item.isImportant).length
      },
    },
    {
      listType: ListsTypes.plans,
      name: ListsTypes.plans,
      setItemCount(items: ListItemType[]): number {
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
      id: 0,
      title: 'foofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoo',
      listType: ListsTypes.tasks,
      createdDate: new Date(),
      steps: [
        {
          id: 0,
          isComplete: false,
          title: 'step 1'
        },
        {
          id: 1,
          isComplete: true,
          title: 'step 2'
        }
      ],
      isOnTomato: true,
      isImportant: true,
      remindDate: new Date(),
      deadLine: new Date(),
      repeat: 'day',
    },
    {
      id: 1,
      title: 'bar',
      listType: ListsTypes.tasks,
      createdDate: new Date(),
      steps: [],
      isOnTomato: true,
    },
    {
      id: 2,
      title: 'foobar',
      listType: ListsTypes.tasks,
      createdDate: new Date(),
      steps: [],
      isOnTomato: true,
    },
  ],
  select: {
    listType: ListsTypes.tomato,
    item: null,
  },
}

function getItemById<T extends ListItemStepType | ListItemType>(items: T[], id: number): T {
  const result = items.find((item) => item.id === id)
  if (!result) throw new Error("Can't find item while setting attribute")
  return result
}

function getSelectItem(state: ListStateType): ListItemType {
  const selectItem = state.select.item
  if (!selectItem) throw new Error('Store Error: mutation getSelectItem Failed. Null select item.')
  return selectItem
}

export const ListStore: Module<ListStateType, RootStateType> = {
  namespaced: true,
  state() {
    return ListState
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
    getSelectItem(state) {
      return state.select.item;
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
    },
    setItemStepComplete(state, payload) {
      const item = getSelectItem(state);
      const step = getItemById(item.steps, payload.id);
      step.isComplete = payload.isComplete;
    },
    addItemStep(state, payload) {
      const item = getSelectItem(state);
      item.steps = [...item.steps, {
        id: item.steps.length,
        title: payload.title,
        isComplete: false,
      }]
    },
    setSelectItem(state, payload) {
      const item = getItemById(state.items, payload.id);
      state.select.item = item;
    },
    removeItemStep(state, payload) {
      const selectItem = getSelectItem(state);
      selectItem.steps = selectItem.steps.filter(step => step.id !== payload.id);
    },
  }
}