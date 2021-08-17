export type event = {
	start: Date
	end: Date
	mission: string
	CDA: string
	PAX: Array<string>
	crew: string
	fuel: string
	aircraft: string
}
export type alert = {
	CDA: string
	PAX: Array<string>
}
export type otherEvent = {
	start: Date
	end: Date
	title: string
	PAX: Array<string>
}
export type control = {
	value: string
	validity: boolean
	disabled: boolean
}
export type controlArray = {
	value: Array<string>
	validity: boolean
	disabled: boolean
}
export type disabledControl = {
	value: string
	validity: boolean
	disabled: boolean
}
export type user = {
	rank: string
	name: string
	function: string
	token: string
	error: string
}
export type error = {
	error: string
}
export type flight = {
	_id: string
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
	crewTPA: crewTPA
	pilotTPA: Array<pilotTPA>
	mecboTPA: Array<mecboTPA>
	radioTPA: Array<radioTPA>
	denaeTPA: Array<denaeTPA>
	pilotEQA: Array<pilotEQA>
}
export type newEvent = {
	_id: string
	departureDate: string
	arrivalDate: string
	event: string
	members: [string]
}
export type newAlert = {
	_id: string
	departureDate: string
	chief: string
	pilot: string
	mecbo: string
	nav: string
	rdr: string
	radio: string
}
export type crewMember = {
	firstName: string
	surName: string
	rank: string
	onBoardFunction: string
	groundFunction: string
	trigram: string
	tel?: string
	registration?: string
}
export type crewTPA = {
	TMAHD: { name: string; value: boolean }
	COOPBAT: { name: string; value: boolean }
	SAR: { name: string; value: boolean }
	DITCHING: { name: string; value: boolean }
	SIMAR: { name: string; value: boolean }
}

export type pilotTPA = {
	name: string
	TPA: {
		ATTPC: { name: string; value: boolean }
		IFR: { name: string; value: boolean }
		LCS: { name: string; value: boolean }
	}
}
export type mecboTPA = {
	name: string
	TPA: {
		LCS: { name: string; value: boolean }
		PH: { name: string; value: string }
		TRP: { name: string; value: boolean }
	}
}
export type radioTPA = {
	name: string
	TPA: Array<{ name: string; value: boolean }>
}
export type denaeTPA = {
	name: string
	TPA: {
		PGPS: { name: string; value: boolean }
		appRDR: { name: string; value: string }
	}
}
export type pilotEQA = {
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
export type pilotDateTPA = {
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
	ATTJOUR: Array<Date>
	ATTN_1: Date
	ATTN: Date
	AMVPADV: Date
	AMVM: Date
	AMVN: Date
	STAND: Date
	ERGTR: Date
	BANUIT: number
	lastYear: number
	fourMonths: number
	fourMonthsNight: number
	lastMonth: number
}
export type mecboDateTPA = {
	TMAHD: Array<Date>
	COOPBAT: Date
	SAR: Date
	DITCHING: Date
	SIMAR: Date
	LCS: Date
	PH: Array<Date>
	TRP: Date
}
export type radioDateTPA = {
	TMAHD: Array<Date>
	COOPBAT: Date
	SAR: Date
	DITCHING: Date
	SIMAR: Date
	IMINT: Array<Date>
}
export type denaeDateTPA = {
	TMAHD: Array<Date>
	COOPBAT: Date
	SAR: Date
	DITCHING: Date
	SIMAR: Date
	APPRDR: Array<Date>
	PGPS: Date
}
export type allTPAs = {
	pilotTPA: Array<{ name: string; TPA: pilotDateTPA }>
	mecboTPA: Array<{ name: string; TPA: mecboDateTPA }>
	radioTPA: Array<{ name: string; TPA: radioDateTPA }>
	denaeTPA: Array<{ name: string; TPA: denaeDateTPA }>
}
export type AllEQAs = Array<{ name: string; EQA: PilotDateEQA }>

export type Nights = Array<Array<{ jour: string; nuit: string }>>
