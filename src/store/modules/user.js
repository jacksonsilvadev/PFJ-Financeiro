import firebase from "firebase";

export default {
  namspaced: true,
  state: {
    uid: null,
    status: null,
    error: null
  },
  getters: {
    status(state) {
      return state.status;
    },
    user(state) {
      return state.uid;
    },
    error(state) {
      return state.error;
    }
  },
  mutations: {
    setUser (state, payload) {
      return state.uid = payload
    },

    removeUser (state) {
      return state.uid = null
    },

    setStatus (state, payload) {
     return state.status = payload
    },

    setError (state, payload) {
      return state.error = payload
    }
  },
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
          commit('setError', error.code)
        })
    },

    signInAction ({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((res) => {
        commit('setUser', res.user.uid)
        commit('setStatus', 'success')
        commit('setError', null)
      })
      .catch((error) => {
        commit('setStatus', 'failure')
        commit('setError', error.code)
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
          commit('setError', error.code)

        })
    }
  }
};
