export const returnZeroOrValue = (value: string): number => {
	if (value !== "" && !!value) return parseFloat(value)
	else return 0
}
