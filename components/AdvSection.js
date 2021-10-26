import Image from "next/image";
function AdvSection() {
    return (
        <div className="flex flex-col lg:flex-row md:flex-row items-center text-center justify-end max-w-screen-2xl my-16 xl:ml-12">
            <div className="mb-10 p-3 xl:mr-12">
            <h1 className="font-bold lg:text-4xl xl:text-4xl md:text-3xl text-2xl text-center mb-6">Fastest and most reliable</h1>
            <h3 className="lg:text-2xl xl:text-2xl md:text-xl text-lg  text-center">The highest-rated cryptocurrency of all time is here!</h3>
            </div>
            <div className="">
            <Image alt="banner" className="" src="/ad.gif" width={730} height={90}/>
            </div>
        </div>
    )
}

export default AdvSection
