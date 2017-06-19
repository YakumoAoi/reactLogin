import AV from 'leancloud-storage'

var APP_ID = 'bgqkvywT0kEB881JDKJwgqIS-gzGzoHsz';
var APP_KEY = 'vCwj1qbJtDaiwmQSulSq9ohj';
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

export default AV

export function signUp(email, username, password, successFn, errorFn) {
    var user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.setEmail(email)
    user.signUp().then((hasSignUp) => {
            let user = getUserFromAVUser(hasSignUp)
            successFn.call(null, user)
        })
        .catch((error) => {
            errorFn.call(null, error)
        })
    return undefined
}

export function signIn(username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then((logined) => {
            let user = getUserFromAVUser(logined)
            successFn.call(null, user)
        })
        .catch((error) => {
            errorFn.call(null, error)
        })
    return undefined
}

export function getCurrentUser() {
    var user = AV.User.current()
    return user ? getUserFromAVUser(user) : null
}

export function logOut() {
    AV.User.logOut()
    return undefined
}
export function sendResetPasswordEmail(email, successFn, failFn) {
    AV.User.requestPasswordReset(email).then(() => {
        return successFn.call()
    }).catch((error) => {
        return errorFn.call(null, error)
    })
    return undefined
}

export const todo = {
    create: ({ status, title, deleted }, successFn, errorFn) => {
        var Todo = AV.Object.extend('Todo')
        var todo = new Todo()
        todo.set('status', status)
        todo.set('title', title)
        todo.set('deleted', deleted)
        todo.save().then((response) => {
            successFn.call(null, response.id)
        }, (error) => {
            errorFn && errorFn(null, error)
        })
    },
    update: () => {},
    destory: () => {}
}

function getUserFromAVUser(AVuser) {
    return {
        id: AVuser.id,
        ...AVuser.attributes
    }
}