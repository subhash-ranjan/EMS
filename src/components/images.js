import React from 'react'
import { Svg, Defs, LinearGradient, Stop, Path} from 'react-native-svg'

const ImgBgSqr1 = require('src/images/bg-1.png')
const ImgBgSqr2 = require('src/images/bg-2.png')
const ImgBgSqr3 = require('src/images/bg-3.png')
const ImgBgSqr6 = require('src/images/bg-6.png')
const logo1 = require('src/images/logo-1.png')
export {
    ImgBgSqr1, ImgBgSqr2, ImgBgSqr3,ImgBgSqr6,
    ImgGooSvg1,
    logo1
}
const ImgGooSvg1 = () => {
    return (<Svg width="617" height="553"><Defs><LinearGradient x1="64.115%" y1="-8.007%" x2="20.972%" y2="122.234%" id="a"><Stop stop-color="#455A64" offset="0%" /><Stop stop-color="#2F3C42" offset="100%" /></LinearGradient></Defs><Path d="M708.8 671.868c-47.17 34.75-113.537 14.825-167.266-8.72-47.473-21.228-107.385-49.28-158.108-25.253-39.356 18.644-72.935 47.71-111.457 68.011-24.744 13.042-52.694 22.17-80.464 18.684-67.6-8.483-77.115-78.227-44.13-127.458 19.58-29.224 48.015-51.277 70.198-78.563 23.26-28.612 41.455-39.992 59.7-72.057 29.707-52.203 27.8-115.91 31.424-173.651 2.823-44.967 37.034-84.964 80.385-96.105 75.07-19.29 129.864 38.413 117.281 111.457-13.992 81.212-30.967 90.369-6.534 138.302 14.147 27.75 46.147 41.45 76.692 47.17 30.545 5.72 62.383 5.773 91.57 16.488 35.606 13.07 65.427 43.15 74.827 79.968 9.399 36.818-3.613 79.254-34.118 101.727z" transform="translate(-129 -173)" fill="#3c4f57" fill-rule="evenodd" opacity=".9" />
    </Svg>
    )
}