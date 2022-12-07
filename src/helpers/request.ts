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

export const useAddTask = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))

    return async (values: Partial<list>) => {
        await firestore().collection("users").doc(uid).collection("tasks").add(values)
    }
}

export const useUpdateTask = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))

    return async (taskId: task["id"], values: Partial<list>) => {
        await firestore().collection("users").doc(uid).collection("tasks").doc(taskId).set(values)
    }
}

export const useDeleteTask = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))

    return async (taskId: task["id"]) => {
        await firestore().collection("users").doc(uid).collection("tasks").doc(taskId).delete()
    }
}
