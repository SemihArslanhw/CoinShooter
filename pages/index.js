import Head from 'next/head'
import Promotedcoins from '../components/promotedcoins'
import AdvSection from '../components/AdvSection'
import Table from "../components/table"

export default function Home(  ) {
  return (
    <div className="">
      <Head>
        <title>CoinShooter</title>
        <meta name="coinshooter" content="Cryptocurrency vote system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <AdvSection/>
      <Promotedcoins/>
      <div className="items-center text-justify max-w-screen-2xl mx-auto mb-20">
      <Table></Table>
      
      </div>
      
      
    </div>
  )
}


