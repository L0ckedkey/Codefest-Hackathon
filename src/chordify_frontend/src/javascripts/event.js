import $ from 'jquery'
import LocomotiveScroll from 'locomotive-scroll'

$(document).ready(function () {
    const main = document.getElementById("main")
    const navbar = document.getElementById("navbar")

    if (main && navbar) {
        const locoSroll = new LocomotiveScroll({
            el: main,
            smooth: true
        })

        locoSroll.on("scroll", (instance) => {
            const scrollTop = instance.scroll.y
            if (scrollTop <= 0) {
                $(navbar).addClass("bg-transparent")
                $(navbar).removeClass("bg-black bg-opacity-75 backdrop-blur-md")
            }
            else {
                $(navbar).removeClass("bg-transparent")
                $(navbar).addClass("bg-black bg-opacity-75 backdrop-blur-md ")
            }
        })
    }


})