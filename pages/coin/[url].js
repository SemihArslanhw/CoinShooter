import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../components/firebase/firebase";
import moment from "moment";
import { useSession } from "next-auth/client";
import Head from 'next/head';

const Page = () => {
  const [coinInf, setCoinInf] = useState([
    {
      coin_name: "loading...",
      coin_symbol: "loading...",
      coin_marketcap: "loading...",
      coin_chain: "loading...",
      coin_age: "loading...",
      coin_votes: "loading...",
      coin_imageUri: "loading...",
    },
  ]);
  const [session, loading] = useSession();
  const router = useRouter();
  const { url } = router.query;
  var query = url;
  const docRef = db.collection("coins").doc(query);
  var isVoted = false;


  docRef.onSnapshot((doc) => {
    if (doc.data()) {
      setCoinInf({
        coin_name: doc.data().coin_name,
        coin_symbol: doc.data().coin_symbol,
        coin_marketcap: doc.data().coin_marketcap,
        coin_chain: doc.data().coin_chain,
        coin_age: doc.data().coin_age,
        coin_votes: doc.data().coin_votes,
        coin_imageUri: doc.data().coin_imageUri,
        coin_description: doc.data().coin_description,
        coin_price: doc.data().coin_price,
        coin_website: doc.data().coin_website,
        coin_telegram: doc.data().coin_telegram,
        coin_twitter: doc.data().coin_twitter,
        coin_chart: doc.data().coin_chart,
        coin_discordAddress: doc.data().coin_discordAddress,
        coin_buyAddress: doc.data().coin_buyAddress,
        coin_smartContractAddress: doc.data().coin_smartContractAddress,
        coin_createdAt: doc.data().coin_createdAt,
      });
    }
  });

  const getCopy = () => {
    alert("Coppied");
  }

  const upVote = (currentCoin, currentCoinVotes) => {
    db.collection("votes").doc(currentCoin).get().then((doc) => {
      var users = doc.data().users;
      for (let i = 0; i < users.length; i++) {
        if (users[i] === session.user.email) {
          isVoted = true;
        }
      }
      if (isVoted) {
        alert("You can vote once.")
      } else {
        users.push(session.user.email);
        db.collection("votes").doc(currentCoin).set({
          users
        }
        );
        db.collection("coins").doc(currentCoin).update({
          coin_votes: currentCoinVotes + 1,
          coin_lastVoteDate: moment(new Date()).format("DD/MM/YYYY"),
        });
      }
    })

  }


  return (
    <>
      <Head>
        <title>CoinShooter | {coinInf.coin_name}</title>
        <meta name="coinshooter" content="Cryptocurrency vote system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full min-h-screen bg-gray-800 dark:bg-gray-900 py-24">
        <div className="container mx-auto px-6 flex items-start justify-center">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row mx-auto w-full bg-white dark:bg-gray-800 shadow rounded">
              <div className="w-full lg:w-1/3 p-6">
                <div className="flex items-center mb-12">
                  <div className="w-12 h-12 rounded shadow">
                    <img
                      className="w-full h-full overflow-hidden object-cover rounded"
                      src={coinInf.coin_imageUri}
                      alt="logo"
                    />
                  </div>
                  <div className="ml-3">
                    <h1 className="text-gray-800 dark:text-gray-100 font-medium text-xl ">
                      {coinInf.coin_name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg font-normal">
                      ${coinInf.coin_symbol}
                    </p>
                  </div>
                </div>
                <h3 className="text-lg text-gray-800 dark:text-gray-100 font-bold mt-5 mb-1 whitespace-pre-line">
                  Description
                </h3>
                <p className="text-gray-600 break-words dark:text-gray-400 text-sm font-normal">
                  {coinInf.coin_description}
                </p>

                <div className="flex flex-col items-start lg:items-center justify-start mt-6">
                  <h3 className="text-lg text-gray-800 font-bold mt-5 mb-1 text-left">
                    Smart Contract address
                  </h3>
                  <div onClick={()=>getCopy()} className="cursor-pointer text-xs break-words w-full bg-indigo-100 text-indigo-700 rounded font-medium p-3 lg:mr-3 text-center">
                    <p id="smart">{coinInf.coin_smartContractAddress}</p>                  
                  </div>

                </div>
              </div>
              <div className="w-full lg:w-1/3 p-6 border-t border-b lg:border-t-0 lg:border-b-0 sm:border-l sm:border-r border-gray-300">
                <div className="flex flex-col items-center lg:items-center justify-center text-center ">
                  <h3 className="text-lg text-gray-800 dark:text-gray-100 font-bold mt-5 mb-2">
                    Since to Launch
                  </h3>
                  <div className="text-xs text-center w-3/4 bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium p-3 lg:mr-3">
                    {moment(coinInf.coin_age, "DD/MM/YYYY").fromNow()}
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-center justify-center text-center ">
                  <h3 className="text-lg text-gray-800 dark:text-gray-100 font-bold mt-5 mb-2">
                    Chain
                  </h3>
                  <div className="text-xs text-center w-3/4 bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium p-3 lg:mr-3">
                    {coinInf.coin_chain}
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-center justify-center text-center ">
                  <h3 className="text-lg text-gray-800 dark:text-gray-100 font-bold mt-5 mb-2">
                    Market Cap
                  </h3>
                  <div className="text-xs text-center w-3/4 bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium p-3 lg:mr-3">
                    $ {coinInf.coin_marketcap}
                  </div>
                </div>
                <div className="flex flex-col items-center lg:items-center justify-center text-center ">
                  <h3 className="text-lg text-gray-800 dark:text-gray-100 font-bold mt-5 mb-2">
                    Price
                  </h3>
                  <div className="text-xs text-center w-3/4 bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded font-medium p-3 lg:mr-3">
                    $ {coinInf.coin_price}
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/3 p-6 mt-10">
                <div className="ml-16">
                  <a href={coinInf.coin_website} target="_blank">
                    <button
                      type="button"
                      className="mb-6 relative w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      Website
                    </button>
                  </a>
                </div>
                <div className={coinInf.coin_telegram == "" || null
                  ? "hidden "
                  : "opacity-100 ml-16"}>
                  <a href={coinInf.coin_telegram} target="_blank">
                    <button
                      type="button"
                      className="mb-6 relative w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <img className="w-6 h-6" src="/telegram-logo.png"></img>
                      </span>
                      Telegram
                    </button>
                  </a>
                </div>

                <div className={
                  coinInf.coin_twitter == "" || null
                    ? "hidden "
                    : "opacity-100 ml-16"
                }>
                  <a href={coinInf.coin_twitter} target="_blank">
                    <button
                      type="button"
                      className="mb-6 relative w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <img className="w-6 h-6" src="/twitter-logo.png"></img>
                      </span>
                      Twitter
                    </button>
                  </a>
                </div>
                <div className={coinInf.coin_chart == "" || null
                  ? "hidden "
                  : "opacity-100 ml-16"}>
                  <a href={coinInf.coin_chart} target="_blank">
                    <button
                      type="button"
                      className="mb-6 relative w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                        </svg>
                      </span>
                      Chart
                    </button>
                  </a>
                </div>

                <div className={coinInf.coin_discordAddress == "" || null
                  ? "hidden "
                  : "opacity-100 ml-16"}>
                  <a href={coinInf.coin_discordAddress} target="_blank">
                    <button
                      type="button"
                      className="mb-6 relative w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <img className="w-6 h-6" src="/discord-logo.png"></img>
                      </span>
                      Discord
                    </button>
                  </a>
                </div>

                <div className={coinInf.coin_buyAddress == "" || null
                  ? "hidden "
                  : "opacity-100 ml-16"}>
                  <a href={coinInf.coin_buyAddress} target="_blank">
                    <button
                      type="button"
                      className="mb-6 relative w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                          <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                        </svg>
                      </span>
                      Coin Buy Address
                    </button>
                  </a>
                </div>

              </div>
            </div>


          </div>
        </div>
        <div className="flex items-center w-full justify-center py-8">
          <div className="max-w-sm rounded shadow bg-white dark:bg-gray-800">
            <div className="flex">

              <div className="px-6 py-5 text-center items-center justify-center">
                <p className="text-xl font-bold leading-none text-gray-700 dark:text-gray-100">Vote Now! 🎉</p>
                <div className="text-xl font-extrabold text-center bg-indigo-100 text-indigo-700 dark:text-indigo-600 rounded p-3 mt-6">
                  {coinInf.coin_votes}
                </div>
                {session &&

                  <div className="pt-4">
                    <button
                      onClick={() => upVote(coinInf.coin_name, coinInf.coin_votes)}
                      className="py-4 px-6 text-xl font-semibold leading-3 bg-blue-600 rounded hover:bg-blue-500 focus:outline-none text-white">VOTE</button>
                  </div>
                }
                {!session &&
                  <div className="pt-4">
                    <button
                      onClick={() => { alert("You must Login for Vote!"); router.push("/signin") }}
                      className="py-4 px-6 text-xl font-semibold leading-3 bg-blue-600 rounded hover:bg-blue-500 focus:outline-none text-white">VOTE</button>
                  </div>
                }
              </div>

              <div className="px-3">
                <img className="w-36 h-36" src="https://www.kindpng.com/picc/m/29-298485_up-arrow-free-png-image-up-arrow-image.png" alt="medal" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
