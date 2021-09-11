import { denaeDateTPA, mecboDateTPA, pilotDateTPA, radioDateTPA } from "../types/Objects"

export const old = new Date(1970, 1, 1)
export const second = new Date(1985, 5, 10)

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
export const INITIAL_DATE_TPAS: Record<string, pilotDateTPA | mecboDateTPA | radioDateTPA | denaeDateTPA> = {
	pilote: INITIAL_PILOT_DATE_TPA,
	CDA: INITIAL_PILOT_DATE_TPA,
	MECBO: INITIAL_MECBO_DATE_TPA,
	GETBO: INITIAL_RADIO_DATE_TPA,
	DENAE: INITIAL_DENAE_DATE_TPA,
}
