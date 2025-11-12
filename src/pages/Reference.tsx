import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import CircleButton from '../components/CircleButton';
import JumpButton from '../components/JumpButton';
import Tiles from '../components/Tiles';
import Toggle from '../components/Toggle';
import TileButton from '../components/calculator/TileButton';
import Left from '../components/icons/heroicons/Left';
import Right from '../components/icons/heroicons/Right';
import Up from '../components/icons/heroicons/Up';
import VerticalRow from '../components/layout/VerticalRow';
import H from '../components/text/H';
import { calculateHanFu, TileCode, TilesBySuit } from '../lib/hand';
import { DefaultSettings, ScoreSettings } from '../lib/settings';
import { referenceToYaku, Yaku, YakuReferenceNode, YakuReferenceSort } from '../lib/yaku';

export default function Reference() {
	const navigate = useNavigate();
	const tabs = ['tiles', 'yaku', 'scoring'];
	const [params, setSearchParams] = useSearchParams();
	const [tabsEl, setTabsEl] = useState<Element | null>(null);

	return (
		<div className="min-h-screen bg-slate-200 dark:bg-gray-900 text-black dark:text-white">
			<div className="flex flex-row justify-center">
				<div className="w-full h-screen overflow-y-auto">
					<div className="fixed z-10 top-2 left-2 lg:top-4 lg:left-4 flex flex-col gap-y-2">
						<CircleButton
							onClick={() => {
								navigate('/', { replace: true });
							}}
						>
							<Left />
						</CircleButton>
					</div>
					<div className="invisible sm:visible z-10 fixed bottom-2 right-2 lg:bottom-4 lg:right-8 flex flex-col gap-y-2">
						<JumpButton element={tabsEl}>
							<Up />
						</JumpButton>
					</div>
					<div ref={setTabsEl} className="flex flex-col justify-center items-center w-full gap-y-2">
						<div className="flex flex-col justify-center items-center w-full gap-y-2 px-2 py-2">
							<h1 className="text-2xl lg:text-4xl">참고자료</h1>
						</div>
						<Tab.Group
							defaultIndex={params.has('tab') ? tabs.indexOf(params.get('tab')!) : 0}
							onChange={(i) => {
								setSearchParams({ tab: tabs[i] }, { replace: true });
							}}
						>
							<Tab.List className="flex flex-row flex-wrap gap-2 justify-center items-center mb-2">
								<StyledTab>패</StyledTab>
								<StyledTab>역 목록</StyledTab>
								<StyledTab>점수 표</StyledTab>
							</Tab.List>
							<Tab.Panels className="w-full min-h-screen flex flex-col justify-center px-2 py-4 lg:py-8 bg-slate-300 dark:bg-sky-900">
								<Tab.Panel>
									<TileReference />
								</Tab.Panel>
								<Tab.Panel>
									<YakuReference />
								</Tab.Panel>
								<Tab.Panel>
									<ScoreReference />
								</Tab.Panel>
							</Tab.Panels>
						</Tab.Group>
					</div>
				</div>
			</div>
		</div>
	);
}

function StyledTab({ children }: { children: ReactNode }) {
	return (
		<Tab
			className={({ selected }) =>
				clsx(
					'border border-gray-800 rounded-xl shadow p-1 lg:p-2',
					'w-52 lg:w-80 h-10 lg:h-14 text-xl lg:text-2xl',
					selected
						? 'bg-amber-500 hover:bg-amber-600 dark:bg-amber-700 dark:hover:bg-amber-800'
						: 'bg-gray-50 hover:bg-gray-200 dark:bg-gray-500 dark:hover:bg-gray-600',
				)
			}
		>
			{children}
		</Tab>
	);
}

