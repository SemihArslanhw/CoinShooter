import { useState, useEffect } from "react";
import { db } from "../components/firebase/firebase";
import moment from "moment";
import { useSession } from "next-auth/client";
import { useRouter } from 'next/router';


function table() {
  const coinsRef = db.collection("coins").orderBy("coin_votes", "desc").where("coin_status", "==", "listed");
  var dd = moment(new Date()).format("DD/MM/YYYY");
  const router = useRouter();
  const [coins, setCoins] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [isEmpty, setIsEmpty] = useState(false);
  const [activeStatus, setActiveStatus] = useState(1);
  const [text, setText] = useState("");

  useEffect(() => {
    coinsRef.limit(10).onSnapshot((collections) => {
      updateState(collections);
    })

  }, []);
  useEffect(() => {
    if (activeStatus === 1) {
      setIsEmpty(false);
      coinsRef.limit(10).get().then((coinss) => {
        const coinList = coinss.docs.map((doc) => ({
          coin_name: doc.data().coin_name,
          coin_symbol: doc.data().coin_symbol,
          coin_marketcap: doc.data().coin_marketcap,
          coin_chain: doc.data().coin_chain,
          coin_age: doc.data().coin_age,
          coin_votes: doc.data().coin_votes,
          coin_imageUri: doc.data().coin_imageUri,
          coin_status: doc.data().coin_status
        }))
        const lastDoc = coinss.docs[coinss.docs.length - 1];
        setLastDoc(lastDoc);
        setCoins(coinList)
      })

    }
    if (activeStatus === 2) {
      db.collection("todayVotes").orderBy("coin_votes","desc").get().then((col)=>{
        col.docs.map((doc)=>{
         
         
        })
         
      })
     
        
      

    }

    if (activeStatus === 3) {
      db.collection("coins").orderBy("coin_votes", "desc").where("coin_createdAt", "==", dd.toString()).get().then((collections) => {
        const coinList = collections.docs.map((doc) => ({
          coin_name: doc.data().coin_name,
          coin_symbol: doc.data().coin_symbol,
          coin_marketcap: doc.data().coin_marketcap,
          coin_chain: doc.data().coin_chain,
          coin_age: doc.data().coin_age,
          coin_votes: doc.data().coin_votes,
          coin_imageUri: doc.data().coin_imageUri,
          coin_status: doc.data().coin_status
        }))
        setCoins(coinList);
        setIsEmpty(true);
      })
    }


  }, [activeStatus])

  const updateState = (collections) => {
    const isCollectionEmpty = collections.size === 0;
    if (!isCollectionEmpty) {
      const coinList = collections.docs.map((doc) => ({
        coin_name: doc.data().coin_name,
        coin_symbol: doc.data().coin_symbol,
        coin_marketcap: doc.data().coin_marketcap,
        coin_chain: doc.data().coin_chain,
        coin_age: doc.data().coin_age,
        coin_votes: doc.data().coin_votes,
        coin_imageUri: doc.data().coin_imageUri,
        coin_status: doc.data().coin_status
      }))
      const lastDoc = collections.docs[collections.docs.length - 1];
      setCoins(coins => [...coins, ...coinList]);
      setLastDoc(lastDoc);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }

  const fetchMore = () => {
    coinsRef.startAfter(lastDoc).limit(10).get().then((collections) => {
      updateState(collections);
    })
  }

  if (coins.length === 0) {
    return (
      <div className="flex flex-col max-w-screen-2xl mx-auto p-10">
        <div className="mx-auto flex-col container py-8 px-4 flex items-center justify-center w-full">
          <ul className="w-full flex items-center pb-2 border-b border-gray-200">
            <li onClick={() => setActiveStatus(1)} className={activeStatus == 1 ? "py-2 px-4 xl:mr-10 mr-4  cursor-pointer bg-indigo-100 ease-in duration-150 rounded font-bold  text-xs lg:text-lg md:text-md xl:text-lg leading-none text-center text-indigo-700" : "py-2 px-4 text-center cursor-pointer  bg-transparent hover:bg-gray-300 ease-in duration-150 rounded text-xs lg:text-lg md:text-md xl:text-lg leading-none text-white"}>
              All Coins 📢
            </li>
            <li onClick={() => setActiveStatus(2)} className={activeStatus == 2 ? "py-2 px-4 xl:mr-10 xl:ml-10 ml-4 mr-4  cursor-pointer bg-indigo-100 ease-in duration-150 rounded  font-bold   text-xs lg:text-lg md:text-md xl:text-lg leading-none text-center text-indigo-700" : "py-2 px-4 text-center cursor-pointer  bg-transparent hover:bg-gray-300 ease-in duration-150 rounded text-xs lg:text-lg md:text-md xl:text-lg leading-none text-white"}>
              Today's Best 🔥
            </li>
            <li onClick={() => setActiveStatus(3)} className={activeStatus == 3 ? "py-2 px-4 xl:ml-10 ml-4   cursor-pointer bg-indigo-100 ease-in duration-150 rounded  font-bold   text-xs lg:text-lg md:text-md xl:text-lg leading-none text-center text-indigo-700" : "py-2 px-4  text-center cursor-pointer  bg-transparent hover:bg-gray-300 ease-in duration-150 rounded text-xs lg:text-lg md:text-md xl:text-lg leading-none text-white"}>
              Today Added 🆕
            </li>
          </ul>
          <h1 className="text-2xl font-extrabold text-white mt-12">No new coins have been added yet today!</h1>
        </div>
      </div>
    )
  }



  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto p-10">
      <div className="mx-auto container py-8 px-4 flex items-center justify-center w-full">
        <ul className="w-full flex items-center pb-2 border-b border-gray-200">
          <li onClick={() => setActiveStatus(1)} className={activeStatus == 1 ? "py-2 px-4 xl:mr-10 mr-4 cursor-pointer bg-indigo-100 ease-in duration-150 rounded font-bold  text-xs lg:text-lg md:text-md xl:text-lg leading-none text-center text-indigo-700" : "py-2 px-4 text-center cursor-pointer text-xs lg:text-lg md:text-md xl:text-lg  bg-transparent hover:bg-gray-300 ease-in duration-150 rounded leading-none text-white"}>
            All Coins 📢
          </li>
          <li onClick={() => setActiveStatus(2)} className={activeStatus == 2 ? "py-2 px-4 xl:mr-10 xl:ml-10 ml-4 mr-4 cursor-pointer bg-indigo-100 ease-in duration-150 rounded  font-bold   text-xs lg:text-lg md:text-md xl:text-lg leading-none text-center text-indigo-700" : "py-2 px-4 text-center cursor-pointer  bg-transparent hover:bg-gray-300 ease-in duration-150 rounded text-xs lg:text-lg md:text-md xl:text-lg leading-none text-white"}>
            Today's Best 🔥
          </li>
          <li onClick={() => setActiveStatus(3)} className={activeStatus == 3 ? "py-2 px-4 xl:ml-10 ml-4 cursor-pointer bg-indigo-100 ease-in duration-150 rounded  font-bold   text-xs lg:text-lg md:text-md xl:text-lg leading-none text-center text-indigo-700" : "py-2 px-4  text-center flex-col cursor-pointer  bg-transparent hover:bg-gray-300 ease-in duration-150 rounded text-xs lg:text-lg md:text-md xl:text-lg leading-none text-white"}>
            Today Added 🆕
          </li>
        </ul>
      </div>

      <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-b-none sm:rounded-t-lg ">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50 ">
                <tr >
                  <th
                    scope="col"
                    className=" font-bold px-12 py-3 text-left text-xs text-gray-500 uppercase tracking-wider"
                  >
                    Coin Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider xl:table-cell lg:table-cell md:table-cell hidden"
                  >
                    Symbol
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider xl:table-cell lg:table-cell md:table-cell hidden"
                  >
                    Chain
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider xl:table-cell lg:table-cell md:table-cell hidden"
                  >
                    Market Cap
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider xl:table-cell lg:table-cell md:table-cell hidden"
                  >
                    Time since launch
                  </th>
                  <th
                    scope="col"
                    className="px-12 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                  >
                    Votes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {coins.map((coin, index) => (
                  <tr
                    className="hover:bg-gray-400 cursor-pointer"
                    key={index}
                  >
                    <td
                      onClick={() => {
                        router.push("/coin/" + coin.coin_name);
                      }}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      <div className="flex items-center">
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
                          <div className="text-sm font-medium text-gray-900">
                            {coin.coin_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      onClick={() => {
                        router.push("/coin/" + coin.coin_name);
                      }}
                      className="xl:px-8 xl:py-4 xl:whitespace-nowrap xl:table-cell lg:table-cell md:table-cell hidden"
                    >
                      <div className="text-sm font-medium text-gray-900">
                        ${coin.coin_symbol}
                      </div>
                    </td>
                    <td
                      onClick={() => {
                        router.push("/coin/" + coin.coin_name);
                      }}
                      className="px-6 py-4 whitespace-nowrap xl:table-cell lg:table-cell md:table-cell hidden"
                    >
                      <span className="px-2 inline-flex text-xs leading-5  rounded-full bg-green-100 text-green-800 font-bold">
                        {coin.coin_chain}
                      </span>
                    </td>
                    <td
                      onClick={() => {
                        router.push("/coin/" + coin.coin_name);
                      }}
                      className="px-6 py-4 whitespace-nowrap xl:table-cell lg:table-cell md:table-cell hidden"
                    >
                      <div className="text-sm text-gray-900">
                        $ {coin.coin_marketcap}
                      </div>
                    </td>
                    <td
                      onClick={() => {
                        router.push("/coin/" + coin.coin_name);
                      }}
                      className="px-12 py-4 whitespace-nowrap text-sm text-gray-500 xl:table-cell lg:table-cell md:table-cell hidden"
                    >
                      <div className="text-sm text-gray-900">
                        {moment(coin.coin_age, "DD/MM/YYYY").fromNow()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <div className="inline-flex">
                        <button
                          onClick={() => router.push(`/coin/${coin.coin_name}`)}
                          className="bg-gray-300 hover:bg-gray-200 text-blue-600 font-bold py-2 px-4 rounded-l">
                          {coin.coin_votes}
                        </button>
                        <button
                          onClick={() => router.push(`/coin/${coin.coin_name}`)}
                          className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-r">
                          VOTE
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isEmpty && <button className="bg-white text-black text-lg font-medium rounded-b-2xl focus-within:outline-none" disabled="disabled">ᐅ All coins are listed ᐊ</button>}
      {!isEmpty && <button className="bg-white text-black text-lg font-medium rounded-b-2xl focus-within:outline-none" onClick={() => fetchMore()}>▼ Show More ▼</button>}
    </div>
  );
}

export default table;