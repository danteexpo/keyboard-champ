import Image from 'next/image';

export const Footer = () => {
	return (
		<footer className='flex justify-center items-center font-light text-sm'>
			<p>Built with</p>
			<Image
				src='/next.svg'
				alt=''
				className='invert px-4'
				width={118}
				height={24}
				priority
			/>
			<p>by Dante Expósito</p>
		</footer>
	);
};
