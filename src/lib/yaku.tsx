import { ReactNode } from 'react';
import type { TileCode } from './hand';
import H from '../components/text/H';

export interface Yaku {
	/** Kanji name as in riichi library. */
	id: string;
	name: string;
	type: 'normal' | 'optional' | 'local' | 'extra';
	value: number;
	yakuman: boolean;
	openMinus: boolean;
	closedOnly: boolean;
	basic: boolean;
	per: boolean;
	example?: TileCode[][];
	help?: ReactNode;
}

type Partially<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

function yaku({
	id,
	name,
	type = 'normal',
	value,
	yakuman = false,
	openMinus = false,
	closedOnly = false,
	basic = false,
	per = false,
	example,
	help = null,
}: Partially<Yaku, 'type' | 'yakuman' | 'openMinus' | 'closedOnly' | 'basic' | 'per'>): Yaku {
	return { id, name, type, value, yakuman, openMinus, closedOnly, basic, per, example, help };
}

export const YakuList = {
	// Double Yakuman
	国士無双十三面待ち: yaku({
		id: '国士無双十三面待ち',
		name: '국사무쌍 13면대기',
		yakuman: true,
		value: 2,
		closedOnly: true,
		help: (<span>요구패 13종을 하나씩 가지고 13면대기로 국사무쌍을 화료하면 성립.</span>
		),
	}),
	純正九蓮宝燈: yaku({
		id: '純正九蓮宝燈',
		name: '순정구련보등',
		yakuman: true,
		value: 2,
		closedOnly: true,
		help: (
			<span>
				한 종류의 수패로 <H.B>1112345678999</H.B>를 만든 상태에서 9면대기로 구련보등을 화료하면 성립.
			</span>
		),
	}),
	四暗刻単騎待ち: yaku({
		id: '四暗刻単騎待ち',
		name: '쓰안커 단기',
		yakuman: true,
		value: 2,
		closedOnly: true,
		help: <span>안커를 4개 모은 상태에서 단기대기로 화료하면 성립.</span>,
	}),
	大四喜: yaku({
		id: '大四喜',
		name: '대사희',
		yakuman: true,
		value: 2,
		help: <span>네 종류의 풍패를 모두 몸통으로 만들어 화료하면 성립.</span>,
		example: [
			['1z', '1z', '1z'],
			['2z', '2z', '2z'],
			['3z', '3z', '3z'],
			['4z', '4z', '4z'],
		],
	}),
	// Yakuman
	天和: yaku({ id: '天和', name: '천화', yakuman: true, value: 1, closedOnly: true }),
	地和: yaku({ id: '地和', name: '지화', yakuman: true, value: 1, closedOnly: true }),
	人和: yaku({
		id: '人和',
		name: '인화',
		type: 'local',
		yakuman: true,
		value: 1,
		closedOnly: true,
		help: <span>자신의 순정 1순 쯔모 전에 론으로 화료하면 성립.</span>,
	}),
	国士無双: yaku({
		id: '国士無双',
		name: '국사무쌍',
		yakuman: true,
		value: 1,
		closedOnly: true,
		help: (
			<span>
				모든 종류의 요구패를 모으고, 그 중 하나를 두 개 모으면 성립.
			</span>
		),
		example: [['1m', '9m', '1p', '9p', '1s', '9s', '1z', '2z', '3z', '4z', '5z', '6z', '7z']],
	}),
	九蓮宝燈: yaku({
		id: '九蓮宝燈',
		name: '구련보등',
		yakuman: true,
		value: 1,
		closedOnly: true,
		help: (
			<span>
				한 종류의 수패로 1과 9를 세 개씩, 나머지 2~8패를 하나씩 모으고, 1~9중 하나를 하나 더 모으면 성립.
			</span>
		),
		example: [['1p', '1p', '1p', '2p', '3p', '4p', '5p', '6p', '7p', '8p', '9p', '9p', '9p']],
	}),
	四暗刻: yaku({
		id: '四暗刻',
		name: '쓰깡쯔',
		yakuman: true,
		value: 1,
		closedOnly: true,
		help: <span>안커 4개를 만들고 화료하면 성립.</span>,
		example: [['1m', '1m', '2p', '2p', '2p', '3p', '3p', '3p', '4s', '4s', '4s', '1z', '1z', '1z']],
	}),
	小四喜: yaku({
		id: '小四喜',
		name: '소사희',
		yakuman: true,
		value: 1,
		help: <span>네 종류의 풍패 중 세 종류를 몸통으로, 나머지 한 종류의 풍패를 머리로 화료하면 성립.</span>,
		example: [
			['1z', '1z', '1z'],
			['2z', '2z', '2z'],
			['3z', '3z', '3z'],
			['4z', '4z'],
		],
	}),
	大三元: yaku({
		id: '大三元',
		name: '대삼원',
		yakuman: true,
		value: 1,
		help: <span>세 종류의 삼원패를 모두 몸통으로 만들고 화료하면 성립.</span>,
		example: [
			['5z', '5z', '5z'],
			['6z', '6z', '6z'],
			['7z', '7z', '7z'],
		],
	}),
	字一色: yaku({
		id: '字一色',
		name: '자일색',
		yakuman: true,
		value: 1,
		help: <span>자패만으로 화료하면 성립.</span>,
		example: [
			['1z', '1z', '1z'],
			['7z', '7z', '7z'],
		],
	}),
	緑一色: yaku({
		id: '緑一色',
		name: '녹일색',
		yakuman: true,
		value: 1,
		help: (
			<span>
				삭수패 2, 3, 4, 6, 8, 발패만으로 화료하면 성립.
			</span>
		),
		example: [['2s', '3s', '4s', '6s', '8s', '6z']],
	}),
	清老頭: yaku({
		id: '清老頭',
		name: '청노두',
		yakuman: true,
		value: 1,
		help: <span> 노두패(1,9)로만 화료하면 성립.</span>,
		example: [
			['1m', '1m', '1m'],
			['1p', '1p', '1p'],
			['9s', '9s', '9s'],
		],
	}),
	四槓子: yaku({
		id: '四槓子',
		name: '쓰깡쯔',
		yakuman: true,
		value: 1,
		help: <span>깡을 4번 치고 화료하면 성립.</span>,
		example: [
			['1m', '1m'],
			['3p', '3p', '3p', '3p'],
			['4s', '4s', '4s', '4s'],
			['8s', '8s', '8s', '8s'],
			['1z', '1z', '1z', '1z'],
		],
	}),
	大七星: yaku({
		id: '大七星',
		name: '대칠성',
		type: 'local',
		yakuman: true,
		value: 2,
		closedOnly: true,
		help: <span>7종류의 자패를 이용하여 치또이쯔 화료하면 성립.</span>,
		example: [['1z', '1z', '2z', '2z', '3z', '3z', '4z', '4z', '5z', '5z', '6z', '6z', '7z', '7z']],
	}),
	大数隣: yaku({
		id: '大数隣',
		name: '대수린',
		type: 'local',
		yakuman: true,
		value: 1,
		closedOnly: true,
		help: <span>2~8의 만수패를 이용하여 치또이쯔 화료하면 성립.</span>,
		example: [['2m', '2m', '3m', '3m', '4m', '4m', '5m', '5m', '6m', '6m', '7m', '7m', '8m', '8m']],
	}),
	大車輪: yaku({
		id: '大車輪',
		name: '대차륜',
		type: 'local',
		yakuman: true,
		value: 1,
		closedOnly: true,
		help: <span>2~8의 통수패를 이용하여 치또이쯔 화료하면 성립.</span>,
		example: [['2p', '2p', '3p', '3p', '4p', '4p', '5p', '5p', '6p', '6p', '7p', '7p', '8p', '8p']],
	}),
	大竹林: yaku({
		id: '大竹林',
		name: '대죽림',
		type: 'local',
		yakuman: true,
		value: 1,
		closedOnly: true,
		help: <span>2~8의 삭수패를 이용하여 치또이쯔 화료하면 성립.</span>,
		example: [['2s', '2s', '3s', '3s', '4s', '4s', '5s', '5s', '6s', '6s', '7s', '7s', '8s', '8s']],
	}),
	紅孔雀: yaku({
		id: '紅孔雀',
		name: '홍공작',
		type: 'local',
		yakuman: true,
		value: 1,
		help: <span>삭수패 1,5,7,9,중패를 이용하여 화료하면 성립.</span>,
		example: [['1s', '5s', '7s', '9s', '7z']],
	}),
	黒一色: yaku({
		id: '黒一色',
		name: '흑일색',
		type: 'local',
		yakuman: true,
		value: 1,
		help: <span>통수패 2, 4, 8과 풍패만을 이용하여 화료하면 성립.</span>,
		example: [['2p', '4p', '8p', '1z', '2z', '3z', '4z']],
	}),
	百万石: yaku({
		id: '百万石',
		name: '백만석',
		type: 'local',
		yakuman: true,
		value: 1,
		help: <span>만수패로만 화료했을 때, 그 숫자의 합이 100 이상이면 성립.</span>,
		example: [
			['1m', '2m', '3m', '6m', '6m', '6m', '7m', '7m'],
			['8m', '8m', '8m', '8m'],
			['9m', '9m', '9m', '9m'],
		],
	}),
	// Riichi & Special
	立直: yaku({
		id: '立直',
		name: '리치',
		value: 1,
		closedOnly: true,
		basic: true,
		help: (
			<span>
				멘젠 텐파이 상태에서 1000점을 공탁하고 리치를 선언하면 성립.
			</span>
		),
	}),
	ダブル立直: yaku({
		id: 'ダブル立直',
		name: '더블 리치',
		type: 'optional',
		value: 2,
		closedOnly: true,
		help: (
			<span>
				순정 1순에 리치를 선언하면 성립.
			</span>
		),
	}),
	一発: yaku({
		id: '一発',
		name: '일발',
		type: 'optional',
		value: 1,
		closedOnly: true,
		help: (
			<span>
				리치 선언 후 순정 1순 내로 화료하면 성립.
			</span>
		),
	}),
	門前清自摸和: yaku({
		id: '門前清自摸和',
		name: '멘젠쯔모',
		value: 1,
		closedOnly: true,
		help: <span>멘젠 상태에서 쯔모 화료하면 성립.</span>,
	}),
	嶺上開花: yaku({
		id: '嶺上開花',
		name: '영상개화',
		type: 'optional',
		value: 1,
		help: (
			<span>
				깡을 선언한 후 가져온 영상패로 쯔모 화료하면 성립.
			</span>
		),
	}),
	搶槓: yaku({
		id: '搶槓',
		name: '창깡',
		type: 'optional',
		value: 1,
		help: <span>타가가 가깡을 선언한 패로 론 화료하면 성립.</span>,
	}),
	海底摸月: yaku({
		id: '海底摸月',
		name: '해저로월',
		type: 'optional',
		value: 1,
		help: <span>패산의 마지막 패로 쯔모 화료하면 성립.</span>,
	}),
	河底撈魚: yaku({
		id: '河底撈魚',
		name: '하저로어',
		type: 'optional',
		value: 1,
		help: <span>마지막 버림패로 론 화료하면 성립.</span>,
	}),
	// 1 Han
	場風東: yaku({ id: '場風東', name: '장풍 동', value: 1, basic: true }),
	場風南: yaku({ id: '場風南', name: '장풍 남', value: 1, basic: true }),
	場風西: yaku({ id: '場風西', name: '장풍 서', value: 1, basic: true }),
	場風北: yaku({ id: '場風北', name: '장풍 북', value: 1, basic: true }),
	自風東: yaku({ id: '自風東', name: '자풍 동', value: 1, basic: true }),
	自風南: yaku({ id: '自風南', name: '자풍 남', value: 1, basic: true }),
	自風西: yaku({ id: '自風西', name: '자풍 서', value: 1, basic: true }),
	自風北: yaku({ id: '自風北', name: '자풍 북', value: 1, basic: true }),
	客風北: yaku({ id: '客風北', name: '북도라', value: 1, basic: true }),
	役牌白: yaku({ id: '役牌白', name: '역패 백', value: 1, basic: true }),
	役牌発: yaku({ id: '役牌発', name: '역패 발', value: 1, basic: true }),
	役牌中: yaku({ id: '役牌中', name: '역패 중', value: 1, basic: true }),
	平和: yaku({
		id: '平和',
		name: '핑후',
		type: 'optional',
		value: 1,
		closedOnly: true,
		help: (
			<span>
				멘젠 상태로 멘쯔 4개를 슌쯔로 만들고, 머리가 수패 혹은 객풍패인 상태에서 양면대기로 화료하면 성립.
			</span>
		),
		example: [['1p'], ['2p', '3p'], ['4p']],
	}),
	断么九: yaku({
		id: '断么九',
		name: '탕야오',
		type: 'optional',
		value: 1,
		basic: true,
		help: (
			<span>요구패를 사용하지 않고 화료하면 성립.</span>
		),
		example: [['2m', '3m', '4m', '5p', '6p', '7p', '8s']],
	}),
	一盃口: yaku({
		id: '一盃口',
		name: '이페코',
		value: 1,
		closedOnly: true,
		help: <span>멘젠 상태에서 동일한 슌쯔 2개를 만들어 화료하면 성립.</span>,
		example: [['1m', '1m', '2m', '2m', '3m', '3m']],
	}),
	十二落抬: yaku({
		id: '十二落抬',
		name: '십이낙태',
		type: 'local',
		value: 1,
		basic: true,
		help: (
			<span>
				몸통을 모두 후로하여 구성한 상태에서 단기대기로 화료하면 성립.
			</span>
		),
		example: [
			['1z', '1z'],
			['1m', '2m', '3m'],
			['2p', '3p', '4p'],
			['6s', '7s', '8s'],
			['9s', '9s', '9s', '9s'],
		],
	}),
	// 1+ Han
	三色同順: yaku({
		id: '三色同順',
		name: '삼색동순',
		value: 2,
		openMinus: true,
		help: <span>세 종류의 수패로 동일한 숫자로 이루어진 슌쯔를 만들면 성립.</span>,
		example: [
			['1m', '2m', '3m'],
			['1p', '2p', '3p'],
			['1s', '2s', '3s'],
		],
	}),
	一気通貫: yaku({
		id: '一気通貫',
		name: '일기통관',
		value: 2,
		openMinus: true,
		help: (
			<span>
				한 종류의 수패로 123, 456, 789를 몸통으로 만들어 화료하면 성립.
			</span>
		),
		example: [
			['1p', '2p', '3p'],
			['4p', '5p', '6p'],
			['7p', '8p', '9p'],
		],
	}),
	混全帯么九: yaku({
		id: '混全帯么九',
		name: '찬타',
		value: 2,
		openMinus: true,
		help: <span>모든 몸통과 머리에 요구패를 포함하여 화료하면 성립.</span>,
		example: [
			['1p', '2p', '3p'],
			['9p', '9p', '9p'],
			['7z', '7z', '7z'],
		],
	}),
	// 2 Han
	七対子: yaku({
		id: '七対子',
		name: '치또이쯔',
		value: 2,
		closedOnly: true,
		basic: true,
		help: (
			<span>7종류의 패로 머리 7개를 만들어 화료하면 성립.</span>
		),
		example: [['1m', '1m', '2m', '2m', '3p', '3p', '5p', '5p', '7s', '7s', '9s', '9s', '1z', '1z']],
	}),
	五門斉: yaku({
		id: '五門斉',
		name: '오문제',
		type: 'local',
		value: 2,
		help: <span>만수, 통수, 삭수, 풍패, 삼원패를 모두 이용하여 화료하면 성립.</span>,
		example: [
			['2m', '2m', '2m'],
			['2p', '3p', '4p'],
			['9s', '9s', '9s'],
			['1z', '1z', '1z'],
			['7z', '7z'],
		],
	}),
	対々和: yaku({
		id: '対々和',
		name: '또이또이',
		value: 2,
		basic: true,
		help: <span>몸통을 모두 커쯔로 구성하여 화료하면 성립.</span>,
		example: [
			['1m', '1m'],
			['2m', '2m', '2m'],
			['3p', '3p', '3p'],
			['5p', '5p', '5p'],
			['9s', '9s', '9s'],
		],
	}),
	三色同刻: yaku({
		id: '三色同刻',
		name: '삼색동각',
		value: 2,
		help: <span>세 종류의 수패로 같은 숫자의 커쯔를 만들어 화료하면 성립.</span>,
		example: [
			['5m', '5m', '5m'],
			['5p', '5p', '5p'],
			['5s', '5s', '5s'],
		],
	}),
	三暗刻: yaku({
		id: '三暗刻',
		name: '산안커',
		value: 2,
		help: <span>안커 3개를 만들고 화료하면 성립.</span>,
		example: [
			['1m', '1m', '9p', '9p', '9p', '4s', '4s', '4s', '1z', '1z', '1z'],
			['1p', '2p', '3p'],
		],
	}),
	三連刻: yaku({
		id: '三連刻',
		name: '삼련각',
		type: 'local',
		value: 2,
		help: <span>한 종류의 수패로 연속된 숫자의 커쯔를 3개 만들고 화료하면 성립.</span>,
		example: [
			['3p', '3p', '3p'],
			['4p', '4p', '4p'],
			['5p', '5p', '5p'],
		],
	}),
	三槓子: yaku({
		id: '三槓子',
		name: '산깡쯔',
		value: 2,
		help: <span>깡을 세 번 치고 화료하면 성립.</span>,
		example: [
			['1p', '1p', '3p', '4p', '5p'],
			['4s', '4s', '4s', '4s'],
			['8s', '8s', '8s', '8s'],
			['1z', '1z', '1z', '1z'],
		],
	}),
	小三元: yaku({
		id: '小三元',
		name: '소삼원',
		value: 2,
		help: (
			<span>
				세 종류의 삼원패 중 두 종류를 몸통으로, 나머지 한 종류를 머리로 하여 화료하면 성립.
			</span>
		),
		example: [
			['5z', '5z', '5z'],
			['6z', '6z', '6z'],
			['7z', '7z'],
		],
	}),
	混老頭: yaku({
		id: '混老頭',
		name: '혼노두',
		value: 2,
		help: <span>1, 9, 자패만으로 화료하면 성립.</span>,
		example: [
			['1p', '1p', '1p'],
			['9p', '9p', '9p'],
			['7z', '7z', '7z'],
		],
	}),
	// 2+ Han
	一色三順: yaku({
		id: '一色三順',
		name: '일색삼순',
		type: 'local',
		value: 3,
		openMinus: true,
		help: <span>한 종류의 수패로 동일한 슌쯔를 3개 만들고 화료하면 성립.</span>,
		example: [
			['1p', '2p', '3p'],
			['1p', '2p', '3p'],
			['1p', '2p', '3p'],
		],
	}),
	純全帯么九: yaku({
		id: '純全帯么九',
		name: '준찬타',
		value: 3,
		openMinus: true,
		help: <span>자패가 없는 상태에서 모든 몸통과 머리에 요구패를 포함하여 화료하면 성립.</span>,
		example: [
			['1p', '2p', '3p'],
			['9p', '9p', '9p'],
		],
	}),
	混一色: yaku({
		id: '混一色',
		name: '혼일색',
		value: 3,
		openMinus: true,
		basic: true,
		help: <span>자패와 한 종류의 수패만으로 화료하면 성립.</span>,
		example: [
			['1p', '2p', '3p'],
			['1z', '1z', '1z'],
			['7z', '7z', '7z'],
		],
	}),
	// 3 Han
	二盃口: yaku({
		id: '二盃口',
		name: '량페코',
		value: 3,
		closedOnly: true,
		help: <span>멘젠 상태에서 이페코를 두 개 만들고 화료하면 성립.</span>,
		example: [
			['1m', '1m', '2m', '2m', '3m', '3m'],
			['5p', '5p', '6p', '6p', '7p', '7p'],
		],
	}),
	// 5+ Han
	清一色: yaku({
		id: '清一色',
		name: '청일색',
		value: 6,
		openMinus: true,
		help: <span>한 종류의 수패만으로 화료하면 성립.</span>,
		example: [['1p', '2p', '3p']],
	}),
	// Dora
	ドラ: yaku({ id: 'ドラ', name: '도라', type: 'extra', value: 1 }),
	裏ドラ: yaku({ id: '裏ドラ', name: '뒷도라', type: 'extra', value: 1 }),
	赤ドラ: yaku({ id: '赤ドラ', name: '적도라', type: 'extra', value: 1 }),
	抜きドラ: yaku({ id: '抜きドラ', name: '북도라', type: 'extra', value: 1 }),
	// Extra
	他の役満: yaku({ id: '他の役満', name: 'Other 역만', type: 'extra', value: 1 }),
	他の役: yaku({ id: '他の役', name: 'Other 역', type: 'extra', value: 1 }),
	他のドラ: yaku({ id: '他のドラ', name: 'Other 도라', type: 'extra', value: 1 }),
} as const;

