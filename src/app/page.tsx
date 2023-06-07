import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Score } from './components/Score';
import { Game } from './components/Game';

export default function Home() {
	return (
		<div className='relative min-h-screen grid grid-rows-[86px_1fr_86px]'>
			<Navbar />
			<main className='mx-auto max-w-4xl flex flex-col gap-24 pt-20'>
				<Score />
				<Game />
			</main>
			<Footer />
		</div>
	);
}
