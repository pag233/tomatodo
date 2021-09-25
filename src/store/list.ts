import { Module } from 'vuex'
import { RootStateType } from './index'
import { join2Filters } from '@/helper'
import { getItemById } from '@/helper/store'

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
  listType: ListsTypes,
  createdDate: number,
  steps: ListItemStepType[],
  isImportant?: boolean,
  isOnTomato?: boolean,
  remindDate?: number,
  deadLine?: number,
  repeat?: "day" | "week" | "month" | "year" | "workday",
  note?: string,
}

interface selectType {
  listType: ListsTypes,
  itemId: number
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
      createdDate: Date.now(),
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
      remindDate: Date.now() + 10000,
      deadLine: Date.now() + 10000,
      repeat: 'day',
    },
    {
      id: 1,
      title: 'bar',
      listType: ListsTypes.tasks,
      createdDate: Date.now(),
      steps: [],
      isOnTomato: true,
    },
    {
      id: 2,
      title: 'foobar',
      listType: ListsTypes.tasks,
      createdDate: Date.now(),
      steps: [],
      isOnTomato: true,
    },
  ],
  select: {
    listType: ListsTypes.tomato,
    itemId: -1,
  },
}

const sharedGetters = {
  getSelectItem(state: ListStateType): ListItemType | undefined {
    return state.items.find(item => item.id == state.select.itemId);
  }
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
    getRemindDateItems(state) {
      return state.items.filter(item => item.remindDate)
    },
    ...sharedGetters,
  },
  mutations: {
    setSelectTypeList(state, payload) {
      state.select.listType = payload.listType
    },
    setSelectItemId(state, payload) {
      state.select.itemId = payload.id;
    },
    setItemOnTomato(state, payload) {
      const item = getItemById(state.items, payload.id);
      item.isOnTomato = payload.isOnTomato;
    },
    setItemComplete(state, payload) {
      const item = getItemById(state.items, payload.id);
      item.isComplete = payload.isComplete;
    },
    setItemImportant(state, payload) {
      const item = getItemById(state.items, payload.id);
      item.isImportant = payload.isImportant;
    },
    setItemRemindDate(state, payload) {
      const item = getItemById(state.items, payload.id);
      item.remindDate = payload.remindDate;
    },
    setItemStepComplete(state, payload) {
      const item = sharedGetters.getSelectItem(state);
      if (!item) return;
      const step = getItemById<ListItemStepType>(item.steps, payload.id);
      step.isComplete = payload.isComplete;
    },
    addItemStep(state, payload) {
      const item = sharedGetters.getSelectItem(state);
      if (!item) return;
      item.steps.push({
        id: item.steps.length,
        title: payload.title,
        isComplete: false,
      })
    },
    removeItemStep(state, payload) {
      const item = sharedGetters.getSelectItem(state);
      if (!item) return;
      item.steps = item.steps.filter(step => step.id !== payload.id);
    },
  },
}