import Image from 'next/image'
import Link from 'next/link'

export default function FourOhFour() {
  return <>
    <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center">
        <Image src="/404.png" alt="404" width={600} height={400}></Image>
        <h1 className="text-gray-800 font-bold text-4xl my-6">Something missing!</h1>
        <p className="text-gray-800 font-medium text-2xl mb-6">The page you looking is not found.</p>
        <Link href="/"><button className="bg-indigo-500 hover:bg-blue-300 font-bold w-36 h-10 rounded-md my-2 shadow-lg">Go to homepage</button></Link>
    </div>
  </>
}