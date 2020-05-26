import Vue from 'vue'
import Vuex, {ActionContext} from 'vuex'
import axios from 'axios'
import {St, Task, Filters} from '@/types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: 'false',
    groups: [],
    tasks: []
  },
  mutations: {
    PUT_TOKEN(st, token) {
      st.token = token
    },
    DELETE_TOKEN (st) {
      st.token = 'false'
    },
    SET_GROUPS_TO_STORE(st, data) {
      st.groups = data
    },
    SET_TASKS_TO_STORE(st, data) {
      st.tasks = data
    },
    CHANGE_STATUS(st, {id, newValue}) {
      // @ts-ignore
      let itemIndex = st.tasks.findIndex(it => it.id === id)
      // @ts-ignore
      st.tasks[itemIndex].status = newValue
    },
    DELETE_ITEM_IN_STORE(st, itemIndex) {
      st.tasks.splice(itemIndex, 1)
    },
    DELETE_GROUP_IN_STORE(st, groupName) {
      // @ts-ignore
      st.tasks = st.tasks.filter(it => it.groupName !== groupName)
      st.groups = st.groups.filter(it => it !== groupName)
    },
    ADD_GROUP_TO_STORE(st, group) {
      // @ts-ignore
      st.groups.unshift(group)
      st.groups = [...new Set(st.groups)]
    },
    ADD_ITEM_TO_STORE(st, item) {
      // @ts-ignore
      st.tasks.unshift(item)
      // @ts-ignore
      st.groups.unshift(item.groupName)
      st.groups = [...new Set(st.groups)]
    },
    // @ts-ignore
    CHANGE_ITEM_TO_STORE(st: St, item: Task): any {
      let aa = st.tasks.filter((it: Task) => it.id !== item.id)
      // @ts-ignore
      st.tasks = [...aa, item]
      st.groups.unshift(item.groupName)
      // @ts-ignore
      st.groups = [...new Set(st.groups)]
    }
  },
  actions: {
    // @ts-ignore
    AUTH_FORM({commit, dispatch}, pl) {  //факовая аут-я и факовое получение токена с сервера
      if(pl !== undefined) {
        return Promise.resolve('true')
          .then(response => {
            commit('PUT_TOKEN', response)
            return response
          })
          .then(response => localStorage.setItem('auth = ', response.toString()))
          .then(() => dispatch('GET_DATA'))
      }
    },
    DELETE_TOKEN({commit}) {
      localStorage.removeItem('auth = ')
      commit('DELETE_TOKEN')
    },
    async GET_DATA({commit}) {    //инициализирующий запрос и получение данных с сервера
      let {data} = await axios.get('/data.json')
      commit('SET_GROUPS_TO_STORE', data.groupNames)
      commit('SET_TASKS_TO_STORE', data.tasks)
    },
    CHANGE_STATUS({commit}, {id, newValue}) {
      commit('CHANGE_STATUS', {id, newValue})
      //при наличии бакенда здесь необходимо делать запрос на CHANGE status в bd сервера
    },
    DELETE_ITEM({commit, dispatch, state}, id) {
      let itemIndex = state.tasks.findIndex((it: Task) => it.id === id)
      commit('DELETE_ITEM_IN_STORE', itemIndex)
      //при наличии бакенда здесь необходимо делать запрос на удаление item в bd сервера
    },
    DELETE_GROUP({commit}, groupName) {
      commit('DELETE_GROUP_IN_STORE', groupName)
      //при наличии бакенда здесь необходимо делать запрос на удаление группы в bd сервера
    },
    MAKE_TASK({commit}, item) {
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
  },
  getters: {
    ACCEPT_FILTRED_DATA: state => (filters: Filters ) => {
      if (filters.status === 'all') {
        if (filters.name === '') {  // любой статус, без фильтра по имени
          return state.tasks
        } else {                   // любой статус, фильтр по имени
          return state.tasks.filter((it: Task) => it.title.toLowerCase().includes(filters.name.toLowerCase()))
        }
      } else {                    // отфильтруем по статусу и по имени
        if (filters.name === '') {
          return state.tasks.filter((it: Task) => Boolean(it.status) === Boolean(filters.status))
        } else {
          return state.tasks.filter((it: Task) => it.title.toLowerCase().includes(filters.name.toLowerCase()) && Boolean(it.status) === Boolean(filters.status))
        }
      }
    },
    ACCEPT_GROUP_NAMES: state => state.groups,
    ACCEPT_ITEM: state => (id: number) => state.tasks.find((it: Task) => it.id === id),
    GET_TOKEN_FROM_STORE: state => state.token
  }
})