export const YakuSort = Object.fromEntries(Object.keys(YakuList).map((x, i) => [x, i]));

export type YakuReferenceNode =
	| { t: 'yaku'; yaku: keyof typeof YakuList }
	| ({
			t: 'other';
	  } & Omit<Yaku, 'id'>);

export type YakuReferenceItem = YakuReferenceNode & {
	inner: YakuReferenceNode[];
};

function ref(yaku: keyof typeof YakuList): YakuReferenceNode {
	return { t: 'yaku', yaku };
}

function yakuRef(
	yaku: keyof typeof YakuList,
	{
		inner = [],
	}: {
		inner?: YakuReferenceNode[];
	} = {},
): YakuReferenceItem {
	return { t: 'yaku', yaku, inner };
}

function otherRef({
	name,
	type = 'normal',
	value,
	yakuman = false,
	closedOnly = false,
	openMinus = false,
	basic = false,
	per = false,
	help,
	example,
	inner = [],
}: {
	inner?: YakuReferenceNode[];
} & Omit<Partially<Yaku, 'type' | 'yakuman' | 'openMinus' | 'closedOnly' | 'basic' | 'per'>, 'id'>): YakuReferenceItem {
	return { t: 'other', name, type, help, inner, value, yakuman, closedOnly, openMinus, basic, per, example };
}

