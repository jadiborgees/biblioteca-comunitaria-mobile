// namespace import
import * as DM from "./style"
import { useNavigation } from "@react-navigation/native"
import { FontAwesome6 } from "@expo/vector-icons"

const DetailsModal = ({ route }) => {
    const navigation = useNavigation()
    const { description, title, type } = route.params;
    
    return (
        <DM.Overlay>
            <DM.Container>
                <DM.IconCircle $type={type == "success" && "success"} >
                    <FontAwesome6 
                        name={type == "success" ? "check" : "xmark"}
                        size={32}
                        color="white"
                    />
                </DM.IconCircle>
                <DM.Title>{title}</DM.Title>
                <DM.Description>{description}</DM.Description>
                <DM.CloseBtn onPress={() => navigation.goBack()}>
                    <FontAwesome6 
                        name="xmark"
                        size={24}
                    />
                </DM.CloseBtn>
            </DM.Container>
        </DM.Overlay>
    )
}
export default DetailsModal