import Link from 'next/link';
import { Button } from '../components/Button';

export default function Page() {
	return (
		<div className='grid min-h-screen place-items-center'>
			<div className='flex flex-col items-center gap-12'>
				<span className='flex flex-col items-center gap-2'>
					<h2 className='font-bold text-3xl text-center text-transparent bg-clip-text bg-gradient-to-br from-from via-via to-to'>
						keyboard champ
					</h2>
					<p className='font-light'>can you type fast? then try this!</p>
				</span>
				<Link href='/'>
					<Button text='sign in with google' src='' />
				</Link>
			</div>
		</div>
	);
}
