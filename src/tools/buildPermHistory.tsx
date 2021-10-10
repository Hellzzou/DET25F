import { CreditHoliday, CrewMember, Holiday, PermHistory } from "../types/Objects"

export const buildPermHistory = (
	perms: Holiday[],
	credits: CreditHoliday[],
	member: CrewMember,
	permType: string
): PermHistory[] => {
	const permissions = ["Perm AM", "Perm PM", "Perm journée"]
	const recuperations = ["Recup AM", "Recup PM", "Recup journée"]
	const permFilter = permType === "Perm" ? permissions : recuperations
	const permDay = permType === "Perm" ? "Perm journée" : "Recup journée"
	const permDebitHistorik = perms
		.filter(({ members }) => members.includes(member.trigram))
		.filter(({ type }) => permFilter.includes(type))
		.filter(({ status }) => status === "validated")
		.map((perm) => {
			const number = perm.type === permDay ? 1 : 0.5
			return {
				date: perm.date,
				credit: "Débit",
				number: -number,
				reason: "",
			}
		})
	const permCreditHistorik = credits
		.filter(({ trigram }) => trigram === member.trigram)
		.filter(({ type }) => type === permType)
		.map((perm) => {
			return {
				date: perm.date,
				credit: "Crédit",
				number: perm.number,
				reason: perm.reason,
			}
		})
	return [...permDebitHistorik, ...permCreditHistorik]
}
