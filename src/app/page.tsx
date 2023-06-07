import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Main } from './components/Main';

export default function Home() {
	return (
		<div className='relative min-h-screen grid grid-rows-[86px_1fr_86px]'>
			<Navbar />
			<Main />
			<Footer />
		</div>
	);
}
