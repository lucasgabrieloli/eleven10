import { StyleSheet } from "react-native";

export const FooterStyles = StyleSheet.create({
    footer:{
        backgroundColor: "white",
        width: "100%",
        height: "7%",
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        borderTopColor: "lightgray",
        borderTopWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    botaomais:{
        width: 50,
        height: 50,
        backgroundColor: "#3db342",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100
    },
    mais:{
        width: "100%",
        height: "100%",
    },
    maiz:{
        height: "90%",
        width: "15%"
    }
})