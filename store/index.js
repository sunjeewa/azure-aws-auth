import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      sidebar: false
    },
    mutations: {
      setAuth (state, user) {
        state.user = user
        console.log('Updating auth user')
        console.log(user)
      }
    },
    actions: {
    }
  })
}

export default createStore
