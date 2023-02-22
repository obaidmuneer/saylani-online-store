import { Box, HStack, Text } from "@chakra-ui/react"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import CategoryCard from "../ui-component/categoryCard"
import { GlobalContext } from "../../context/context"
import { useContext } from "react"

const Slide = ({ children }) => {
    return (
        <HStack
            alignContent="center"
            justifyContent="center"
        >
            {children}
        </HStack>
    )
}

export default function CategorySlider() {
    const { state } = useContext(GlobalContext)

    const slickSettings = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    }
    return (
        <Box m={5} >
            <Slider {...slickSettings}>
                {
                    state.category.map(category => {
                        return <Slide key={category._id} ><CategoryCard title={category.title} img={category.file} /></Slide>
                    })
                }
            </Slider>
        </Box>
    )
}
