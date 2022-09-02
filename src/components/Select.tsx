import React from "react"
import { ScrollView } from "react-native"
import { Chip } from "react-native-paper"

type SelectProps = {
    children?: React.ReactNode
}

type Select = React.FC<SelectProps> & {
    Item: React.FC<SelectItemProps>
}

export const Select: Select = ({children}) => {
    return (
        <ScrollView horizontal>
            {children}
        </ScrollView>
    )
}

type SelectItemProps = {
    children?: React.ReactNode
}

const Item: React.FC<SelectItemProps> = ({children}) => {
    return (
        <Chip>{children}</Chip>
    )
}

Select.Item = Item
