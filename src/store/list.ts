import { Module } from 'vuex';
import { RootStateType } from './index';
import { join2Filters, makeCompareFunc } from '@/helper';
import { useLocalStorage } from '@vueuse/core';
import { Ref } from 'vue-demi';
import { getItemById } from '@/helper/store';

export enum ListType {
  tomato = 'tomato',
  tasks = 'tasks',
  important = 'important',
  plans = 'plans',
}

export const UserCreateListType = 'user';

interface SideBarListType {
  listType: ListType,
  name: string,
}

interface SideBarUserCreateListType {
  listType: typeof UserCreateListType,
  name: string,
  isDeletable: true,
}

const getItemCountMap = {
  [ListType.tomato](items: ListItemType[]): number {
    return getTomatoItems(items).length;
  },
  [ListType.tasks](items: ListItemType[]): number {
    return items.length;
  },
  [ListType.important](items: ListItemType[]): number {
    return items.filter(item => item.isImportant).length;
  },
  [ListType.plans](items: ListItemType[]): number {
    return items.filter(item => item.remindDate || item.deadLine || item.repeat).length;
  },
};

export interface ListItemStepType {
  id: number,
  title: string,
  isComplete?: boolean,
}

export interface ListItemType extends ListItemStepType {
  name: ListType;
  createdDate: number;
  steps: ListItemStepType[];
  isImportant?: boolean;
  isOnTomato?: boolean;
  remindDate?: number;
  deadLine?: number;
  repeat?: RepeatDate;
  note?: string;
}

export interface ListStateType {
  lists: SideBarListType[];
  userCreateList: SideBarUserCreateListType[];
  items: ListItemType[];
}

export enum RepeatDate {
  daily = "daily",
  week = "weekly",
  month = "monthly",
  year = "annually",
  workday = "workday",
}

function noCompleteFilter(item: ListItemType): boolean {
  return !item.isComplete;
}
const withNoCompleteFiter = join2Filters(noCompleteFilter);

const compareCreateDate = makeCompareFunc<ListItemType>((a, b) => {
  if (a.createdDate > b.createdDate) return 1;
  else if (a.createdDate < b.createdDate) return -1;
  else return 0;
});

const getTomatoItems = (items: ListItemType[]) =>
  items.filter(withNoCompleteFiter(item => item.isOnTomato ? true : false)).sort(compareCreateDate);

const ListState: ListStateType = {
  lists: [
    {
      listType: ListType.tomato,
      name: ListType.tomato,
    },
    {
      listType: ListType.tasks,
      name: ListType.tasks,
    },
    {
      listType: ListType.important,
      name: ListType.important,
    },
    {
      listType: ListType.plans,
      name: ListType.plans,
    },
  ],
  userCreateList: [
    {
      listType: 'user',
      name: 'foobar',
      isDeletable: true,
    }
  ],
  items: [
    {
      id: 0,
      title: 'foofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoo',
      name: ListType.tasks,
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
      remindDate: Date.now() + 1000000,
      deadLine: Date.now() - 10000,
      repeat: RepeatDate.daily,
    },
    {
      id: 1,
      title: 'bar',
      name: ListType.tasks,
      createdDate: Date.now() + 1,
      steps: [],
      isOnTomato: true,
    },
    {
      id: 2,
      title: 'foobar',
      name: ListType.tasks,
      createdDate: Date.now() + 2,
      steps: [],
      isOnTomato: true,
    },
  ],
};

export const ListStore: Module<ListStateType, RootStateType> = {
  namespaced: true,
  state() {
    const state = useLocalStorage('tomatodoList', ListState) as Ref<ListStateType>;
    return state.value;
  },
  getters: {
    getLists(state) {
      return state.lists;
    },
    getLastItemId(state) {
      return state.items[state.items.length - 1] ? state.items[state.items.length - 1].id : 0;
    },
    getUserCreateLists(state) {
      return state.userCreateList;
    },
    getTomato(state) {
      return getTomatoItems(state.items);
    },
    getRemindDateItems(state) {
      return state.items.filter(item => item.remindDate);
    },
    getListItemCount(state) {
      return (listType: ListType) => getItemCountMap[listType](state.items);
    },
    getUserListItemCount(state) {
      return (name: string) => state.items.filter(item => item.name === name);
    },
  },
  mutations: {
    addItem(state, payload) {
      state.items.push(payload.item);
    },
    setItemOnTomato(state, payload) {
      const item = payload.item;
      item.isOnTomato = payload.isOnTomato;
    },
    setItemComplete(state, payload) {
      const item = payload.item as ListItemType;
      item.isComplete = payload.isComplete;
    },
    setItemImportant(state, payload) {
      const item = payload.item;
      item.isImportant = payload.isImportant;
    },
    setItemStepComplete(state, payload) {
      const item = payload.item;
      if (!item) return;
      const step = getItemById<ListItemStepType>(item.steps, payload.id);
      step.isComplete = payload.isComplete;
    },
    addItemStep(state, payload) {
      const item = payload.item as ListItemType;
      if (!item) return;
      item.steps.push({
        id: item.steps[item.steps.length - 1] ? item.steps[item.steps.length - 1].id + 1 : 0,
        title: payload.title,
        isComplete: false,
      });
    },
    removeItemStep(state, payload) {
      const item = payload.item as ListItemType;
      if (!item) return;
      item.steps = item.steps.filter(step => step.id !== payload.id);
    },
    setItemRemindDate(state, payload) {
      const item = payload.item;
      item.remindDate = payload.remindDate;
    },
    setItemDeadLineDate(state, payload) {
      const item = payload.item;
      item.deadLine = payload.deadLine;
    },
    setItemRepeatDate(state, payload) {
      const item = payload.item;
      item.repeat = payload.repeat;
    }
  },
};