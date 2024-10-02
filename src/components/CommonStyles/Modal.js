import { StyleSheet } from "react-native";
import { scale } from "../../functions/scale";


export const ModalStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: scale(80),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputArea: {
        flexDirection: 'column',
        rowGap: scale(8),
    },
    input: {
        borderStyle: 'solid',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DCE2E5',
        backgroundColor: '#F5F8FA',
        padding: 8,
    }
})