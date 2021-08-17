export const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
export const daysIndex = [6, 0, 1, 2, 3, 4, 5]
export const inDays = 86400000
export const currentMonday =
	Date.now() -
	daysIndex[new Date().getDay()] * inDays -
	new Date().getHours() * 3600000 -
	new Date().getMinutes() * 60000
