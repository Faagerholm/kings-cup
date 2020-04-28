import Head from 'next/head'

const Layout = (props) => (
    <div>
        <Head>
        <title>Kings cup</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://bootswatch.com/4/sandstone/bootstrap.min.css" />
        <meta charSet="utf-8" />  
        </Head>
        <div style={{margin: "1rem"}}>
            {props.children}
        </div>
    </div>
)

export default Layout;