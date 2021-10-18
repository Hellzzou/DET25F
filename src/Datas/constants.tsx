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
export const daysIndex = [6, 0, 1, 2, 3, 4, 5]
export const inDays = 86400000
export const currentMonday =
	Date.now() -
	daysIndex[new Date().getDay()] * inDays -
	new Date().getHours() * 3600000 -
	new Date().getMinutes() * 60000
export enum EQADurations {
	BAN = 1,
	fourMonths = 70,
	fourMonthsNight = 5,
}
export const ranks = ["MOT", "QM2", "QM1", "SM", "MT", "PM", "MP", "MJR", "ASP", "EV2", "EV1", "LV", "CC", "CF", "CV"]
export const specialities = ["CDA", "pilote", "MECBO", "DENAE", "GETBO", "TECH"]
export const crews = ["YE", "YF"]
export const groundFunction = [
	"Commandant",
	"Commandant en second",
	"CSO",
	"CSVE",
	"Chef activités",
	"Chef BIA/BDV",
	"Adjoint activités",
	"Adjoint BIA/BDV",
	"Adjoint OSA",
	"OCC",
	"CORSIC",
	"Adjudant",
	"ESCSMN",
	"Inactif",
]
export const access = ["Utilisateur", "Membre des activités", "Admin"]
export const DBInfos = [
	{
		title: "AVIONS",
		infos: "Vous pourrez ici, modifier tous les numéros d'avions présents en flotille",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
		url: "/aircrafts",
	},
	{
		title: "FUEL",
		infos: "Vous pourrez ici, modifier les différentes quantité de fuel embarquable à bord",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
		url: "/fuels",
	},
	{
		title: "CONFIGURATIONS",
		infos: "Vous pourrez ici, modifier les différentes configuration des aéronefs",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
		url: "/configs",
	},
	{
		title: "ZONES",
		infos: "Vous pourrez ici, modifier les différents pays où peut se rendre l'avion",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
		url: "/areas",
	},
	{
		title: "ZONES EN ZEE NC",
		infos: "Vous pourrez ici, modifier les différentes zones de travail en ZEENC",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
		url: "/NCAreas",
	},
	{
		title: "GROUPES",
		infos: "Vous pourrez ici, modifier les différents groupes des comptes-rendus ",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
		url: "/groups",
	},
	{
		title: "TYPES",
		infos: "Vous pourrez ici, modifier les différents types de missions",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
		url: "/types",
	},
	{
		title: "MEMBRES D'EQUIPAGE",
		infos: "Vous pourrez ici, modifier toutes les infos de tous les membres de la flottille",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
		url: "/crewMembers",
	},
	{
		title: "UTILISATEURS",
		infos: "Vous pourrez ici, modifier toutes les infos de tous les utilisateurs de l'appli",
		warning: "Attention vous devez être administrateur pour pouvoir les modifier",
		url: "/users",
	},
	{
		title: "CONSOMMATIONS",
		infos: "Vous pourrez ici, modifier les groupes pour les courbes de consommation",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
		url: "/conso",
	},
	{
		title: "PERMISSIONS",
		infos: "Vous pourrez ici, modifier les permissions des membres de la flottille",
		warning: "Attention vous devez être de l'adjudanant pour pouvoir les modifier",
		url: "/holiday",
	},
]
export const eventType = [
	"REPOS",
	"EXER",
	"MISSION",
	"RECUP",
	"VISITE",
	"DET25F",
	"RESA ZONE",
	"MOUV",
	"SPORT",
	"CEREMONIE",
	"ARRET TRAVAIL",
	"JET AVIATION",
]
export const activitiesAlert: Record<string, { color: string; info: string }> = {
	newFlight: {
		color: "success",
		info: "Le vol a bien été crée",
	},
	newEvent: {
		color: "success",
		info: "L'évènement a bien été crée",
	},
	newAlerte: {
		color: "success",
		info: "L'alerte a bien été créee",
	},
	newHoliday: {
		color: "success",
		info: "La permission a bien été créee",
	},
	modifyFlight: {
		color: "primary",
		info: "Le vol a bien été modifié",
	},
	modifyEvent: {
		color: "primary",
		info: "L'évènement a bien été modifié",
	},
	modifyAlerte: {
		color: "primary",
		info: "L'alerte a bien été modifiée",
	},
	modifyHoliday: {
		color: "primary",
		info: "La permission a bien été modifiée",
	},
	deleteFlight: {
		color: "danger",
		info: "Le vol a bien été supprimé",
	},
	deleteEvent: {
		color: "danger",
		info: "L'évènement a bien été supprimé",
	},
	deleteAlerte: {
		color: "danger",
		info: "L'alerte a bien été supprimée",
	},
	deleteHoliday: {
		color: "danger",
		info: "La permission a bien été supprimée",
	},
	debriefFlight: {
		color: "primary",
		info: "Le vol a bien été debriefé",
	},
	debriefHoliday: {
		color: "primary",
		info: "La permission a bien été validée",
	},
}
