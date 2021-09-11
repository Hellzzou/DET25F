import { getDateNumber, getMonthNumber } from "../tools/dateManager"

export const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
export const months = [
	"Janvier",
	"Février",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août",
	"Septembre",
	"Octobre",
	"Novembre",
	"Décembre",
]
export const englishMonths = [
	"january",
	"february",
	"march",
	"april",
	"may",
	"june",
	"july",
	"august",
	"september",
	"october",
	"november",
	"december",
]
export const daysIndex = [6, 0, 1, 2, 3, 4, 5]
export const inDays = 86400000
export const currentMonday =
	Date.now() -
	daysIndex[new Date().getDay()] * inDays -
	new Date().getHours() * 3600000 -
	new Date().getMinutes() * 60000
