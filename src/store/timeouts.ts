import { Module } from 'vuex';
import { RootStateType } from './index';
import { ListItemType } from './list';
import push from 'push.js';
import setTimeout from '@/helper';

export interface TimeoutType {
  id: number;
  clearId: number;
}

export interface TimeoutsStateType {
  remind: TimeoutType[],
  deadline: TimeoutType[],
}

const TimeoutsState: TimeoutsStateType = {
  remind: [],
  deadline: [],
};

export const TimeoutsStore: Module<TimeoutsStateType, RootStateType> = {
  namespaced: true,
  state() {
    return TimeoutsState;
  },
  getters: {
    getAllRemind(state) {
      return state.remind;
    },
    getRemindById(state) {
      return function (id: number) {
        const remindItem = state.remind.find(item => item.id === id);
        if (!remindItem) {
          return {
            id,
            clearId: -1
          };
        }
        return remindItem;
      };
    }
  },
  mutations: {
    putRemind(state, payload: TimeoutType) {
      const item = state.remind.find(item => item.id === payload.id);
      if (!item) {
        state.remind.push(payload);
      } else {
        item.clearId = payload.clearId;
      }
    },
    clearRemind(state, payload) {
      const item = payload.item;
      if (item.clearId !== -1) clearTimeout(item.clearId);
      item.clearId = -1;
    }
  },
  actions: {
    startRemind({ commit }, payload: Required<Pick<ListItemType, 'remindDate' | 'title' | 'id'>>) {
      const timeout = payload.remindDate - Date.now();
      if (timeout <= 0) return;
      setTimeout(() => {
        push.create("tomatodo", {
          body: payload.title,
          icon: "./favicon.png",
          timeout: 10000,
        });
        commit('putRemind', {
          id: payload.id,
          clearId: -1,
        });
      },
        timeout,
        (clearId) => {
          commit('putRemind', {
            id: payload.id,
            clearId
          });
        }
      );
    },
    startAllRemind({ rootGetters, dispatch }) {
      const dateItems = rootGetters['list/getRemindDateItems'] as Required<ListItemType>[];
      if (dateItems.length > 0) {
        dateItems.forEach(item => {
          dispatch('startRemind', {
            id: item.id,
            remindDate: item.remindDate,
            title: item.title
          });
        });
      }
    },
  }
};