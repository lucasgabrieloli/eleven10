import { View, TouchableOpacity, Image } from "react-native"
import { FooterStyles } from "@/styles/FooterStyles"
           
export default function Footer() {

    return(
    <View style={FooterStyles.footer}>
        <TouchableOpacity style={FooterStyles.maiz}>
            <Image
            source={require('../assets/images/maisimg.png')}
            style={FooterStyles.mais}
            />
        </TouchableOpacity>
    </View>
)
}

