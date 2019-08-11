import firebase from "firebase";

export default {
  namspaced: true,
  state: {
    user: null,
    status: null,
    error: null
  },
  getters: {
    status(state) {
      return state.status;
    },
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    }
  },
  mutations: {},
  actions: {
    signUpAction({
      commit
    }, payload) {
      commit("setStatus", "loading");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
          commit("setUser", res.user.uid);
          commit("setStatus", "success");
          commit("setError", null);
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    },

    signInAction ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email. payload.password)
      .then((res) => {
        commit('setUser', res.user.uid)
        commit('setStatus', 'success')
        commit('setError', null)
      })
      .catch((error) => {
        commit('setStatus', 'failure')
        commit('setError', error.message)
      })
    },

    signOutAction ({ commit }) {
      firebase.auth().signOut()
        .then((res) => {
          commit('setUser', null)
          commit('setStatus', 'success')
          commit('setError', null)
        })
        .catch((error) => {
          commit('setStatus', 'failure')
          commit('setError', error.message)
        })
    }
  }
};
