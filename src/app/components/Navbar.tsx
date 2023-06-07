import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
	return (
		<header className='py-6 px-4 border-b-2'>
			<span className='mx-auto w-full max-w-4xl flex justify-between items-center'>
				<h1 className='font-bold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-br from-from via-via to-to'>
					keyboard champ
				</h1>
				<Link href='/login'>
					<Image
						src='/logout.svg'
						alt=''
						width={24}
						height={24}
						priority
						className='hover:scale-110'
					/>
				</Link>
			</span>
		</header>
	);
};
