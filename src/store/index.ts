import Vue from 'vue'
import Vuex, {MutationTree, ActionTree, GetterTree} from 'vuex'
import axios from 'axios'
import {RootState, Task, Filters, Auth} from '@/types'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  state: {
    token: 'false',
    groups: [],
    tasks: []
  } as RootState,
  mutations: {
    PUT_TOKEN(st: RootState, token: string) {
      st.token = token
    },
    DELETE_TOKEN (st: RootState) {
      st.token = 'false'
    },
    SET_GROUPS_TO_STORE(st: RootState, data: string[]) {
      st.groups = data
    },
    SET_TASKS_TO_STORE(st: RootState, data: Task[]) {
      st.tasks = data
    },
    CHANGE_STATUS(st: RootState, {id, newValue}: {id: number; newValue: string;}) {
      let itemIndex = st.tasks.findIndex((it: Task) => it.id === id)
      st.tasks[itemIndex].status = newValue
    },
    DELETE_ITEM_IN_STORE(st: RootState, itemIndex: number) {
      st.tasks.splice(itemIndex, 1)
    },
    DELETE_GROUP_IN_STORE(st: RootState, groupName: string) {
      st.tasks = st.tasks.filter((it: Task) => it.groupName !== groupName)
      st.groups = st.groups.filter((it: string) => it !== groupName)
    },
    ADD_GROUP_TO_STORE(st: RootState, group: string) {
      st.groups.unshift(group)
      st.groups = [...new Set(st.groups)]
    },
    ADD_ITEM_TO_STORE(st: RootState, item: Task) {
      st.tasks.unshift(item)
      st.groups.unshift(item.groupName)
      st.groups = [...new Set(st.groups)]
    },
    CHANGE_ITEM_TO_STORE(st: RootState, item: Task) {
      let aa = st.tasks.filter((it: Task) => it.id !== item.id)
      st.tasks = [...aa, item]
      st.groups.unshift(item.groupName)
      st.groups = [...new Set(st.groups)]
    }
  } as MutationTree<RootState>,
  actions: {
    async AUTH_FORM({commit, dispatch}, pl: Auth) {  //факовая аут-я и факовое получение токена с сервера
      if(pl !== undefined) {
        return await Promise.resolve('true')
          .then((response: string) => {
            commit('PUT_TOKEN', response)
            return response
          })
          .then((response: string) => localStorage.setItem('auth = ', response))
          .then(() => dispatch('GET_DATA'))
      }
    },
    DELETE_TOKEN({commit}) {
      localStorage.removeItem('auth = ')
      commit('DELETE_TOKEN')
    },
    async GET_DATA({commit}) {    //инициализирующий запрос и получение данных с сервера
      let {data} = await axios.get('/data.json')
      commit('SET_GROUPS_TO_STORE', data.groupNames as string[])
      commit('SET_TASKS_TO_STORE', data.tasks as Task[])
    },
    CHANGE_STATUS({commit}, {id, newValue}: {id: number; newValue: string;}) {
      commit('CHANGE_STATUS', {id, newValue})
      //при наличии бакенда здесь необходимо делать запрос на CHANGE status в bd сервера
    },
    DELETE_ITEM({commit, dispatch, state}, id: number) {
      let itemIndex = state.tasks.findIndex((it: Task) => it.id === id)
      commit('DELETE_ITEM_IN_STORE', itemIndex as number)
      //при наличии бакенда здесь необходимо делать запрос на удаление item в bd сервера
    },
    DELETE_GROUP({commit}, groupName: string) {
      commit('DELETE_GROUP_IN_STORE', groupName)
      //при наличии бакенда здесь необходимо делать запрос на удаление группы в bd сервера
    },
    MAKE_TASK({commit}, item: Task) {
      if (item.title.length === 0) {
        commit('ADD_GROUP_TO_STORE', item.groupName)
        //при наличии бакенда здесь необходимо делать запрос на изменение в bd сервера
        return Promise.resolve()
      }

      if (item.id == null) {    //если id- нет, то здесь НОВЫЙ item.
        const id = Date.now()
        commit('ADD_ITEM_TO_STORE', {...item, id})  //присуждаем id item-объекту
        //при наличии бакенда здесь необходимо делать запрос на добавление item в bd сервера
        return Promise.resolve()    //для редиректа на '/'.
      } else {
        commit('CHANGE_ITEM_TO_STORE', item)
        //при наличии бакенда здесь необходимо делать запрос на изменение item'a в bd сервера
        return Promise.resolve()
      }
    }
  } as ActionTree<RootState, {}>,
  getters: {
    ACCEPT_FILTRED_DATA: (state: RootState) => (filters: Filters) => {
      if (filters.status === 'all') {
        if (filters.name === '') {  // любой статус, без фильтра по имени
          return state.tasks
        } else {                   // любой статус, фильтр по имени
          return state.tasks.filter((it: Task) => it.title.toLowerCase().includes(filters.name.toLowerCase()))
        }
      } else {                    // отфильтруем по статусу и по имени
        if (filters.name === '') {
          return state.tasks.filter((it: Task) => it.status === filters.status)
        } else {
          return state.tasks.filter((it: Task) => it.title.toLowerCase().includes(filters.name.toLowerCase()) && it.status === filters.status)
        }
      }
    },
    ACCEPT_GROUP_NAMES: (state: RootState): string[] => state.groups,
    ACCEPT_ITEM: (state: RootState) => (id: number) => state.tasks.find((it: Task) => it.id === id),
    GET_TOKEN_FROM_STORE: (state: RootState): string => state.token
  } as GetterTree<RootState, {}>
})