function TileReference() {
	return (
		<VerticalRow>
			<h2 className="text-xl lg:text-3xl">만수패</h2>
			<LabeledTiles suited tiles={TilesBySuit.m.map((t) => [t, `${t[0]}만`])} />
			<h2 className="text-xl lg:text-3xl">통수패</h2>
			<LabeledTiles suited tiles={TilesBySuit.p.map((t) => [t, `${t[0]}통`])} />
			<h2 className="text-xl lg:text-3xl">삭수패</h2>
			<LabeledTiles suited tiles={TilesBySuit.s.map((t) => [t, `${t[0]}삭`])} />
			<h2 className="text-xl lg:text-3xl">풍패</h2>
			<LabeledTiles
				tiles={[
					['1z', '동'],
					['2z', '남'],
					['3z', '서'],
					['4z', '북'],
				]}
			/>
			<h2 className="text-xl lg:text-3xl">삼원패</h2>
			<LabeledTiles
				tiles={[
					['5z', '백'],
					['6z', '발'],
					['7z', '중'],
				]}
			/>
		</VerticalRow>
	);
}

function LabeledTiles({ suited = false, tiles }: { suited?: boolean; tiles: [TileCode, string][] }) {
	return suited ? (
		<div className="flex flex-row flex-wrap justify-center items-center gap-x-1 lg:gap-x-2">
			<div className="flex flex-row flex-wrap justify-center items-center gap-x-1 lg:gap-x-2">
				{tiles.slice(0, 5).map((t, i) => (
					<div key={i} className="flex flex-col justify-center items-center">
						<span className="text-base lg:text-lg">{t[1]}</span>
						<TileButton tile={t[0]} forced />
					</div>
				))}
			</div>
			<div className="flex flex-row flex-wrap justify-center items-center gap-x-1 lg:gap-x-2">
				{tiles.slice(5).map((t, i) => (
					<div key={i} className="flex flex-col justify-center items-center">
						<span className="text-base lg:text-lg">{t[1]}</span>
						<TileButton tile={t[0]} forced />
					</div>
				))}
			</div>
		</div>
	) : (
		<div className="flex flex-row flex-wrap justify-center items-center gap-x-1 lg:gap-x-2">
			{tiles.map((t, i) => (
				<div key={i} className="flex flex-col justify-center items-center">
					<span className="text-base lg:text-lg">{t[1]}</span>
					<TileButton tile={t[0]} forced />
				</div>
			))}
		</div>
	);
}

