import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

firebase.initializeApp(firebaseConfig)
firebase.firestore().settings({timestampsInSnapshots: true})

const Firebase = {
  // auth
  auth: () => {
    return firebase
      .auth()
  },
  loginWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signupWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return firebase.auth().signOut()
  },
  checkUserAuth: user => {
    return firebase.auth().onAuthStateChanged(user)
  },
  // firestore
  createNewUser: userData => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData)
  },
  addCity: city => {
    return firebase
      .firestore()
      .collection('cities')
      .add({
        name: city.name,
        city: city.city
      })
  },
  addRestaurant: rest => {
    return firebase
    .firestore()
    .collection('restaurant-data')
    .add({
      name: rest.name,
      email: rest.email,
      phone: rest.phone,
      latlng: new firebase.firestore.GeoPoint(rest.location.lat, rest.location.lng)
    })
  },
  addShelter: rest => {
    return firebase
    .firestore()
    .collection('shelter-data')
    .add({
      name: rest.name,
      email: rest.email,
      phone: rest.phone,
      latlng: new firebase.firestore.GeoPoint(rest.location.lat, rest.location.lng)
    })
  },
  addMapPoint: point => {
    return firebase
      .firestore()
      .collection('map-data')
      .add({
        latlong: new firebase.firestore.GeoPoint(point.lat, point.lng)
      })
  },
  db: () => {
    return firebase
      .firestore()
  }
}

export default Firebase
