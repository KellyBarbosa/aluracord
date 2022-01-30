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
      
      .base:hover {
        position: absolute;
        background-color: #181F25;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; 
        transform: scale(4);   
      }
      
      .base p {
        display: none;
      }

      .base:hover p{
        display: block;
        font-size: 5px;
        margin: 0 5px 5px 5px;  /* topo | direita | inferior | esquerda */
       
      }

      .image {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 8px;
      }
      
      .base:hover img{
        margin: 5px;
      }

      .loading{
        height: 100%;
        margin-left: 40px;
        max-width: 95%;
        max-height: 95vh;
        /* padding: 32px; */

      }

      /* Works on Firefox */
      * {
      scrollbar-width: thin;
      scrollbar-color: white #181F25;
    }
    
    /* Works on Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
      width: 4px;
    }
    
    *::-webkit-scrollbar-track {
      background: #181F25;
      border-radius: 20px;
    }
    
    *::-webkit-scrollbar-thumb {
      /* background-color: #101418; */
      background-color: white;
      border-radius: 20px;
      /* border: 1px solid white; */
    }
        /* ./App fit Height */ 
      `}</style>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}