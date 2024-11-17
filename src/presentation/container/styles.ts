import { Colors } from "@/constants";
import { StyleSheet } from "react-native";

export default ( theme ) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors[theme].colors.mainBackground,
    }
})