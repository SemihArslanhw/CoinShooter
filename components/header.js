import Image from "next/image";
import Link from "next/link";
import { useSession, signIn } from "next-auth/client"
import UserAvatar from "./userAvatar"
import { useState, useEffect } from "react"
import { db } from "../components/firebase/firebase";

function header() {
    const [session, loading] = useSession();
    const [searchBar, setSearchBar] = useState(false);
    const [coins, setCoins] = useState([]);
    const [text, setText] = useState([]);
    const [filteredCoins, setFilteredCoins] = useState([]);
    const [show, setShow] = useState(null);

    useEffect(() => {
        db.collection("coins").orderBy("coin_votes", "desc").where("coin_status", "==", "listed").onSnapshot((collections) => {
            const coinList = collections.docs.map((doc) => ({
                coin_name: doc.data().coin_name,
                coin_symbol: doc.data().coin_symbol,
                coin_imageUri: doc.data().coin_imageUri,
            }));
            setCoins(coinList);
        });

    }, [])


    const Search = (e) => {
        setSearchBar(true)
        setText(e);
        setFilteredCoins(
            coins.filter(function (value) {
                if (text === "") {
                    return value;
                } else if (
                    value.coin_name.toLowerCase().includes(text.toString().toLowerCase()) ||
                    value.coin_symbol.toLowerCase().includes(text.toString().toLowerCase())
                ) { return value }

            }))

    }
    return (
        <>
            <div className="bg-gray-900 h-full w-full">
                <nav className="w-full bg-gray-900 hidden xl:block shadow py-3 items-center">
                    <div className="container px-6 h-16 flex justify-between items-center lg:items-stretch mx-auto">
                        <div className="flex items-center">
                            <div className="mr-10 flex items-center">
                                <a href="/" className="xl:ml-20"> <Image alt="logo" className="object-contain animate-pulse h-8 mb-1" src="/logo.png" height={80} width={200} /></a>
                            </div>


                        </div>
                        <div className="mx-2 outline-none flex flex-col items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md ">
                            <div className="flex flex-row justify-center items-center">
                                <input className="outline-none flex-grow border-0 focus:outline-none px-5 text-base bg-transparent mr-2" value={text} onChange={(e) => { Search(e.target.value) }} type="text" placeholder="Search" />
                                {!searchBar &&
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  mt-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                    </svg>
                                }
                                {searchBar &&
                                    <svg onClick={() => { setSearchBar(false); setText("") }} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                }
                            </div>
                            <div className="justify-center items-start min-w-full flex">
                                {searchBar && (
                                    <div className="mt-2 overflow-y-scroll max-h-64 w-72 justify-center flex-col absolute z-10  mx-2 md:mx-20 outline-none flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-b-lg focus-within:text-gray-600 focus-within:shadow-md">
                                        {filteredCoins.map((coin) => {
                                            return (
                                                <Link href={`/coin/${coin.coin_name}`}>
                                                    <div className="flex items-center justify-start w-full px-6 py-1 cursor-pointer mt-3 hover:bg-gray-300">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <img
                                                                className="rounded-full hover:scale-125"
                                                                src={coin.coin_imageUri}
                                                                height={40}
                                                                width={40}
                                                                alt={coin.coin_name}
                                                            />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900 mt-2">
                                                                {coin.coin_name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="h-full hidden xl:flex items-center justify-end">
                            <div className="h-full flex items-center">
                                <Link href="/addcoin"><p className="font-bold tracking-widest cursor-pointer mx-6">Add Coin</p></Link>
                                <Link href="/contact"><p className="font-bold tracking-widest cursor-pointer mx-6">Contact</p></Link>
                                {!session &&
                                    <button onClick={signIn} className="bg-blue-600 hover:bg-blue-300 font-bold w-24 h-10 rounded-md my-2 shadow-lg">Sign In</button>
                                }
                                {session && <>
                                    <UserAvatar />
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </nav>

                <nav>
                    <div className="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-gray-900 fixed top-0 z-40">
                        <div className={!show ? "w-24" : "hidden"}>
                            <a href="/" className="xl:ml-20"> <Image alt="logo" className="object-contain animate-pulse h-8 mb-1" src="/logo.png" height={80} width={200} /></a>
                        </div>
                        <div>
                            <div id="menu" className="text-white" onClick={() => setShow(!show)}>
                                {show ? (
                                    " "
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1={4} y1={6} x2={20} y2={6} />
                                        <line x1={4} y1={12} x2={20} y2={12} />
                                        <line x1={4} y1={18} x2={20} y2={18} />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={show ? "absolute w-full h-full transform -translate-x-0 z-40" : "absolute w-full h-full transform -translate-x-full z-40"} id="mobile-nav">
                        <div className="bg-gray-800 opacity-100 w-full h-full" onClick={() => setShow(!show)} />
                        <div className="w-full z-40 fixed overflow-y-auto top-0 bg-gray-800 shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                            <div className="px-6 h-full">
                                <div className="flex flex-col justify-between h-full w-full">
                                    <div>
                                        <div className="mt-6 flex w-full items-center justify-between">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center">
                                                    <a href="/" className="xl:ml-20"> <Image alt="logo" className="object-contain animate-pulse h-8 mb-1" src="/logo.png" height={80} width={200} /></a>
                                                </div>
                                                <div id="cross" className="text-white" onClick={() => setShow(!show)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mx-2 outline-none flex flex-col items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md ">
                                            <div className="flex flex-row justify-center items-center">
                                                <input className="outline-none flex-grow border-0 focus:outline-none px-5 text-base bg-transparent mr-2" value={text} onChange={(e) => { Search(e.target.value) }} type="text" placeholder="Search" />
                                                {!searchBar &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5  mt-2" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                                    </svg>
                                                }
                                                {searchBar &&
                                                    <svg onClick={() => { setSearchBar(false); setText("") }} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                }
                                            </div>
                                            <div className="justify-center items-start min-w-full flex">
                                                {searchBar && (
                                                    <div className="mt-2 overflow-y-scroll max-h-64 w-72 justify-center flex-col absolute z-10  mx-2 md:mx-20 outline-none flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-b-lg focus-within:text-gray-600 focus-within:shadow-md">
                                                        {filteredCoins.map((coin) => {
                                                            return (
                                                                <a href={`/coin/${coin.coin_name}`}>
                                                                    <div className="flex items-center justify-start w-full px-6 py-1 cursor-pointer mt-3 hover:bg-gray-300">
                                                                        <div className="flex-shrink-0 h-10 w-10">
                                                                            <img
                                                                                className="rounded-full hover:scale-125"
                                                                                src={coin.coin_imageUri}
                                                                                height={40}
                                                                                width={40}
                                                                                alt={coin.coin_name}
                                                                            />
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <div className="text-sm font-medium text-gray-900 mt-2">
                                                                                {coin.coin_name}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <ul className="f-m-m">
                                            <a href="/addcoin" className="cursor-pointer">
                                                <li className="text-white pt-8">
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex items-center">
                                                            <p className="text-white text-2xl font-bold ml-3">Add Coin</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </a>
                                            <a href="/contact" className="cursor-pointer">
                                                <li className="text-white pt-8">
                                                    <div className="flex items-center justify-center">
                                                        <div className="flex items-center">
                                                            <p className="text-white text-2xl font-bold ml-3">Contact</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </a>
                                            <div className="flex justify-center items-center mt-12">
                                                {!session &&
                                                    <button onClick={signIn} className="bg-blue-600 hover:bg-blue-300 font-bold w-24 h-10 rounded-md my-2 shadow-lg">Sign In</button>
                                                }
                                                {session && <>
                                                    <UserAvatar />
                                                </>
                                                }
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default header