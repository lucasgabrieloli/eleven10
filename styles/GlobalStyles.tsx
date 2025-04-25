import { StyleSheet } from "react-native";

export const GlobalStyles = StyleSheet.create({
    root:{
        flex:1,
    },
    container:{
        flex: 1,
        backgroundColor: "#3db342",
        alignItems: 'center',
        justifyContent: 'center',
    },  
    textlogin:{
        marginTop: '4%',
        fontSize: 30,
    },
    input:{
        width:'70%',
        marginTop:'13%',
        marginLeft:0,
        marginRight:0,
        borderBottomWidth:1,
        fontSize: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 2,
      },
});