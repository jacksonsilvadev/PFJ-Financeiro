import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

// Importação do firebase

export const firebaseApp = firebase.initializeApp({
  // Iniciando firebase pelos valores armazenados no .env.local
  apiKey: process.env.VUE_APP_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
})

// Criando uma função de instalação de plugin para acessar o $firebase pelo Root do Vue

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$firebase', {
    get () {
      return firebaseApp
    }
  })
}
