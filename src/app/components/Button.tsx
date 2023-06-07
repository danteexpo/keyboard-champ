import Image from 'next/image';

type ButtonProps = {
	text: string;
	src: string;
};

export const Button = ({ text, src }: ButtonProps) => {
	return (
		<div className='relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group'>
			<span className='w-full h-full bg-gradient-to-br from-from via-via to-to group-hover:from-from group-hover:via-via group-hover:to-to absolute'></span>
			<span className='relative px-6 py-3 transition-all ease-out bg-black group-hover:bg-opacity-0 duration-400 flex justify-center items-center gap-3'>
				{text && <p className='font-bold text-lg'>{text}</p>}
				{src && <Image src={src} alt='' width={20} height={20} priority />}
			</span>
		</div>
	);
};
