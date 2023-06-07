'use client';

import React, { useEffect, useState } from 'react';
import { Score } from './Score';
import { Game } from './Game';

export const Main = () => {
	const [lastWPM, setLastWPM] = useState(0);
	const [highestWPM, setHighestWPM] = useState(0);

	useEffect(() => {
		const localLastWPM = localStorage.getItem('localLastWPM');
		const localHighestWPM = localStorage.getItem('localHighestWPM');
		if (localLastWPM === null) {
			localStorage.setItem('localLastWPM', '0');
		} else {
			setLastWPM(Number(localStorage.getItem('localLastWPM')));
		}
		if (localHighestWPM === null) {
			localStorage.setItem('localHighestWPM', '0');
		} else {
			setHighestWPM(Number(localStorage.getItem('localHighestWPM')));
		}
	}, []);

	return (
		<main className='mx-auto w-full max-w-4xl flex flex-col gap-24 pt-16 px-4'>
			<Score lastWPM={lastWPM} highestWPM={highestWPM} />
			<Game setLastWPM={setLastWPM} setHighestWPM={setHighestWPM} />
		</main>
	);
};
