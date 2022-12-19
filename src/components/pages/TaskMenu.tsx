import React from "react"
import { ScrollView } from "react-native"
import { Menu } from "react-native-paper"

type TaskMenuProps = {}

export const TaskMenu: React.FC<TaskMenuProps> = () => {
    return (
        <ScrollView>
            <Menu.Item leadingIcon="redo" onPress={() => {}} title="Redo" />
        </ScrollView>
    )
}
