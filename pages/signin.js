import { signIn, getCsrfToken, useSession } from "next-auth/client";
import { useRouter } from 'next/router';
import Head from 'next/head';

function signin({ csrfToken }) {
    const [session, loading] = useSession();
    const router = useRouter();
    return <>
    <Head>
        <title>CoinShooter | Sign In</title>
        <meta name="coinshooter" content="Cryptocurrency vote system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        { session &&
            router.push("https://coinshooter.live")
        }

        {!session &&
    <section className="bg-gray-800 min-h-screen">
        <div className="pt-16 px-2 flex flex-col items-center justify-center">
            <h3 className="text-2xl sm:text-3xl xl:text-2xl font-bold leading-tight">Let's sign in your account</h3>
        </div>
        <div className="mx-auto flex flex-col justify-center lg:items-center h-full">
            <div className="mt-4 w-full px-2 sm:px-6">
                <div className="flex flex-col mt-5 justify-center items-center">
                    <form
                        method="post"
                        action="/api/auth/signin/email"
                        className="w-full sm:w-4/6 md:w-3/6 lg:w-4/12 xl:w-3/12 text-white py-2 px-2 sm:px-0">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <input
                            name="email"
                            id="email"
                            type="email"
                            className="h-10 px-2 w-full text-gray-700 font-bold rounded mt-2 focus:outline-none shadow"
                            placeholder="Ex: info@coinshooter.live" />
                        <button className="bg-white w-full text-gray-700 font-bold mt-6 rounded-xl py-2 px-2" type="submit">Sign in with E-mail</button>
                    </form>
                </div>
            </div>

            <button
                onClick={() => signIn("google")}
                className="mt-12 bg-white transition text-xl font-bold duration-150 ease-in-out focus:outline-none hover:bg-gray-100 rounded text-indigo-700 px-6 py-2 ">
                <img className="w-8 h-8" src="/google-logo.png" alt="google-logo" /></button>
        </div>
    </section>}

        
    </>
}

export default signin

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    return {
        props: { csrfToken }
    }
}