function YakuReference() {
	const [showLocal, setShowLocal] = useState(false);
	const [onlyBasic, setOnlyBasic] = useState(false);
	const [hideYakuman, setHideYakuman] = useState(false);

	const yakuFilter = (y: YakuReferenceNode) => {
		const yaku = referenceToYaku(y);
		return (
			(onlyBasic ? yaku.basic : true) &&
			(showLocal ? true : yaku.type !== 'local') &&
			(hideYakuman ? !yaku.yakuman : true)
		);
	};

	return (
		<div className="flex flex-col gap-y-4 lg:gap-y-8">
			<div className="flex flex-row flex-wrap gap-2 justify-center items-center">
				<Button active={showLocal} onClick={() => setShowLocal(!showLocal)}>
					로컬역 보기
				</Button>
				<Button active={onlyBasic} onClick={() => setOnlyBasic(!onlyBasic)}>
					[쉬운 역]만 보기
				</Button>
				<Button active={hideYakuman} onClick={() => setHideYakuman(!hideYakuman)}>
					역만 숨기기
				</Button>
			</div>
			<div className="flex flex-col gap-y-1 lg:gap-y-2">
				{YakuReferenceSort.filter(yakuFilter).map((y, i) => {
					const inners = y.inner.filter(yakuFilter);
					return (
						<div key={y.t === 'yaku' ? y.yaku : i} className="w-full">
							<YakuItem yaku={referenceToYaku(y)} />
							{inners.length > 0 && (
								<div className="w-full flex flex-col justify-center items-center gap-1 lg:gap-2 mt-1 lg:mt-2">
									{inners.map((z, j) => (
										<div
											key={z.t === 'yaku' ? z.yaku : j}
											className="relative w-full flex flex-row justify-around items-center pl-6 lg:pl-10"
										>
											<div className="absolute left-0 w-4 lg:w-8 flex flex-col justify-center items-center">
												<Right />
											</div>
											<YakuItem yaku={referenceToYaku(z)} />
										</div>
									))}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

function YakuItem({ yaku }: { yaku: Omit<Yaku, 'id'> }) {
	return (
		<div className="w-full p-2 lg:p-4 rounded shadow bg-slate-200 dark:bg-gray-900">
			<div className="w-full flex flex-row justify-between items-center">
				{yaku.yakuman ? (
					<span className="text-base lg:text-xl">
						<H>
							{['', '더블', '트리플', '4배', '5배', '6배'][yaku.value - 1] ?? `${yaku.value}x`}{' '}
							역만
						</H>
					</span>
				) : (
					<span className="text-base lg:text-xl">
						<H>
							{yaku.value}
							{yaku.per && 'x'}{' '}
						</H>
						판
					</span>
				)}
				<div className="flex flex-row justify-end items-center">
					{yaku.closedOnly && (
						<span className="text-base lg:text-xl">
							<H.Red>멘젠한정</H.Red>
						</span>
					)}
					{yaku.openMinus && (
						<span className="text-base lg:text-xl">
							<H.Red>후로시 -1판</H.Red>
						</span>
					)}
					{yaku.type === 'extra' && (
						<span className="text-base lg:text-xl">
							<H.Red>역 아님</H.Red>
						</span>
					)}
				</div>
			</div>
			<div className="w-full flex flex-col justify-center items-start gap-2">
				<h2 className="flex flex-row text-lg lg:text-2xl font-medium gap-x-2">
					{yaku.name}{' '}
					{(yaku.basic || yaku.type === 'local') && (
						<H>
							<span className="flex flex-row gap-x-2 text-sm lg:text-base justify-center items-center">
								{yaku.basic && <span className="bg-slate-300 dark:bg-sky-900 rounded shadow p-0.5 lg:p-1">Easy</span>}
								{yaku.type === 'local' && (
									<span className="bg-slate-300 dark:bg-sky-900 rounded shadow p-0.5 lg:p-1">Local</span>
								)}
							</span>
						</H>
					)}
				</h2>
				{yaku.help && <div className="text-base lg:text-lg">{yaku.help}</div>}
				{yaku.example && (
					<div className="w-full flex flex-row justify-center items-center">
						<Tiles sets={yaku.example} small />
					</div>
				)}
			</div>
		</div>
	);
}

function ScoreReference() {
	const [sanma, setSanma] = useState<'loss' | 'bisection' | null>(null);
	const settings = { ...DefaultSettings, sanma };

	const mangan = calculateHanFu(5, 30, settings);
	const haneman = calculateHanFu(6, 30, settings);
	const baiman = calculateHanFu(8, 30, settings);
	const sanbaiman = calculateHanFu(11, 30, settings);
	const yakuman = calculateHanFu(13, 30, settings);

	return (
		<div className="flex flex-col justify-center items-center gap-2">
			<div className="flex flex-row flex-wrap gap-4 lg:gap-6 justify-center items-center">
				<div className="w-40 h-40 lg:w-48 lg:h-48 flex flex-col justify-center items-center gap-2 lg:gap-4 p-0.5 rounded shadow bg-slate-200 dark:bg-gray-900">
					<span className="text-lg font-semibold">
						<H>범례</H>
					</span>
					<div className="w-full flex flex-row justify-center items-center text-xs lg:text-sm italic">
						<span className="w-1/2 flex flex-row justify-center items-center">오야</span>
						<span className="w-1/2 flex flex-row justify-center items-center">코(자)</span>
					</div>
					<div className="relative w-full flex flex-col justify-center items-center gap-2 text-sm lg:text-base">
						<div className="w-full flex flex-row justify-center items-center">
							<span className="w-1/2 flex flex-row justify-center items-center text-center">
								쯔모
								{/* <br />
								Win/Loss */}
							</span>
							<span className="w-1/2 flex flex-row justify-center items-center text-center">
								쯔모
								{/* <br />
								Win/Loss */}
							</span>
						</div>
						<div className="absolute h-full w-0 border border-gray-800"></div>
						<div className="w-full flex flex-row justify-center items-center">
							<span className="w-1/2 flex flex-row justify-center items-center">론</span>
							<span className="w-1/2 flex flex-row justify-center items-center">론</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<div className="flex flex-row flex-wrap lg:flex-nowrap justify-center items-center gap-2">
						<div className="flex flex-row justify-between items-center gap-2 w-[7.5rem] lg:w-[9rem]">
							<span className="text-xl lg:text-2xl">Game Mode</span>
						</div>
						<div className="flex flex-row flex-wrap gap-2 justify-center items-start w-[13rem] md:w-[20.5rem]">
							<Toggle
								left="4인마작"
								right="3인마작"
								toggled={sanma != null}
								onToggle={() => setSanma(sanma ? null : 'loss')}
							/>
						</div>
					</div>
					{sanma != null && (
						<div className="flex flex-row flex-wrap lg:flex-nowrap justify-center items-center gap-2">
							<div className="flex flex-row justify-between items-center gap-2 w-[7.5rem] lg:w-[9rem]">
								<span className="text-xl lg:text-2xl">쯔모 타점</span>
							</div>
							<div className="flex flex-row flex-wrap gap-2 justify-center items-start w-[13rem] md:w-[20.5rem]">
								<Toggle
									left="Loss"
									right="Bisection"
									toggled={sanma === 'bisection'}
									onToggle={() => setSanma(sanma === 'loss' ? 'bisection' : 'loss')}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
			<ul className="flex flex-col justify-center items-center gap-2">
				<li>
					<Han han={1} fus={[20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110]} settings={settings} />
				</li>
				<li>
					<Han han={2} fus={[20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110]} settings={settings} />
				</li>
				<li>
					<Han han={3} fus={[20, 25, 30, 40, 50, 60]} settings={settings} />
				</li>
				<li>
					<Han han={4} fus={[20, 25, 30]} settings={settings} />
				</li>
				<li>
					<ScoreSection
						title={
							<span>
								<H>3</H> 판 <H>70+</H> 부, <H>4</H> 판 <H>40+</H> 부, <H>5</H> 판
							</span>
						}
					>
						<ScoreCard title={<H>만관</H>} points={mangan} />
					</ScoreSection>
				</li>
				<li>
					<ScoreSection
						title={
							<span>
								<H>6-7</H> 판
							</span>
						}
					>
						<ScoreCard title={<H>하네만</H>} points={haneman} />
					</ScoreSection>
				</li>
				<li>
					<ScoreSection
						title={
							<span>
								<H>8-10</H> 판
							</span>
						}
					>
						<ScoreCard title={<H>배만</H>} points={baiman} />
					</ScoreSection>
				</li>
				<li>
					<ScoreSection
						title={
							<span>
								<H>11-12</H> 판
							</span>
						}
					>
						<ScoreCard title={<H>삼배만</H>} points={sanbaiman} />
					</ScoreSection>
				</li>
				<li>
					<ScoreSection
						title={
							<span>
								<H>13+</H> 판
							</span>
						}
					>
						<ScoreCard title={<H>헤아림 역만</H>} points={yakuman} />
					</ScoreSection>
				</li>
			</ul>
			<ul className="text-base lg:text-xl flex flex-col justify-center items-start gap-y-1 lg:gap-y-2 list-disc px-6">
				<li>
					<H>3</H> 판 <H>60</H> 부 and <H>4</H> 판 <H>30</H> 부 can be rounded up to a <H>mangan</H> in certain rule
					variations.
				</li>
				<li>
					3인 마작과 4인 마작의 점수는 기본적으로는 같으나, 쯔모 화료 시 북가의 점수를 빼고 지불하는 룰과 북가의 점수를 두 명이 반씩 나눠서 지불하는 룰이 있다.
				</li>
				<li>
					The general formula is as follows:
					<ol className="flex flex-col justify-center items-start gap-y-1 lg:gap-y-2 list-decimal ml-4 lg:ml-8 mt-1">
						<li>
							<H>역만</H>으로 화료했다면, <H>역만</H>하나당 기본 점수는 8000점 이고, step 8로 건너뛴다.
						</li>
						<li>화료한 역과 포함한 도라로 판수를 계산한다.</li>
						<li>
							판수가<H>5</H>판 이상이라면, 부수에 상관없이 step 8로 건너뛴다.:
							<ul className="flex flex-col justify-center items-start gap-y-1 lg:gap-y-2 list-disc ml-4 lg:ml-8 mt-1">
								<li>
									<H>5</H> = <H>만관</H>은 기본점수 2000점.
								</li>
								<li>
									<H>6-7</H> = <H>하네만</H>은 기본점수 3000점.
								</li>
								<li>
									<H>8-10</H> = <H>배만</H>은 기본점수 4000점.
								</li>
								<li>
									<H>11-12</H> = <H>삼배만</H>은 기본점수 6000점.
								</li>
								<li>
									<H>13+</H> = <H>헤아림 역만</H>은 기본점수 8000점.
								</li>
							</ul>
						</li>
						<li>
							부수를 결정하기 위해 화료 형태, 대기 형태, 머리의 형태, 몸통의 형태를 사용하고, 계산된 부수는 일의 자리에서 올림한다.:
							<ul className="flex flex-col justify-center items-start gap-y-1 lg:gap-y-2 list-disc ml-4 lg:ml-8 mt-1">
								<li>
									<H>20</H> 기본 부수
									<ul className="flex flex-col justify-center items-start gap-y-1 lg:gap-y-2 list-disc ml-4 lg:ml-8 mt-1">
										<li>
											<H>+2</H> 쯔모 화료했을 경우(룰에 따라 영상개화의 쯔모는 <H>0</H>부로 계산할 수도 있음)
										</li>
										<li>
											<H>+10</H> 멘젠 론 화료했을 경우
										</li>
										<li>
											<H>+2</H> 단기, 간짱, 변짱 대기로 화료했을 경우
										</li>
										<li>
											<H>+2</H> 머리가 역패일 경우(룰에 따라 연풍패 머리는 <H>+4</H>부로 계산할 수도 있음)
										</li>
									</ul>
								</li>
								<li>
									커쯔 하나당 <H>+2</H>부
									<ul className="flex flex-col justify-center items-start gap-y-1 lg:gap-y-2 list-disc ml-4 lg:ml-8 mt-1">
										<li>
											<H>x2</H> 안커 또는 안깡일 경우
										</li>
										<li>
											<H>x2</H> 요구패일 경우
										</li>
										<li>
											<H>x4</H> 깡쯔일 경우
										</li>
									</ul>
								</li>
								<li>
									치또이쯔는 항상 <H>25</H>부로 계산.
								</li>
								<li>
									핑후를 포함한 쯔모는 항상 <H>20</H>부로 계산.
								</li>
								<li>
									후로하면 최소 <H>30</H>부.
								</li>
							</ul>
						</li>
						<li>
							Calculate basic points with{' '}
							<span className="font-mono">
								부×2<sup>2+판</sup>
							</span>
							.
						</li>
						<li>
							<H>절상만관</H>을 사용할 경우,4판 30부, 3판 60부도 기본 점수 2000점으로 계산한다.
						</li>
						<li>
							기본 점수가 2000점 이상이지만 <H>4</H>판 이하일 경우, 기본 점수 2000점인 <H>만관</H>으로 계산한다.
						</li>
						<li>
							승리 시, 10의 자리에서 올림한 점수를 지불한다.:
							<ul className="flex flex-col justify-center items-start gap-y-1 lg:gap-y-2 list-disc ml-4 lg:ml-8 mt-1">
								<li>
									코 쯔모: 타가에게서 <H>1x</H>, 오야에게는 <H>2x</H>.
								</li>
								<li>
									코 론: 방총자에게서 <H>4x</H>.
								</li>
								<li>
									오야 쯔모: 타가에게서 <H>2x</H>.
								</li>
								<li>
									오야 론: 방총자에게서 <H>6x</H>.
								</li>
							</ul>
						</li>
					</ol>
				</li>
			</ul>
		</div>
	);
}

function Han({ han, fus, settings }: { han: number; fus: number[]; settings: ScoreSettings }) {
	return (
		<ScoreSection
			title={
				<span>
					<H>{han}</H> 판
				</span>
			}
		>
			<ul className="flex flex-row flex-wrap gap-1 justify-center items-center">
				{fus.map((fu) => (
					<li key={fu}>
						<Fu han={han} fu={fu} settings={settings} />
					</li>
				))}
			</ul>
		</ScoreSection>
	);
}

function Fu({ han, fu, settings }: { han: number; fu: number; settings: ScoreSettings }) {
	const res = calculateHanFu(han, fu, settings);
	const noTsumo = (han === 1 && fu === 20) || (han === 1 && fu === 25) || (han === 2 && fu === 25);
	const noRon =
		(han === 1 && fu === 20) ||
		(han === 1 && fu === 25) ||
		(han === 2 && fu === 20) ||
		(han === 3 && fu === 20) ||
		(han === 4 && fu === 20);
	return (
		<ScoreCard
			title={
				<span>
					<H>{fu}</H> 부
				</span>
			}
			noTsumo={noTsumo}
			noRon={noRon}
			points={res}
		/>
	);
}

function ScoreSection({ title, children }: { title: ReactNode; children: ReactNode }) {
	return (
		<div className="flex flex-col justify-center items-center gap-2">
			<span className="text-xl lg:text-2xl font-bold">{title}</span>
			{children}
		</div>
	);
}

function ScoreCard({
	title,
	noTsumo = false,
	noRon = false,
	points,
}: {
	title: ReactNode;
	noTsumo?: boolean;
	noRon?: boolean;
	points: {
		tsumoAsFromOya: number;
		tsumoAsKo: number;
		ronAsOya: number;
		ronAsKo: number;
	};
}) {
	return (
		<div className="w-28 h-28 lg:w-32 lg:h-32 flex flex-col justify-center items-center gap-1 lg:gap-3 p-0.5 rounded shadow bg-slate-200 dark:bg-gray-900">
			<span className="text-lg xl:text-xl font-semibold">{title}</span>
			<div className="relative w-full flex flex-col justify-center items-center gap-0.5 lg:gap-1 text-sm lg:text-lg">
				<div className="w-full flex flex-row justify-center items-center">
					<span className="w-1/2 flex flex-row justify-center items-center">
						{noTsumo ? '--' : points.tsumoAsFromOya}
					</span>
					<span className="w-1/2 flex flex-row justify-center items-center">{noTsumo ? '--' : points.tsumoAsKo}</span>
				</div>
				<div className="absolute h-full w-0 border border-gray-800"></div>
				<div className="w-full flex flex-row justify-center items-center">
					<span className="w-1/2 flex flex-row justify-center items-center">{noRon ? '--' : points.ronAsOya}</span>
					<span className="w-1/2 flex flex-row justify-center items-center">{noRon ? '--' : points.ronAsKo}</span>
				</div>
			</div>
		</div>
	);
}
