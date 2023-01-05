import React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { Menu } from "react-native-paper"
import { useDispatch } from "react-redux"
import { toggleModalVisible } from "../../slices/app"

type TaskMenuProps = {
    navigation: any
}

export const TaskMenu: React.FC<TaskMenuProps> = ({navigation}) => {
    const dispatch = useDispatch()
    const openUpdateTask = () => {
        navigation.navigate("FormScreen", {screen: "UpdateTask"})
        dispatch(toggleModalVisible({type: "menu", visible: false}))

    }
    return (
        <ScrollView style={styles.container}>
            <Menu.Item leadingIcon="pencil" onPress={openUpdateTask} title="編集" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
})
