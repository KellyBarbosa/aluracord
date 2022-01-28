function GlobalStyle() {
    return (
        <style global jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        body {
          font-family: 'Open Sans', sans-serif;
        }
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }

        .iconUp {
          font-size: 20px;
          margin-bottom: 10px; 
          color: #E0F2E9;
          cursor: pointer;
      }

      .iconTrash {
        cursor: pointer;
        margin-left: auto;
      }
        /* ./App fit Height */ 
      `}</style>
    );
}

export default function App ({ Component, pageProps }){
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    )
}