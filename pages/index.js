import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import React from 'react';
import { useRouter } from 'next/router';

const apiGit = 'https://api.github.com/users/';
const gitURL = 'https://github.com/';
const userError = 'https://media1.giphy.com/media/TqiwHbFBaZ4ti/200w.webp?cid=ecf05e47dfil86230vvv8tjtxheufu5jzjvtu2n6bvtfzb5f&rid=200w.webp&ct=g';
const catReload = 'https://c.tenor.com/RVvnVPK-6dcAAAAC/reload-cat.gif';

function Titulo(props) {

    const Tag = props.tag || 'h1';

    return (
        <>
            <Tag>
                {props.children}
            </Tag>

            <style jsx>
                {`
                    ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-weight
                    }
                `}
            </style>
        </>
    )
}

export default function PaginaInicial() {
    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const [image, setImage] = React.useState(catReload);
    const [button, setButton] = React.useState(false);
    const [userExists, setUserExists] = React.useState(false);
    const [msg, setMsg] = React.useState('Who are you?');

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundImage: `url(https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)`,
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 7px 10px 0 rgb(0 0 0 / 90%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                        opacity: 0.9,
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (e) {
                            e.preventDefault();
                            roteamento.push(`/chat?username=${username}`);
                        }}

                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',

                        }}
                    >
                        <Titulo tag="h2">Bem-vindo(a) de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            onChange={(e) => {
                                const name = e.target.value;
                                setUsername(name);
                                fetch(`${apiGit}${name}`).then((resp) => {
                                    if (resp.status === 200) {
                                        setButton(true);
                                        setImage(`${gitURL}${name}.png`);
                                        setUserExists(true);
                                    } else if (resp.status === 404) {
                                        setImage(userError);
                                        setButton(false);
                                        setUserExists(false);
                                        setMsg('Usuário inexistente!');
                                        setTimeout(() => {
                                            setImage(catReload)
                                            setMsg('Who are you?');
                                        }, 10000)
                                    } else if (resp.status === 403) {
                                        setImage(userError);
                                        setButton(false);
                                        setUserExists(false);
                                        setMsg('Limite de uso da API excedido!');
                                        setTimeout(() => {
                                            setImage(catReload)
                                            setMsg('Who are you?');
                                        }, 10000)

                                   }/*  else if ( username.length === 0 || (username.trim() === '') || username.length === null) {                                    
                                        setImage(catReload)
                                        setMsg('Who are you?');
                                       setButton(false);
                                        setUserExists(false);
                                    } */ else {
                                        setImage(userError);
                                        setMsg('Algo deu errado, tente novamente!');
                                      setButton(false);
                                        setUserExists(false);
                                        setTimeout(() => {
                                            setImage(catReload)
                                            setMsg('Who are you?');
                                        }, 10000)
                                    }
                                })


                            }

                            }
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        />

                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}

                            disabled={!button}
                        />

                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >

                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={image}
                        />
                        
                        {userExists ? (<Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>) : ((<Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {msg}
                        </Text>))}
                        
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}