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
]
export const access = ["Utilisateur", "Membre des activités", "Admin"]
export const DBInfos = {
	aircraft: {
		infos: "Vous pourrez ici, modifier tous les numéros d'avions présents en flotille",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
	},
	fuel: {
		infos: "Vous pourrez ici, modifier les différentes quantité de fuel embarquable à bord",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
	},
	configs: {
		infos: "Vous pourrez ici, modifier les différentes configuration des aéronefs",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
	},
	areas: {
		infos: "Vous pourrez ici, modifier les différents pays où peut se rendre l'avion",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
	},
	NCAreas: {
		infos: "Vous pourrez ici, modifier les différentes zones de travail en ZEENC",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
	},
	groups: {
		infos: "Vous pourrez ici, modifier les différents groupes des comptes-rendus ",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
	},
	types: {
		infos: "Vous pourrez ici, modifier les différents types de missions",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
	},
	crewMembers: {
		infos: "Vous pourrez ici, modifier toutes les infos de tous les membres de la flottille",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
	},
	users: {
		infos: "Vous pourrez ici, modifier toutes les infos de tous les utilisateurs de l'appli",
		warning: "Attention vous devez être administrateur pour pouvoir les modifier",
	},
	conso: {
		infos: "Vous pourrez ici, modifier les groupes pour les courbes de consommation",
		warning: "Attention vous devez être du personnel des activités pour pouvoir les modifier",
	},
}
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
