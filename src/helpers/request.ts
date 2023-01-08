import { useAppSelector } from "./store"
import firestore from "@react-native-firebase/firestore"
import { useEffect, useState } from "react"
import { list, task } from "../slices/task"

// TODO: キャッシュ戦略を考える
export const useLists = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))
    const [lists, setLists] = useState<Array<list>>([])

    useEffect(() => {
        firestore().collection("users").doc(uid).collection("lists").onSnapshot(querySnapshot => {
            setLists(querySnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()} as list)))
        })
    }, [])

    return lists
}

export const useTasks = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))
    const [tasks, setTasks] = useState<Array<task>>([])

    useEffect(() => {
        firestore().collection("users").doc(uid).collection("tasks").onSnapshot(querySnapshot => {
            setTasks(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}) as task))
        })
    }, [])

    return tasks
}

export const useTask = (taskId?: task["id"]) => {
    if (!taskId) return undefined

    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))
    const [task, setTask] = useState<task>()

    useEffect(() => {
        firestore().collection("users").doc(uid).collection("tasks").doc(taskId).onSnapshot(querySnapshot => {
            setTask({id: querySnapshot.id, ...querySnapshot.data()} as task)
        })
    }, [])

    return task
}

export const useAddTask = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))

    return async (values: Partial<task>) => {
        await firestore().collection("users").doc(uid).collection("tasks").add(values)
    }
}

export const useUpdateTask = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))

    return async (taskId: task["id"], values: Partial<Omit<task, "id">>) => {
        await firestore().collection("users").doc(uid).collection("tasks").doc(taskId).update(values)
    }
}

export const useDeleteTask = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))

    return async (taskId: task["id"]) => {
        await firestore().collection("users").doc(uid).collection("tasks").doc(taskId).delete()
    }
}

export const useAddList = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))

    return async (values: Partial<Omit<list, "order">>) => {
        const lists = await firestore().collection("users").doc(uid).collection("lists").get()
        await firestore().collection("users").doc(uid).collection("lists").add({...values, order: lists.size})
    }
}

export const useDeleteList = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))

    return async (listId: list["id"]) => {
        await firestore().collection("users").doc(uid).collection("lists").doc(listId).delete()
    }
}

export const useUpdateList = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))

    return async (listId: list["id"], values: Partial<list>) => {
        await firestore().collection("users").doc(uid).collection("lists").doc(listId).update(values)
    }
}

export const useCreateUser = () => {
    return async (uid: string) => {
        const document = await firestore().collection("users").doc(uid).get()
        if (!document.exists) {
        // Firestore にユーザー用のドキュメントが存在しなければ、新たに作成する
            await firestore().collection("users").doc(uid).set({
                name: "ユーザー名",
            })
        }
    }
}
