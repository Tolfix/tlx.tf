import Head from 'next/head';
import getConfig from "next/config";
import { useEffect, useState } from 'react';
import { Modal } from '../../components/Modal';
import { Tooltip } from '../../components/Tooltip';
import { io } from 'socket.io-client';

const { publicRuntimeConfig: config } = getConfig()

export default function Home(
  {
    amountOfRedirects
  }:
  {
    amountOfRedirects: number;
  }
)
{
  const [redirect, setRedirect] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [effectButton, setEffectButton] = useState(false);
  const [iAmount, setAmount] = useState(amountOfRedirects);

  useEffect(() => {

    const socket = io(config.backend);
  
    socket.on('connect', () => {
      console.log('Connected to backend');
    });

    socket.on("redirect", (redirect: {amount:number}) =>
    {
      setAmount(redirect.amount);
    })

  }, [])
  

  const fetchNewRedirect = async (redirect: string) =>
  {
    const response = await fetch(`${config.backend}/api/redirect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        redirect: redirect,
      }),
    })
    const json = await response.json()
    return json
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) =>
  {
    event.preventDefault()
    // @ts-ignore
    const redirect = event.currentTarget.elements.redirect.value;
    const json = await fetchNewRedirect(redirect);
    console.log(json);
    setRedirect(json.redirect_url);
    setShowModal(true);
  }

  const copyToClipboard = (text: string) =>
  {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  return (
    <>
    
      <Head>
        <title>TLX | Redirect</title>
      </Head>

      {/* tailwind */}
      <div className="">

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          title="Redirect URL"
        >
          <div className=''>
            <div className='text-center'>
              <Tooltip tooltipText='Click To Copy'>

                <button onClick={(target) => 
                {
                  copyToClipboard(redirect);
                  setEffectButton(true);
                }} className={`
                ${effectButton && 'animate-wiggle'}
                inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-500 rounded-md hover:bg-green-400 sm:w-auto sm:mb-0
                `} onAnimationEnd={() => setEffectButton(false)} data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
                    {effectButton ? 'Copied!' : redirect}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                      <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                    </svg>
                </button>
              </Tooltip>
            </div>
          </div>
        </Modal>

        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-sm">
            <div className='mb-5 mt-32'>
              <img src="https://cdn.tolfix.com/images/Tolfix.png" alt="Tolfix" />
            </div>
            <h1 className='text-4xl font-mono font-bold text-green-400'>Shorten URL</h1>
            <form className="bg-[#ace697] shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="redirect" name="redirect" type="text" placeholder="https://example.com" />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Generate Shorten URL
                </button>
              </div>
            </form>
          </div>
          <div className='mt-14'>
              {/* How to use the api, curl code */}
              <h1 className='text-4xl font-mono font-bold text-green-400'>Usage of API</h1>
              <code lang='shell' className='
                block whitespace-pre 
                bg-black text-white rounded px-5 shadow
              '>
                {`$ curl -X POST -H "Content-Type: application/json" -d '{"redirect": "https://example.com"}' https://tlx.tf/api/redirect`}
              </code>
          </div>

          <div className='mt-14'>
            <h1 className='text-4xl font-mono font-bold text-green-400'>Amount of redirects</h1>
            {/* Counter for how many redirects */}
            <div className='text-center bg-black rounded'>
              <h1 className='text-2xl font-mono font-bold text-green-400'>{iAmount}</h1>
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export async function getServerSideProps()
{
  // Fetch data from external API
  // Fetch amount of redirects from /api/redirects/amount
  // Pass data to the page via props
  const amountOfRedirects = await (await fetch(`${config.backend}/api/redirects/amount`)).json();
  return {
    props: {
      amountOfRedirects: amountOfRedirects.amount,
    },
  }
}