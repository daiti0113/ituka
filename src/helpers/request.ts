import { useAppSelector } from "./store"
import firestore from "@react-native-firebase/firestore"
import { useEffect, useState } from "react"
import { list } from "../slices/toDo"

// TODO: キャッシュ戦略を考える
export const useLists = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))
    const [lists, setLists] = useState<any>([])

    const getLists = async () => {
        const res = await firestore().collection("users").doc(uid).collection("lists").get()
        setLists(res.docs.map((doc) => ({id: doc.id, ...doc.data()})))
    }

    useEffect(() => {
        getLists()
    })

    return lists
}


export const useTasks = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))
    const [tasks, setTasks] = useState<any>([])

    const getTasks = async () => {
        const res = await firestore().collection("users").doc(uid).collection("tasks").get()
        setTasks(res.docs.map((doc) => doc.data()))
    }

    useEffect(() => {
        getTasks()
    }, [])

    return tasks
}

export const useAddTask = () => {
    const {uid} = useAppSelector(({auth: {user: {uid}}}) => ({uid}))

    return async (values: Partial<list>) => {
        await firestore().collection("users").doc(uid).collection("tasks").add(values)
    }
}
