import { useState } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import CircleButton from '../components/CircleButton';
import { NewCompassDialog } from '../components/home/NewCompassDialog';
import Computer from '../components/icons/heroicons/Computer';
import Moon from '../components/icons/heroicons/Moon';
import Sun from '../components/icons/heroicons/Sun';
import H from '../components/text/H';
import useLocalStorage from '../hooks/useLocalStorage';
import { DefaultSettings } from '../lib/settings';
import { CalculatorState, CompassState } from '../lib/states';
import { updateTheme } from '../lib/util';
import { useDb } from '../providers/DbProvider';

export default function App() {
	const navigate = useNavigate();

	const db = useDb();
	const toolsGame = db.useGame('$tools');

	const [theme, setTheme] = useLocalStorage('theme');
	const [openNewCompassDialog, setOpenNewCompassDialog] = useState(false);

	return (
		<div className="min-h-screen bg-slate-200 dark:bg-gray-900 text-black dark:text-white">
			<div className="fixed top-0 right-0">
				<a href="https://github.com/1Computer1/riichi-tracker">
					<img src={`${import.meta.env.BASE_URL}github/github-corner-right.svg`} />
				</a>
			</div>
			<div className="fixed top-2 left-2 lg:top-4 lg:left-4 flex flex-col gap-y-2">
				<CircleButton
					onClick={() => {
						flushSync(() => {
							if (theme === 'dark') {
								setTheme(null);
							} else if (theme === 'light') {
								setTheme('dark');
							} else {
								setTheme('light');
							}
						});
						updateTheme();
					}}
				>
					{theme === 'dark' ? <Moon /> : theme === 'light' ? <Sun /> : <Computer />}
				</CircleButton>
			</div>
			<div className="flex flex-col justify-center items-center min-h-screen gap-y-4 lg:gap-y-8 py-4 px-2">
				<h1 className="text-4xl lg:text-6xl text-center">Riichi Tracker KR</h1>
				<h2 className="text-xl lg:text-2xl text-center">Riichi Tracker의 한국어 번역입니다.</h2>
				<h2 className="text-xl lg:text-xl text-center">Keep track of your games!</h2>
				<div className="flex flex-row justify-center items-start gap-x-8">
					<div className="flex flex-col justify-center items-center gap-y-2 lg:gap-y-4">
						<div className="flex flex-col justify-center items-center gap-y-2 lg:gap-y-4">
							<Button onClick={() => setOpenNewCompassDialog(true)}>새 대국 시작하기</Button>
							<Button
								disabled={toolsGame == null || !toolsGame.ok}
								onClick={() => {
									const state: CompassState = { t: 'load', id: '$tools' };
									navigate('/compass', { state, replace: true });
								}}
							>
								저번 대국 계속하기
							</Button>
							<Button
								onClick={() => {
									(async () => {
										const res = await db.getSettings('$global');
										if (!res.ok) {
											await db.setSettings('$global', DefaultSettings);
										}
										const state: CalculatorState = { t: 'load', id: '$global' };
										navigate('/calculator', { state, replace: true });
									})();
								}}
							>
								점수 계산기
							</Button>
							<Button
								onClick={() => {
									navigate('/reference', { replace: true });
								}}
							>
								참고 자료
							</Button>
						</div>
					</div>
				</div>
				<ul className="text-base lg:text-xl flex flex-col justify-center items-start gap-y-1 lg:gap-y-2 list-disc px-6">
					<li>
						원본(영문)은 <H><a target="_blank" rel="noreferrer" className="underline hover:text-blue-500 transition-colors" href="https://riichi.onecomp.one/">여기</a></H>에서 볼 수 있습니다.
					</li>
					<li>
						현재 한국어 번역은 완전하지 않습니다. 일부 미번역본이 존재할 수 있습니다.
					</li>
					<li>
						Create a <H>Compass</H> by using the <H>새 대국 시작하기</H> button.
					</li>
					<li>
						Add riichi sticks by tapping on the <H>리치</H> button.
					</li>
					<li>
						Transfer scores by tapping on the <H>winning player&apos;s wind tile</H> and using the <H>Calculator</H>.
					</li>
					<li>
						Beginners can input their hand while advanced players can input the han and fu values.
						<br />
						This can be toggled at the <H>top-right of the Calculator</H>.
						<br />
						The default input can be set with the <H>점수 판·부수로 입력하기</H> option.
					</li>
					<li>
						Handle draws and repeats by tapping on the <H>중앙에 위치한 풍패</H>.
					</li>
					<li>
						Manually edit scores by tapping on a <H>player&apos;s score display</H>.
					</li>
					<li>
						Manually edit seats, rounds, and sticks by tapping on the <H>gear button</H>.
					</li>
					<li>Place your phone at the center of the table and enjoy!</li>
					<li>
						You can also use the <H>Calculator</H> by itself outside of a game.
					</li>
					<li>
						Learn the tiles, yaku, and the scoring table in the <H>Reference</H>.
					</li>
				</ul>
			</div>
			{openNewCompassDialog && <NewCompassDialog onClose={() => setOpenNewCompassDialog(false)} />}
		</div>
	);
}
