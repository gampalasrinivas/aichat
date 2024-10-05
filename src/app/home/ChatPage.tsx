"use client";
import { Col, Dropdown, Flex, Menu, Progress, Radio, Row, Spin, Steps, StepsProps, Table, TableProps, Typography } from "antd"
import Sider from "antd/lib/layout/Sider"
import { Header } from "antd/lib/layout/layout";
import { Card, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Input, Button, List, Avatar, Layout, Image } from 'antd';
const { TextArea } = Input;
const { Meta } = Card;
import { SendOutlined } from '@ant-design/icons';
import { MenuProps } from "antd/lib";
import Markdown from 'marked-react';

const ChatLayout: React.FC = () => {
    function handleMenuClick() {
    }
    function getFinalRating() {
        if (messages.length > 0) {
            if (messages[messages.length - 1]['finalRating'] != undefined) {
                return messages[messages.length - 1]['finalRating']
            }
        }
        return 0;
    }
    interface Message {
        role: string;
        content: string;
        finalRating: number;
    }
    // const [timeManagementMessages, setTimeManagementMessages] = useState<Message[]>([]);
    // const [productKnowledgeMessages, setProductKnowledgeMessages] = useState<Message[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatListRef = useRef(null);
    const buttonnRef = useRef(null);
    const [selectedKey, setSelectedKey] = useState('1');

    const handleClick = (key: any) => {
      setSelectedKey(key);
    };
    // useEffect(() => {
    //     console.log('timeManagementMessages useEffect userInput=' + userInput);
    //     console.log('timeManagementMessages useEffect skillInput=' + skillInput);
    //     if (timeManagementMessages.length == 0) {
    //         console.log('messages empty')
    //         handleSendMessage();
    //     }
    // }, [timeManagementMessages]);

    useEffect(() => {
        if (!isLoading) {
            buttonnRef.current && buttonnRef.current.focus();
        }
    }, [isLoading]);

    useEffect(() => {
        console.log('useEffect for messages length=' + messages.length);
        if (messages.length == 0) {
            messages.push({ role: 'user', content: 'begin', finalRating: 0 });
            setMessages([...messages]);
            handleSendMessage();
        }
    }, [messages]);

    const handleSendMessage = async () => {
        console.log('handleSendMessage userInput=' + userInput);
        setIsLoading(true);
        if (userInput.trim() !== '') {
            messages.push({ role: 'user', content: userInput, finalRating: 0 });
        } else if (messages.length > 0) {
            console.log('sending api request with messages length=' + messages.length);
        } else {
            return;
        }
        try {
            const response = await axios.post('http://40.78.28.20:5001/chat?type=chef', {
                model: 'gpt-3.5-turbo',
                messages: messages,
            }, {
                headers: {}
            });
            const generatedText = response.data.choices[0].message.content;
            messages.push({ role: 'assistant', content: generatedText, finalRating: response.data.choices[0].message.finalRating });
            setMessages([...messages]);
            console.log('messages after response=' + messages.length);
            messages.forEach((message) => {
                const jsonMessage = JSON.stringify(message, null, 2);
                console.log(jsonMessage);
            });
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
        setUserInput('');
    };


    return (
        <>
        <div style={{ paddingTop: '0px' }}>
            <Header style={{ backgroundColor: 'rgb(42, 184, 184)', color: 'white', textAlign: 'center', height: '60px' }}>
                <Row>
                    <Col span={1}>
                        <Image src='/assets/logo13.png' preview={false} style={{ marginTop: '0px', paddingTop: '0px', width: "100px", cursor: "pointer" }} onClick={() => { window.location.href = '/'; }} />
                    </Col>
                    <Col span={22}>
                        Master<Image src='/assets/chef42.png' preview={false} style={{ padding: '0px', marginTop: '0px', marginLeft: '0px', marginRight: '0px', paddingLeft: '0px', paddingRight: '0px', paddingTop: '0px', width: "100px", cursor: "pointer" }} onClick={() => { window.location.href = '/'; }} />Chef
                    </Col>
                </Row>
            </Header>
        </div>
        <div style={{ height: "100vh" }}>
            <Row style={{ height: "100vh" }}>
                <Col span={4}>
                    <Sider className={'siderStyle'} width={"234px"}>
                        <Flex vertical justify="space-between" style={{ height: "100%", paddingBottom: 16 }} gap={16}>
                        <Menu  mode="inline" style={{ padding: 10, paddingTop: 1, marginTop: '0px', backgroundColor: '#f1f1f1' }} defaultSelectedKeys={[selectedKey]} onClick={handleClick}>
                            <Menu.Item key="1" style={{ backgroundColor: selectedKey === '1' ? '#f0f0f0' : '#EEEEEE' }}>
                            <span>Breakfast Ideas for a 6-Year-Old</span>
                            </Menu.Item>
                            <Menu.Item key="2" style={{ backgroundColor: selectedKey === '2' ? '#f0f0f0' : '#EEEEEE' }}>
                            <span>Breakfast Ideas for a teen</span>
                            </Menu.Item>
                            {Array.from({ length: 50 }).map((_, index) => (
                            <Menu.Item key="3">
                            
                            </Menu.Item>
                            ))}

                        </Menu>
                        </Flex>
                    </Sider>
                </Col>
                <Col span={18}>
                    <div style={{ height: "100%" }}>
                        <Row style={{ height: "100%" }}>
                            <Col span={24}>
                                {/* <div style={{ paddingTop: '0px' }}>
                                    <Header style={{ backgroundColor: 'rgb(42, 184, 184)', color: 'white', textAlign: 'center', height: '50px' }}>
                                        <div style={{ color: 'color', fontWeight: 'bold', margin: '0', padding: '0' }}>Discover a culinary masterpiece crafted by a seasoned professional</div>
                                    </Header>
                                </div> */}
                                <List style={{ paddingTop: '10px' }}>
                                    {messages.map((message, index) => (
                                        (message.content.trim() === 'begin') ? null : (
                                            <List.Item key={index}>
                                                <List.Item.Meta
                                                    avatar={
                                                        message.role === 'user' ? (
                                                            <Avatar style={{ marginRight: '12px', marginLeft: '8px' }} size={45} src="/assets/customer42.png" />
                                                        ) : (
                                                            <Avatar size={70} src="/assets/chef42.png" />
                                                        )
                                                    }
                                                />
                                                <div style={{ fontSize: 16, color: message.role === 'user' ? 'brown' : 'rgb(48, 25, 52)', whiteSpace: 'pre-wrap' }}>{message.role === 'user' ? (message.content.trim().replace(/\n\n/g, '\n').padEnd(401)) : (<Markdown>{message.content.trim()}</Markdown>)}</div>
                                            </List.Item>
                                        )))}
                                </List>
                                <div style={{ display: 'flex', alignItems: 'center' }}>

                                    {getFinalRating() == 0 && !isLoading ? (
                                        <>
                                            <Avatar style={{ marginRight: '12px', marginLeft: '8px', marginBottom: '50px' }} size={45} src="/assets/customer42.png" />
                                            <TextArea
                                                value={userInput}
                                                onChange={(e) => setUserInput(e.target.value)}
                                                placeholder="Controlled autosize"
                                                autoSize={{ minRows: 2, maxRows: 5 }}
                                                style={{ width: '900px', marginLeft: '15px', marginBottom: '50px' }}
                                                id="textArea"
                                                ref={buttonnRef}
                                            />
                                            <Button type="primary" onClick={handleSendMessage} style={{ marginLeft: '10px', marginBottom: '50px' }} icon={<SendOutlined style={{ color: "white" }} />} >Send</Button> </>) : (
                                        isLoading ? (
                                            <>
                                                <div style={{ marginLeft: '450px', marginRight: '0px', padding: '0px', fontWeight: 'bold' }}>Connecting with master chef...</div>
                                                <Row><Spin size="large" style={{ marginLeft: '10px', marginRight: '0px', padding: '0px', fontWeight: 'bold' }}></Spin></Row>
                                                
                                            </>
                                        ) : (
                                            <>
                                                <Avatar src="/assets/ai_chat_trainer_avatar.png" />
                                                <div style={{ marginLeft: '15px', color: getFinalRating() > 4 ? 'green' : 'red', fontWeight: 'bold' }}>
                                                    {getFinalRating() > 4 ? ('Congratulations! You just upgraded yourself to Level 4 by scoring ') : (
                                                        'I am sorry! You failed to upgrade yourself. Please try again later. You scored ')}
                                                    {getFinalRating()}/10.
                                                </div>
                                            </>
                                        ))}

                                </div>
                            </Col>
                            <Col span={2}></Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
        </>
    )
}

export default ChatLayout;