export function referenceToYaku(node: YakuReferenceNode): Omit<Yaku, 'id'> {
	return node.t === 'yaku' ? YakuList[node.yaku] : node;
}

export const YakuReferenceSort: YakuReferenceItem[] = [
	// Closed hand
	yakuRef('立直', { inner: [ref('ダブル立直'), ref('一発')] }),
	yakuRef('門前清自摸和'),
	yakuRef('平和'),
	yakuRef('一盃口', { inner: [ref('二盃口')] }),
	yakuRef('七対子', { inner: [ref('大数隣'), ref('大車輪'), ref('大竹林'), ref('大七星')] }),
	// Yakuhai
	otherRef({
		name: '역패 (삼원패)',
		value: 1,
		per: true,
		help: (
			<span>
				백, 발, 중 중 한 종류를 몸통으로 만들어 화료하면 성립. <H>1</H>판.
			</span>
		),
		example: [['7z', '7z', '7z']],
		basic: true,
		inner: [yakuRef('小三元'), yakuRef('大三元')],
	}),
	otherRef({
		name: '역패 (풍패)',
		value: 1,
		per: true,
		help: (
			<span>
				장풍패 또는 자풍패를 몸통으로 만들어 화료하면 성립.<H>1</H>판. 장풍패와 자풍패가 동일할 경우<H>2</H>판.

			</span>
		),
		example: [['1z', '1z', '1z']],
		basic: true,
		inner: [yakuRef('小四喜'), yakuRef('大四喜')],
	}),
	// All simples
	yakuRef('断么九'),
	// All calls
	yakuRef('十二落抬'),
	// Sequences
	yakuRef('三色同順'),
	yakuRef('一色三順'),
	yakuRef('一気通貫'),
	// Terminals and honors
	yakuRef('混全帯么九', { inner: [ref('純全帯么九'), ref('混老頭'), ref('清老頭'), ref('字一色')] }),
	// Triplets
	yakuRef('対々和'),
	yakuRef('三色同刻'),
	yakuRef('三連刻'),
	// Concealed triplets
	yakuRef('三暗刻', { inner: [ref('四暗刻'), ref('四暗刻単騎待ち')] }),
	// Quads
	yakuRef('三槓子', { inner: [ref('四槓子')] }),
	// All types
	yakuRef('五門斉'),
	// Flushes
	yakuRef('混一色', {
		inner: [
			ref('清一色'),
			ref('緑一色'),
			ref('紅孔雀'),
			ref('黒一色'),
			ref('百万石'),
			ref('九蓮宝燈'),
			ref('純正九蓮宝燈'),
		],
	}),
	// Thirteen orphans
	yakuRef('国士無双', { inner: [ref('国士無双十三面待ち')] }),
	// Other yaku
	otherRef({
		name: '해저로월, 하저로어',
		value: 1,
		help: <span>패산의 마지막 패로 쯔모화료 하거나 마지막 버림패로 론 화료하면 성립.</span>,
	}),
	yakuRef('嶺上開花'),
	yakuRef('搶槓'),
	otherRef({
		name: '천화, 지화',
		yakuman: true,
		closedOnly: true,
		value: 1,
		help: <span>자신의 순정 1순 쯔모로 화료하면 성립.</span>,
		inner: [ref('人和')],
	}),
	otherRef({
		name: '유국만관',
		value: 5,
		help: (
			<span>
				황패유국 시, 자신의 버림패가 모두 요구패이고, 그것을 아무도 후로하지 않았을 때 <H>만관</H>에 해당하는 점수를 받는 것. 룰에 따라 <H>만관</H> 또는 <H>5</H>판 등으로 계산될 수 있다.
			</span>
		),
	}),
	// Dora
	otherRef({
		name: '도라',
		value: 1,
		per: true,
		basic: true,
		type: 'extra',
		help: (
			<span>
				매 국 시작 시 공개되는 도라표시패의 다음 패. 뒷도라는 도라표시패 밑에 있는 뒷도라표시패의 다음 패. 리치 화료시 공개된다. 빨간색 수패(적도라) 또한 도라로 취급된다. 화료 시 각 도라는
				<H>1</H>판으로 계산된다.
			</span>
		),
		example: [
			['9p', '1p'],
			['1z', '2z', '3z', '4z', '1z'],
			['5z', '6z', '7z', '5z'],
			['0m', '0p', '0s'],
		],
	}),
	otherRef({
		name: '북도라',
		value: 1,
		per: true,
		type: 'extra',
		help: (
			<span>
				3인 마작에서, 북빼기를 통해 패에서 제외한 북은 도라로 취급된다.
			</span>
		),
		example: [['4z']],
	}),
];
