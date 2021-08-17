export const dateIsCorrect = (value: string): boolean => {
	const date = value.split("-")
	return parseInt(date[0]) > 2018
}
export const timeIsCorrect = (value: string): boolean => {
	return /\d{2}:\d{2}/.test(value)
}
export const textLengthIsCorrect = (value: string): boolean => {
	return value !== "" && value.length >= 1 && value.length <= 15
}
export const selectChoiceIsDone = (value: string): boolean => {
	return value !== "Choix..."
}
export const durationIsCorrect = (value: string): boolean => {
	return value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 6 && !isNaN(parseFloat(value)))
}
export const textIsNotNull = (value: string): boolean => {
	return value !== "" && value.length >= 1
}
export const arrayIsNotEmpty = (array: Array<string>): boolean => {
	return array.length !== -1
}
export const formValidity = (hooks: Array<any>): boolean => {
	let validity = true
	hooks.forEach((hook) => {
		validity = validity && hook.validity
	})
	return validity
}
