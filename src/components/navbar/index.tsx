import Image from 'next/image'
import Link from 'next/link'
import guffyLogo from "../../../public/fuffyLogo.png";

function NavBar() {
  return (
    <div className="flex gap-5 justify-between items-center px-7 py-1 font-bold border-b border-solidleading-[154.5%] max-md:flex-wrap max-md:px-5">
      <div className="flex gap-1.5 justify-center self-stretch my-auto text-2xl tracking-tighter text-neutral-700">
        <Image
          src={guffyLogo}
          alt="LOGO"
          sizes="100vw"
          style={{
            width: '40px',
            height: 'auto',
          }}
          width={0}
          height={0}
        />
        <p className='text-white'>Guffy AI <sup>🎇</sup> </p>
      </div>
      <ul className="gap-5 justify-between self-stretch my-auto text-sm leading-5 text-white/80 max-md:flex-wrap max-md:max-w-full font-normal hidden md:flex">
        <li className='hover:text-lime-400'>Home</li>
        <li className='hover:text-lime-400'>Pricing</li>
        <li className='hover:text-lime-400'>News Room</li>
        <li className='hover:text-lime-400'>Features</li>
        <li className='hover:text-lime-400'>Contact us</li>
      </ul>
      <Link
        href="/auth/sign-in"
        className="bg-limeGreen px-4 py-2 rounded-md text-white"
      >
        Free Trial
      </Link>
    </div>
  )
}

export default NavBar