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
    getByUser(user, successFn, errorFn) {
        let query = new AV.Query('Todo')
        query.equalTo('deleted', false)
        query.find().then((response) => {
            let array = response.map((item) => {
                return { id: item.id, ...item.attributes }
            })
            successFn.call(null, array)
        }, (error) => {
            console.log(error)
            errorFn && errorFn.call(null, error)
        })
    },
    create({ status, title, deleted }, successFn, errorFn) {
        let Todo = AV.Object.extend('Todo')
        let todo = new Todo()
        todo.set('status', status)
        todo.set('title', title)
        todo.set('deleted', deleted)
        let acl = new AV.ACL()
        acl.setPublicReadAccess(false)
        acl.setReadAccess(AV.User.current(), true)
        acl.setWriteAccess(AV.User.current(), true)
        console.log('ACL设置')
        console.log(acl)
        todo.setACL(acl)
        todo.save().then((response) => {
            successFn.call(null, response.id)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },
    update({ id, status, title, deleted }, successFn, errorFn) {
        console.log('更新的todo的id' + '' + id)
        let todo = AV.Object.createWithoutData('todo', id)
        status !== undefined && todo.set('status', status)
        title !== undefined && todo.set('title', title)
        deleted !== undefined && todo.set('deleted', deleted)
        console.log('更新的todo的属性的新值Deleted')
        console.log(todo.attributes.deleted)
        console.log('更新设置')
        console.log(todo)
        console.log('更新操作的结果')
        console.log(todo.save())
        todo.save().then((response) => {
            successFn && successFn.call(null)
        }, (error) => {
            console.log(error)
            errorFn && errorFn.call(null, error)
        })
    },
    destory(todoID, successFn, errorFn) {
        console.log('删除的todo的ID' + '' + todoID)
        console.log('todo增删改函数')
        console.log(todoModel)
        todoModel.update({ id: todoID, deleted: true }, successFn, errorFn)
    }
}

function getUserFromAVUser(AVuser) {
    return {
        id: AVuser.id,
        ...AVuser.attributes
    }
}