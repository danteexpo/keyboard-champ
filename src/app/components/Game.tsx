import {
	Dispatch,
	FormEvent,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import Image from 'next/image';
import words from '../../../words.json';

type Words = {
	word: string;
	typed: boolean;
}[];

type GameProps = {
	setLastWPM: Dispatch<SetStateAction<number>>;
	setHighestWPM: Dispatch<SetStateAction<number>>;
};

export const Game = ({ setLastWPM, setHighestWPM }: GameProps) => {
	const [randomizedWords, setRandomizedWords] = useState<Words>([]);
	const [wordIndex, setWordIndex] = useState(0);
	const [gameStarted, setGameStarted] = useState(false);
	const [gameFinished, setGameFinished] = useState(false);
	const [timer, setTimer] = useState(15);
	const [userInput, setUserInput] = useState('');
	const [inputDisabled, setInputDisabled] = useState(false);
	const [showSpace, setShowSpace] = useState(false);

	const shuffleWords = (array: Words) => {
		let currentIndex = array.length,
			randomIndex;

		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	};

	const playAgain = () => {
		setRandomizedWords(shuffleWords(words.words));
		setWordIndex(0);
		setGameStarted(false);
		setGameFinished(false);
		setTimer(15);
		setUserInput('');
		setInputDisabled(false);
	};

	useEffect(() => {
		setRandomizedWords(shuffleWords(words.words));
	}, []);

	useEffect(() => {
		if (gameFinished) {
			let totalWPM = Math.round(
				randomizedWords
					.slice(0, wordIndex)
					.reduce((acc, cur) => (acc += cur.word.length), 0) +
					wordIndex / 5 / 0.25
			);
			setUserInput('');
			setInputDisabled(true);
			setLastWPM(totalWPM);
			localStorage.setItem('localLastWPM', String(totalWPM));
			setHighestWPM(prev => (prev > totalWPM ? prev : totalWPM));
			if (totalWPM > Number(localStorage.getItem('localHighestWPM'))) {
				localStorage.setItem('localHighestWPM', String(totalWPM));
			}
		}
	}, [gameFinished, randomizedWords, wordIndex, setLastWPM, setHighestWPM]);

	useEffect(() => {
		if (gameStarted && timer > 0) {
			setTimeout(() => setTimer(prev => prev - 1), 1000);
		}
		if (timer === 0) {
			setGameFinished(true);
		}
	}, [gameStarted, timer]);

	useEffect(() => {
		if (randomizedWords.length === 0) {
			return;
		}
		if (userInput !== '') {
			setGameStarted(true);
		}
		setShowSpace(false);
		if (userInput === randomizedWords[wordIndex].word && wordIndex < 3) {
			setShowSpace(true);
		}
		if (userInput === randomizedWords[wordIndex].word + ' ') {
			setRandomizedWords(prev =>
				prev.map(word =>
					word.word === randomizedWords[wordIndex].word
						? { ...word, typed: true }
						: word
				)
			);
			setUserInput('');
			setWordIndex(prev => prev + 1);
		}
	}, [userInput, randomizedWords, wordIndex]);

	return (
		<div className='flex flex-col items-center gap-8 text-2xl'>
			{randomizedWords.length > 0 ? (
				<>
					<span className='grid place-items-center rounded-full h-20 w-20 bg-gradient-to-br from-from via-via to-to'>
						{!gameFinished ? (
							<p className='font-bold'>{timer}</p>
						) : (
							<Image
								src='/again.svg'
								alt=''
								width={37.33}
								height={32}
								priority
								className='pr-1 cursor-pointer hover:scale-110'
								onClick={() => playAgain()}
							/>
						)}
					</span>

					<span className='relative grid place-items-center'>
						<span
							className={`${
								inputDisabled ? 'input-background-off' : 'input-background-on'
							} p-1`}
						>
							<input
								type='text'
								className='bg-black font-light py-2 px-4 w-64 outline-none'
								autoFocus
								value={userInput}
								onChange={(e: FormEvent<HTMLInputElement>) =>
									setUserInput(e.currentTarget.value.toLowerCase())
								}
								disabled={inputDisabled}
							/>
						</span>
						{showSpace && (
							<p className='absolute -right-24 hidden sm:inline'>space!</p>
						)}
					</span>

					<p className='max-w-4xl text-center font-light'>
						{randomizedWords.map(word => (
							<span
								key={word.word}
								className={`${
									word.typed
										? 'font-bold text-transparent bg-clip-text bg-gradient-to-br from-from via-via to-to'
										: ''
								}`}
							>
								{word.word}{' '}
							</span>
						))}
					</p>
				</>
			) : (
				<div role='status'>
					<svg
						aria-hidden='true'
						className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-to'
						viewBox='0 0 100 101'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
							fill='currentColor'
						/>
						<path
							d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
							fill='currentFill'
						/>
					</svg>
					<span className='sr-only'>Loading...</span>
				</div>
			)}
		</div>
	);
};
