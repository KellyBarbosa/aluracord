import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLevelUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import React from 'react';
import appConfig from '../config.json';

import { createClient } from '@supabase/supabase-js'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQxMDYxNiwiZXhwIjoxOTU4OTg2NjE2fQ.BSOcXdkNNCIA5JAhSVFw6mCF1A78dlbHQZqV9hPAaTc';
const SUPABASE_URL = 'https://mjbbqjecdnrscpsshbil.supabase.co'; 

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


export default function ChatPage() {

    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    React.useEffect( () => {
        supabaseClient.from('mensagens').select('*').order('id', { ascending: false }).then(({ data }) => {
            setListaDeMensagens(data)
         });
    }, []);

    

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            from: 'kellybarbosa',
            text: novaMensagem,
        };

        supabaseClient.from('mensagens').insert([mensagem]).then(({ data }) => {
            setListaDeMensagens([
            data[0],
            ...listaDeMensagens,
        ]);
        })

        
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}

        >

            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                    opacity: 0.9,
                }}
            >
                <Header />

                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens} setLista={setListaDeMensagens} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(e) => setMensagem(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />

                        <FontAwesomeIcon className="iconUp" icon={faLevelUp} onClick={(e) => {
                            handleNovaMensagem(mensagem)
                        }}
                        />

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {

    function handleRemove(id) {
        const lista = props.mensagens.filter((msg) => msg.id !== id)
        props.setLista(lista)
    }

    return (

        <>
            <Box
                tag="ul"
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    flex: 1,
                    color: appConfig.theme.colors.neutrals["000"],
                    marginBottom: '16px',
                    overflow: 'auto',
                }}
            >
                {props.mensagens.map((mensagem) => {
                    return (
                        <>
                            <Text
                                key={mensagem.id}
                                tag="li"
                                styleSheet={{
                                    borderRadius: '5px',
                                    padding: '6px',
                                    marginBottom: '12px',
                                    hover: {
                                        backgroundColor: appConfig.theme.colors.neutrals[700],
                                    }
                                }}
                            >
                                <Box styleSheet={{
                                    marginBottom: '8px',
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                }} >

                                    <Image
                                        styleSheet={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            display: 'inline-block',
                                            marginRight: '8px',
                                        }}
                                        /* src={`https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`} */
                                        src={`https://github.com/${mensagem.from}.png`}
                                    />

                                    <Text tag="strong">
                                        {mensagem.from}
                                    </Text>

                                    <Text
                                        styleSheet={{
                                            fontSize: '10px',
                                            marginLeft: '8px',
                                            color: appConfig.theme.colors.neutrals[300],
                                        }}
                                        tag="span"
                                    >
                                        {(new Date().toLocaleDateString())}
                                    </Text>
                                    
                                    <FontAwesomeIcon className='iconTrash' icon={faTrashCan} onClick={() => {
                                        handleRemove(mensagem.id)
                                    }} />
                                </Box>
                                {mensagem.text}

                            </Text>

                        </>
                    );
                })}

            </Box>



        </>
    )
}