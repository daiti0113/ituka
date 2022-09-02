import React from "react"
import { ScrollView, View } from "react-native"
import { ToDoListItem } from "../components/ToDoListItem"

export const ToDoListScene = () => {

    return (
        <ScrollView style={{ padding: 10 }}>
            <View>
                <ToDoListItem title="和菓子屋さん行く" description="羊羊 YOYO AN FACTORY" />
                <ToDoListItem title="浴衣着て夏祭り" description="浦添てだこ祭り" />
                <ToDoListItem title="花畑見に行く" description="ひまわり畑" />
                <ToDoListItem title="桜坂劇場" description="ぜんぶ、ボクのせいが観たい" />
                <ToDoListItem title="夜パフェ食べに行く" description="夜風にアイス" />
                <ToDoListItem title="和菓子屋さん行く" description="羊羊 YOYO AN FACTORY" />
                <ToDoListItem title="浴衣着て夏祭り" description="浦添てだこ祭り" />
                <ToDoListItem title="花畑見に行く" description="ひまわり畑" />
                <ToDoListItem title="桜坂劇場" description="ぜんぶ、ボクのせいが観たい" />
                <ToDoListItem title="夜パフェ食べに行く" description="夜風にアイス" />
            </View>
        </ScrollView>
    )
}
