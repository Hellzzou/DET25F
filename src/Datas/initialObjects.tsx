export const INITIAL_ALERT = {
	_id: "",
	departureDate: "",
	chief: "",
	pilot: "",
	mecbo: "",
	nav: "",
	rdr: "",
	radio: "",
	tech: "",
}
export const INITIAL_CREWMEMBER = {
	firstName: "",
	surName: "",
	rank: "",
	onBoardFunction: "",
	groundFunction: "",
	trigram: "",
	tel: "",
	registration: "",
	holidays: 0,
}
export const INITIAL_USER = {
	rank: "",
	name: "",
	email: "",
	login: "",
	responsability: "",
	password: "",
}
export const INITIAL_CHART_DATA = {
	labels: [""],
	datasets: [
		{
			label: "",
			data: [1],
			backgroundColor: [""],
			borderColor: [""],
		},
	],
}
export const old = new Date(1970, 1, 1)

export const INITIAL_PILOT_DATE_TPA = {
	TMAHD: [old, old],
	COOPBAT: old,
	SAR: old,
	DITCHING: old,
	SIMAR: old,
	ATTPC: old,
	IFR: old,
	LCS: old,
}

export const INITIAL_MECBO_DATE_TPA = {
	TMAHD: [old, old],
	COOPBAT: old,
	SAR: old,
	DITCHING: old,
	SIMAR: old,
	LCS: old,
	PH: [old, old],
	TRP: old,
}
export const INITIAL_RADIO_DATE_TPA = {
	TMAHD: [old, old],
	COOPBAT: old,
	SAR: old,
	DITCHING: old,
	SIMAR: old,
	IMINT: [old, old],
	entCodage: [old, old, old, old],
}
export const INITIAL_DENAE_DATE_TPA = {
	TMAHD: [old, old],
	COOPBAT: old,
	SAR: old,
	DITCHING: old,
	SIMAR: old,
	appRDR: [old, old, old, old, old, old],
	PGPS: old,
}
export const INITIAL_PILOT_DATE_EQA = {
	ATTJ: [old, old],
	ATTN1: old,
	ATTN: old,
	AMVPADV: old,
	AMVM: old,
	AMVN: old,
	STAND: old,
	ERGTR: old,
	BAN: 0,
	lastYear: 0,
	fourMonths: 0,
	fourMonthsNight: 0,
	lastMonth: 0,
}
export const INITIAL_GROUP = [
	{
		group: "1",
		underGroup: "110",
		description: "",
		manager: "",
		client: "",
		allocation: 0,
	},
]
export const INITIAL_UPGRADEDGROUP = [
	{
		group: "1",
		underGroup: "110",
		updradedUnderGroup: 0,
		description: "",
		manager: "",
		client: "",
		allocation: 0,
	},
]
export const INITIAL_FALSE_CONTROL = {
	value: "",
	validity: false,
	disabled: false,
}
export const INITIAL_FALSE_SELECT = {
	value: "Choix...",
	validity: false,
	disabled: false,
}
export const INITIAL_CREWTPA = {
	TMAHD: { name: "TMA HD", value: false },
	COOPBAT: { name: "coop BAT", value: false },
	SAR: { name: "SAR/SECMAR", value: false },
	DITCHING: { name: "Ditching", value: false },
	SIMAR: { name: "SIMAR", value: false },
}
export const INITIAL_PILOTTPA = {
	ATTPC: { name: "ATT PC", value: false },
	IFR: { name: "IFR", value: false },
	LCS: { name: "LCS", value: false },
}
export const INITIAL_MECBOTPA = {
	LCS: { name: "LCS", value: false },
	PH: { name: "photos", value: "" },
	TRP: { name: "Trappe manu", value: false },
}

export const INITIAL_RADIOTPA = {
	IMINT: { name: "dossier IMINT", value: false },
	entCodage: { name: "Codage", value: "" },
}
export const INITIAL_DENAETPA = {
	PGPS: { name: "panne GPS", value: false },
	appRDR: { name: "app RDR", value: "" },
}
export const INITIAL_PILOTEQA = {
	PILJ: { name: "pil jour", value: "", validity: false },
	PILN: { name: "pil nuit", value: "", validity: false },
	ATTJ: { name: "att jour", value: "" },
	BAN: { name: "ba nuit", value: "" },
	ATTN1: { name: "att n-1", value: false },
	ATTN: { name: "att nuit", value: false },
	AMVPADV: { name: "AMV PA DV jour", value: false },
	AMVM: { name: "AMV manu", value: false },
	AMVN: { name: "AMV nuit", value: false },
	STAND: { name: "stand", value: false },
	ERGTR: { name: "EXT/RAL GTR", value: false },
}
export const INITIAL_BAD_PASSWORD = {
	value: "Entre 8 et 15 caractères, une majuscule, un chiffre, et un caractère spécial",
	color: "danger",
}
export const INITIAL_NOT_SAME_PASSWORD = { value: "Les mots de passe doivent être les mêmes", color: "danger" }
export const INITIAL_CORRECT_PASSWORD = { value: "mots de passe corrects", color: "success" }
