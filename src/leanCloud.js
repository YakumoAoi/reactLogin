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
        return failFn.call(null, error)
    })
    return undefined
}

export const todoModel = {
    getByUser: (user, successFn, errorFn) => {
        let query = new AV.Query('Todo')
        query.find().then((response) => {
            let array = response.map((item) => {
                return { id: item.id, ...item.attributes }
            })
            successFn.call(null, array)
        }), (error) => {
            errorFn && errorFn(null, error)
        }
    },
    create: ({ status, title, deleted }, successFn, errorFn) => {
        let Todo = AV.Object.extend('Todo')
        let todo = new Todo()
        todo.set('status', status)
        todo.set('title', title)
        todo.set('deleted', deleted)
        let acl = new AV.ACL()
        acl.getPublicReadAccess(false)
        acl.getReadAccess(AV.user.current(), true)
        todo.setACL()
        todo.save().then((response) => {
            successFn.call(null, response.id)
        }, (error) => {
            errorFn && errorFn(null, error)
        })
    },
    update: () => {},
    destory: (todoID, successFn, errorFn) => {
        let todo = AV.Object.createWithoutData('Todo', todoID)
        todo.destroy().then((response) => {
            successFn && successFn(null)
        }, (error) => {
            errorFn && errorFn(null, error)
        })
    }
}

function getUserFromAVUser(AVuser) {
    return {
        id: AVuser.id,
        ...AVuser.attributes
    }
}