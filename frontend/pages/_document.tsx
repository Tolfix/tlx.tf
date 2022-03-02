import Document, { Html, Head, Main, NextScript } from "next/document";

export default class _Document extends Document
{
    render()
    {
        return (
            <>
                <Html lang="en">
                    <Head>
                        <meta charSet="utf-8" />
                        <link rel="manifest" href="/manifest.json" />
                        <link rel="shortcut icon" href="https://cdn.tolfix.com/images/TX-Small.png" type="image/x-icon" />
                    </Head>
                    <body className="bg-[#cde9c4]">
                        <Main />
                        <NextScript />
                        <div id="modal-root"></div>
                    </body>
                </Html>
            </>
        )
    }
} 