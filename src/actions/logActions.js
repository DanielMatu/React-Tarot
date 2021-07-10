import { firebase, googleAuthProvider } from '../firebase/firebase'

const db = firebase.database()

const signUpIfNoUser = (uid) => {
    try{
        // db.ref(`users/${uid}`).get()
        const test = 'exxxxist'
        db.ref(`does/not/${uid}/yet`).push({'ayy': 'lmao'})
        // const newRef  =db.ref(`users`).push()
        // const newItem = {
        //     name: 'test',
        //     id: newRef.id
        // }
        // db.ref(`users`).push({'uid': 'uid'}).key(uid)

    } catch (error) {
        // if no user then make one
        // db.ref(`users`).push({'uid': 'uid'})
        console.log(error)
    }

}

export const login = (uid) => {
    signUpIfNoUser(uid)
    // try{
    //     db.ref('users').set({'something':'something'})
    //     console.log('success!')
    // } catch (error){
    //     console.log(error)
    // }

    //stateLogin()
}