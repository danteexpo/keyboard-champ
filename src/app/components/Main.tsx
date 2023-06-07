'use client';

import React, { useState } from 'react';
import { Score } from './Score';
import { Game } from './Game';

export const Main = () => {
	const [lastWPM, setLastWPM] = useState(0);
	const [highestWPM, setHighestWPM] = useState(0);

	return (
		<main className='mx-auto w-full max-w-4xl flex flex-col gap-24 pt-16 px-4'>
			<Score lastWPM={lastWPM} highestWPM={highestWPM} />
			<Game setLastWPM={setLastWPM} setHighestWPM={setHighestWPM} />
		</main>
	);
};
