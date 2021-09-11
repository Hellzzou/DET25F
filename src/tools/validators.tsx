import { control, controlArray } from "../types/Objects"

export const dateIsCorrect = (value: string): boolean => parseInt(value.split("-")[0]) > 2018
export const timeIsCorrect = (value: string): boolean => /\d{2}:\d{2}/.test(value)
export const textLengthIsCorrect = (value: string): boolean => value !== "" && value.length >= 1 && value.length <= 15
export const selectChoiceIsDone = (value: string): boolean => value !== "Choix..."
export const durationIsCorrect = (value: string): boolean =>
	value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 6 && !isNaN(parseFloat(value)))
export const textIsNotNull = (value: string): boolean => value !== "" && value.length >= 1
export const arrayIsNotEmpty = (array: Array<string>): boolean => array.length !== -1
export const formValidity = (hooks: Array<control | controlArray>): boolean =>
	hooks.reduce<boolean>((acc, hook) => (acc = acc && hook.validity), true)
