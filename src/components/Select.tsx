import React, { useState } from "react"
import { ScrollView } from "react-native"
import { Chip, ChipProps } from "react-native-paper"

type SelectProps = {
    children?: React.ReactNode
    onChange?: (values: Array<string>) => void
}
type Select = React.FC<SelectProps> & {
    Item: SelectItem
}
type SelectItemProps = Omit<ChipProps, "theme"> & {
    value: string
    children?: React.ReactNode
    onPress?: (selected: string) => void
}
type SelectItem = React.FC<SelectItemProps>


const Item: SelectItem = ({children, onPress, value, ...props}) => {
    const [selected, setSelected] = useState(false)
    const handlePress = () => {
        setSelected(!selected)
        onPress && onPress(value)
    }

    return (
        <Chip
            {...props}
            onPress={handlePress}
        >
            {children}
        </Chip>
    )
}


const remove = (array: Array<string>, target: string) => {
    return array.filter((item) => item !== target)
}

const add = (array: Array<string>, target: string) => {
    return [...array, target]
}

export const Select: Select = ({children, onChange}) => {
    const [values, setValues] = useState<Array<string>>([])

    return (
        <ScrollView horizontal>
            {React.Children.map(children, (child) => {
                const item = child as React.ReactElement<React.PropsWithChildren<SelectItemProps>>
                if (item.type === Item) {
                    const onPress = () => {
                        const updated = values.includes(item.props.value)
                            ? remove(values, item.props.value)
                            : add(values, item.props.value)
                        setValues(updated)
                        item.props.onPress?.()
                        onChange && onChange(updated)
                    }
                    return React.cloneElement(item, { onPress })
                }
                return child
            })}
        </ScrollView>
    )
}

Select.Item = Item
