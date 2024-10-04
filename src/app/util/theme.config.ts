import {ThemeConfig} from "antd";

export const customThemeConfig:ThemeConfig = {
    // algorithm: [theme.defaultAlgorithm],
    token : {
        // fontFamily: "museoSans"
        // fontFamily: "museoSans",
        // fontFamily: "geistSans",
    },
    components : {
        Button : {
            colorBorder: '#d9d9d9',
            borderRadius: 4,
            colorPrimary: '#1677FF',
            colorPrimaryHover:'#1677FF'
        },
        Layout:{
            headerBg: "#000000",
            headerColor: "#FFFFFF",
            bodyBg:"#FFFFFF"
        },
        Card: {
            colorBorderSecondary: 'rgba(0, 0, 0, 0.06)',
        },
        Table: {
            colorBorderSecondary: 'rgba(0, 0, 0, 0.06)'
        }
    }
}
