/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react"
import { StyleProp, StyleSheet } from "react-native"

type CreateStylePropFunc = (...args: Array<any>) => StyleProp<any>

// TODO: 使う際にインテリセンスが有効になるように型をもっと細かくする
export const createUseStyles = (createStyles: CreateStylePropFunc) => {
    return (...args: Array<any>) => {
        return useMemo(() => StyleSheet.create(createStyles(...args)), [...args])
    }
}
