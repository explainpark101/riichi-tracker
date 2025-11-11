import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Wind } from '../../lib/hand';
import { DefaultSettings } from '../../lib/settings';
import { CompassState } from '../../lib/states';
import { replicate } from '../../lib/util';
import { useDb } from '../../providers/DbProvider';
import Button from '../Button';
import ToggleOnOff from '../ToggleOnOff';
import WindSelect from '../calculator/WindSelect';
import CustomDialog from '../layout/CustomDialog';
import SettingsDialog from '../settings/SettingsDialog';
import { processResult } from "immer/dist/internal.js";

export function NewCompassDialog({ onClose }: { onClose: () => void }) {
	const navigate = useNavigate();
	const db = useDb();

	const [openedSettings, setOpenedSettings] = useState(false);
	const [newCompassInitialScore, setNewCompassInitialScore] = useState(25000);
	const [newCompassBottomWind, setNewCompassBottomWind] = useState<Wind>('1');
	const [newCompassSettings, setNewCompassSettings] = useState({ ...DefaultSettings, usePao: true });
	const initialScoreInputRef = useRef<HTMLInputElement | null>(null);

	const [prefersQuick, setPrefersQuick] = useLocalStorage('prefersQuick');

	const submitNewCompass = async () => {
		await db.setGame('$tools', {
			bottomWind: newCompassBottomWind,
			roundWind: '1',
			round: 1,
			repeats: 0,
			scores: replicate(newCompassInitialScore, newCompassSettings.sanma ? 3 : 4),
			riichiSticks: 0,
			riichi: replicate(false, newCompassSettings.sanma ? 3 : 4),
			settings: newCompassSettings,
		});
		const state: CompassState = { t: 'load', id: '$tools' };
		navigate('/compass', { state, replace: true });
	};

	if (prefersQuick == null) {
		setPrefersQuick('true');
	}

	return (
		<CustomDialog initialFocus={initialScoreInputRef} onClose={onClose} title="New Game">
			<div className="flex flex-col justify-center items-center gap-y-8">
				<form
					className="flex flex-col justify-center items-center gap-y-2"
					onSubmit={(e) => {
						e.preventDefault();
						void submitNewCompass();
					}}
				>
					<p className="text-xl lg:text-2xl">초기 점수</p>
					<input
						ref={initialScoreInputRef}
						key="scoreInput"
						type="text"
						inputMode="numeric"
						className="bg-slate-300 dark:bg-sky-900 text-amber-700 dark:text-amber-500 font-bold text-center text-2xl lg:text-4xl rounded-xl w-52 lg:w-80 h-10 lg:h-14 p-1"
						value={newCompassInitialScore}
						onChange={(e) => {
							const n = Number(e.target.value.match(/^\d+/)?.[0] ?? 0);
							if (!isNaN(n)) {
								setNewCompassInitialScore(n);
							}
						}}
					/>
					<p className="text-xl lg:text-2xl">자풍패</p>
					<div>
						<WindSelect
							value={newCompassBottomWind}
							redEast
							sanma={newCompassSettings.sanma != null}
							onChange={(w) => setNewCompassBottomWind(w)}
						/>
					</div>
					<ToggleOnOff toggled={prefersQuick == null ? true : prefersQuick === 'true'} onToggle={() => setPrefersQuick(prefersQuick === 'true' ? null : 'true')}>
						점수 판·부수로 입력하기
					</ToggleOnOff>
					<ToggleOnOff toggled={openedSettings} onToggle={() => setOpenedSettings(true)}>
						기타 설정
					</ToggleOnOff>
					{openedSettings && (
						<SettingsDialog
							allowCopy
							inCalculator={false}
							settings={newCompassSettings}
							onSettingsChange={(s) => {
								setNewCompassSettings(s);
								if (s.sanma == null) {
									setNewCompassInitialScore(25000);
								} else {
									setNewCompassInitialScore(35000);
								}
							}}
							onClose={() => {
								setOpenedSettings(false);
							}}
						/>
					)}
				</form>
				<Button
					onClick={() => {
						void submitNewCompass();
					}}
				>
					컴퍼스 만들기
				</Button>
			</div>
		</CustomDialog>
	);
}
