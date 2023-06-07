type ScoreProps = {
	lastWPM: number;
	highestWPM: number;
};

export const Score = ({ lastWPM, highestWPM }: ScoreProps) => {
	return (
		<section className='flex justify-between items-center text-2xl font-bold'>
			<div className='flex items-center gap-2'>
				<span className='text-right'>
					<p className='text-transparent bg-clip-text bg-gradient-to-br from-from via-via to-to'>
						last
					</p>
					<p className='text-transparent bg-clip-text bg-gradient-to-br from-from via-via to-to'>
						wpm
					</p>
				</span>
				<span className='text-left self-start'>
					<p className='font-light'>{lastWPM === 0 ? '-' : lastWPM}</p>
				</span>
			</div>
			<div className='self-start flex items-center gap-2'>
				<span className='text-right font-bold'>
					<p className='text-transparent bg-clip-text bg-gradient-to-br from-from via-via to-to'>
						highest
					</p>
					<p className='text-transparent bg-clip-text bg-gradient-to-br from-from via-via to-to'>
						wpm
					</p>
				</span>
				<span className='text-left self-start'>
					<p className='font-light'>{highestWPM === 0 ? '-' : highestWPM}</p>
				</span>
			</div>
		</section>
	);
};
