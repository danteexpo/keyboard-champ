'use client';

import { useEffect, useState } from 'react';
import { words } from '../../../words.json';

export const Game = () => {
	const [randomizedWords, setRandomizedWords] = useState<string[]>([]);

	const shuffleWords = (array: string[]) => {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	};

	useEffect(() => {
		setRandomizedWords(shuffleWords(words));
	}, []);

	return (
		<div className='flex flex-col items-center gap-8 text-2xl'>
			{randomizedWords.length > 0 ? (
				<>
					<span className='grid place-items-center rounded-full h-20 w-20 bg-gradient-to-br from-from via-via to-to'>
						<p className='font-bold'>15</p>
					</span>

					<span className='input-background p-1'>
						<input
							type='text'
							className='bg-black font-light py-2 px-4 w-64 outline-none'
							autoFocus
						/>
					</span>

					<p className='max-w-4xl text-center font-light opacity-75'>
						{randomizedWords.join(' ')}
					</p>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};
