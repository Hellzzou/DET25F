export type Control = {
	value: string
	validity: boolean
	disabled: boolean
}
export type ControlArray = {
	value: Array<string>
	validity: boolean
	disabled: boolean
}
export type Aircraft = {
	number: string
}
export type FlightType = {
	name: string
}
export type Area = {
	name: string
}
export type NCArea = {
	name: string
}
export type Fuel = {
	quantity: string
}
export type Config = {
	name: string
}
export type User = {
	_id?: string
	rank: string
	name: string
	responsability: string
	email: string
	login?: string
	token?: string
	password: string
}
export type Flight = {
	_id?: string
	departureDate: string
	arrivalDate: string
	aircraft: string
	fuel: string
	config: string
	type: string
	mission: string
	area: string
	NCArea: string
	group: string
	client: string
	manager: string
	belonging: string
	chief: string
	pilot: string
	crewMembers: [string]
	status: string
	dayDuration: string
	nightDuration: string
	onTime: string
	offTime: string
	onDayDuration: string
	onNightDuration: string
	done: string
	cause: string
	crewTPA: CrewTPA
	pilotTPA: Array<PilotTPA>
	mecboTPA: Array<MecboTPA>
	radioTPA: Array<RadioTPA>
	denaeTPA: Array<DenaeTPA>
	pilotEQA: Array<PilotEQA>
}
export type Event = {
	_id: string
	departureDate: string
	arrivalDate: string
	event: string
	members: [string]
}
export type Alert = {
	_id?: string
	departureDate: string
	chief: string
	pilot: string
	mecbo: string
	nav: string
	rdr: string
	radio: string
	tech: string
}
export type CrewMember = {
	firstName: string
	surName: string
	rank: string
	crew?: string
	onBoardFunction: string
	groundFunction: string
	trigram: string
	tel?: string
	registration?: string
}
export type CrewTPA = {
	TMAHD: { name: string; value: boolean }
	COOPBAT: { name: string; value: boolean }
	SAR: { name: string; value: boolean }
	DITCHING: { name: string; value: boolean }
	SIMAR: { name: string; value: boolean }
}

export type PilotTPA = {
	name: string
	TPA: {
		ATTPC: { name: string; value: boolean }
		IFR: { name: string; value: boolean }
		LCS: { name: string; value: boolean }
	}
}
export type MecboTPA = {
	name: string
	TPA: {
		LCS: { name: string; value: boolean }
		PH: { name: string; value: string }
		TRP: { name: string; value: boolean }
	}
}
export type RadioTPA = {
	name: string
	TPA: {
		IMINT: { name: string; value: boolean }
		entCodage: { name: string; value: string }
	}
}
export type DenaeTPA = {
	name: string
	TPA: {
		PGPS: { name: string; value: boolean }
		appRDR: { name: string; value: string }
	}
}
export type PilotEQA = {
	name: string
	EQA: {
		PILJ: { name: string; value: string; validity: boolean }
		PILN: { name: string; value: string; validity: boolean }
		ATTJ: { name: string; value: string }
		BAN: { name: string; value: string }
		ATTN1: { name: string; value: boolean }
		ATTN: { name: string; value: boolean }
		AMVPADV: { name: string; value: boolean }
		AMVMANU: { name: string; value: boolean }
		AMVN: { name: string; value: boolean }
		STAND: { name: string; value: boolean }
		ERGTR: { name: string; value: boolean }
	}
}
export type PilotDateTPA = {
	TMAHD: Array<Date>
	COOPBAT: Date
	SAR: Date
	DITCHING: Date
	SIMAR: Date
	ATTPC: Date
	IFR: Date
	LCS: Date
}
export type PilotDateEQA = {
	ATTJ: Array<Date>
	ATTN1: Date
	ATTN: Date
	AMVPADV: Date
	AMVM: Date
	AMVN: Date
	STAND: Date
	ERGTR: Date
	BAN: number
	lastYear: number
	fourMonths: number
	fourMonthsNight: number
	lastMonth: number
}
export type MecboDateTPA = {
	TMAHD: Array<Date>
	COOPBAT: Date
	SAR: Date
	DITCHING: Date
	SIMAR: Date
	LCS: Date
	PH: Array<Date>
	TRP: Date
}
export type RadioDateTPA = {
	TMAHD: Array<Date>
	COOPBAT: Date
	SAR: Date
	DITCHING: Date
	SIMAR: Date
	IMINT: Array<Date>
	entCodage: Array<Date>
}
export type DenaeDateTPA = {
	TMAHD: Array<Date>
	COOPBAT: Date
	SAR: Date
	DITCHING: Date
	SIMAR: Date
	appRDR: Array<Date>
	PGPS: Date
}
export type AllTPAs = {
	pilotTPA: Array<{ name: string; TPA: PilotDateTPA }>
	mecboTPA: Array<{ name: string; TPA: MecboDateTPA }>
	radioTPA: Array<{ name: string; TPA: RadioDateTPA }>
	denaeTPA: Array<{ name: string; TPA: DenaeDateTPA }>
}
export type AllEQAs = Array<{ name: string; EQA: PilotDateEQA }>

export type Nights = Array<Array<{ jour: string; nuit: string }>>

export type Group = {
	group: string
	underGroup: string
	description: string
	manager: string
	client: string
	allocation: number
}
export type Duration = {
	dayDuration: number
	nightDuration: number
}
export type ChartDatas = {
	labels: string[]
	datasets: {
		label: string
		data: number[]
		backgroundColor: string
		borderColor: string
	}[]
}
export type Etat400View = {
	date: string
	crew: string
	takeOff: string
	duration: number
	type: string
	mission: string
	underGroup: string
	fuel: string
	config: string
}
export type FDVView = {
	crew: string
	chief: string
	crewMembers: string
	takeOff: string
	duration: number
	type: string
	mission: string
	underGroup: string
	fuel: string
	config: string
}
