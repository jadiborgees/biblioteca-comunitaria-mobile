import { Container, Description } from "./style"
import { FontAwesome6 } from "@expo/vector-icons";

const AlertBanner = ({ type, message }) => {

     const getBannerConfig = () => {
        switch (type) {
            case "alert":
                return {
                    icon: "triangle-exclamation",
                    color: "#FFE22D",
                    bgColor: "#fdf9e4"
                }
            case "success":
                return {
                    icon: "triangle-exclamation",
                    color: "#00DA00",
                    bgColor: "#ceffce"
                }
            case "danger":
                return {
                    icon: "triangle-exclamation",
                    color: "#FF2810",
                    bgColor: "#fcccc7"
                }
            default:
                return {
                    icon: "triangle-exclamation",
                    color: "#11B4FF",
                    bgColor: "#d7eef9"
                }
        }
    }   


    return (
        <Container 
            color={getBannerConfig().color} 
            bgColor={getBannerConfig().bgColor}>
            <FontAwesome6 
                name={getBannerConfig().icon}
                size={16}
                color={getBannerConfig().color}
            />
            <Description color={getBannerConfig().color} 
                >{message}</Description>
        </Container>
    )
}

export default AlertBanner