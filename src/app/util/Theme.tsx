import { MenuProps, theme, ThemeConfig } from 'antd';
import {HighlightTwoTone} from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";

type MenuItem = Required<MenuProps>['items'][number];

export interface IQTheme{
    currentTheme: ThemeConfig;
    currentThemeName: "Default" | "Dark" | "IQDefault" | "IQRed" | "Compact" | "CustomTheme"
    themeCallback?: Function
    customTokens: Map<String,String>
}

const defaultTheme:ThemeConfig = {
    algorithm: [theme.defaultAlgorithm],
    token : {
        fontFamily: "MuseoSans",

    },
    components : {
        Button : {
            colorBorder: '#EEEEEE',
            borderRadius: 4,
            colorPrimary: '#000',
            colorPrimaryHover:'#000'
        },
        Layout:{
            headerBg: "#000000",
            headerColor: "#FFFFFF"
        }
    }
}

const redTheme:ThemeConfig = {
    algorithm: [theme.defaultAlgorithm],
    token : {
        colorBgLayout:"#c00",
        "colorPrimary": "#c00",
        "colorInfo": "#c00"
    },
    components : {
        Button : {
            colorBorder: '#e0dfdf',
            borderRadius: 4,
            colorPrimary: '#c00',
            colorPrimaryHover:'#c00'
        },
        Layout:{
            headerBg: "#c00"
            // colorBgHeader: "#c00",
            // colorBgBody:"#EEEEEE"
        },
        Menu:{
            // itemColor:"white",
            // colorText: "white",
            // groupTitleColor: "blue",
        }

    }
}

export const iqTheme: IQTheme = {
    currentTheme: defaultTheme,
    currentThemeName: "IQDefault",
    customTokens: new Map<String,String>
}

export const ThemeService={
    changeTheme: (themeName:"Default" | "Dark" | "IQDefault" | "IQRed" | "Compact" | "CustomTheme", themeCallback?:Function, customThemeConfig?:ThemeConfig ):ThemeConfig =>{
        let currentTheme:ThemeConfig | undefined = {
            algorithm: [theme.defaultAlgorithm]
        }
        if(themeName == "IQDefault"){
            currentTheme = defaultTheme
        }else if(themeName == "IQRed"){
            currentTheme = redTheme
        }else if(themeName == "Dark"){
            currentTheme.algorithm = [theme.darkAlgorithm];
        }else if(themeName == "Compact"){
            if(iqTheme.currentThemeName == "IQDefault"){
                currentTheme.algorithm = [theme.defaultAlgorithm, theme.compactAlgorithm];
            }else if(iqTheme.currentThemeName == "Dark"){
                currentTheme.algorithm = [theme.darkAlgorithm, theme.compactAlgorithm];
            }
            currentTheme.components = {
                Menu:{
                    size: 1
                }
            }
        } else if(themeName == "CustomTheme"){
            currentTheme = customThemeConfig ? customThemeConfig : defaultTheme
        }
        currentTheme.token = {
            fontFamily: "MuseoSans"
        }
        iqTheme.currentThemeName = themeName;
        iqTheme.currentTheme = currentTheme;
        iqTheme.themeCallback = themeCallback;
        if(themeCallback){
            themeCallback(iqTheme)
        }
        return currentTheme;
    },
    getCurrentTheme:(): ThemeConfig=>{
        if(!iqTheme.currentTheme){
            iqTheme.currentTheme = ThemeService.changeTheme("IQDefault")
        }
        return iqTheme.currentTheme;
    },
    getCurrentThemeName:(): string=>{
        if(!iqTheme.currentThemeName){
            iqTheme.currentThemeName = "IQDefault"
        }
        return iqTheme.currentThemeName;
    },
    getThemeMenu:():MenuItem=>{
        return {
            key: "ThemeMenu",
            icon: <HighlightTwoTone/>,
            onClick: (menuItem)=>{
                // @ts-ignore
                ThemeService.changeTheme(menuItem.key, iqTheme.themeCallback)
            },
            children:[
                {
                    key: "IQTheme",
                    label: "Choose you Theme",
                    type:"group",
                    style:{width:"100%"},
                    children:[
                        {
                            key: "IQDefault",
                            label: "Default"
                        },
                        {
                            key: "Dark",
                            label: "Dark"
                        },
                        {
                            key: "IQRed",
                            label: "IQRed"
                        },
                        {
                            key: "CustomTheme",
                            label: "CustomTheme"
                        }
                    ]
                }
            ]
        }
    }
}

