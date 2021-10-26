import { useState, useEffect } from "react";
import { db } from "./firebase/firebase";
import moment from "moment";
import { useSession } from "next-auth/client"
import { useRouter } from 'next/router';

function promotedtable() {
  const [coins, setCoins] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const router = useRouter();

  useEffect(() => {
    db.collection("coins").orderBy("coin_votes", "desc").where("coin_status", "==", "promoted").limit(20).onSnapshot((snapshot) => {
      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastDoc(lastDoc);
      setCoins(
        snapshot.docs.map((doc) => ({
          coin_name: doc.data().coin_name,
          coin_symbol: doc.data().coin_symbol,
          coin_marketcap: doc.data().coin_marketcap,
          coin_chain: doc.data().coin_chain,
          coin_age: doc.data().coin_age,
          coin_votes: doc.data().coin_votes,
          coin_imageUri: doc.data().coin_imageUri,
          coin_status: doc.data().coin_status
        }))
      )
    }
    );

  }, []);


  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto p-10">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50 ">
                <tr>
                  <th
                    scope="col"
                    className=" font-bold px-12 py-3 text-left text-xs text-gray-500 uppercase tracking-wider"
                  >
                    Coin Name
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider xl:table-cell lg:table-cell md:table-cell hidden"
                  >
                    Symbol
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider xl:table-cell lg:table-cell md:table-cell hidden "
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
                      className="px-8 py-4 whitespace-nowrap xl:table-cell lg:table-cell md:table-cell hidden"
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
                        <button className="bg-gray-300 hover:bg-gray-200 text-blue-600 font-bold py-2 px-4 rounded-l">
                          {coin.coin_votes}
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-r">
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
    </div>
  );
}

export default promotedtable;
