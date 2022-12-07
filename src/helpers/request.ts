import { useAppSelector } from "./store"
import firestore from "@react-native-firebase/firestore"
import { useEffect, useState } from "react"
import { list, taskItem } from "../slices/task"

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
    const [tasks, setTasks] = useState<Array<taskItem>>([])

    useEffect(() => {
        firestore().collection("users").doc(uid).collection("tasks").onSnapshot(querySnapshot => {
            setTasks(querySnapshot.docs.map(documentSnapshot => documentSnapshot.data() as taskItem))
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
