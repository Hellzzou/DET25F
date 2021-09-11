import { control } from "../types/Objects"
import { returnDayNightDuration } from "./dateManager"
import { selectChoiceIsDone, timeIsCorrect } from "./validators"

export const manageNCAreas = (
	areaValue: string,
	setNCArea: React.Dispatch<React.SetStateAction<control>>,
	NCareaValue: string
): void => {
	if (areaValue !== "ZEENC" && areaValue !== "") {
		setNCArea({ value: "Choix...", validity: true, disabled: true })
	} else if (NCareaValue !== "") {
		setNCArea({ value: NCareaValue, validity: selectChoiceIsDone(NCareaValue), disabled: false })
	}
}
export const manageCNL = (
	doneValue: string,
	cause: control,
	setCause: React.Dispatch<React.SetStateAction<control>>,
	ON: control,
	setON: React.Dispatch<React.SetStateAction<control>>,
	OFF: control,
	setOFF: React.Dispatch<React.SetStateAction<control>>
): void => {
	if (doneValue === "ME" || doneValue === "MPE") {
		setON({ value: ON.value, validity: timeIsCorrect(ON.value), disabled: false })
		setOFF({ value: OFF.value, validity: timeIsCorrect(OFF.value), disabled: false })
	} else {
		setON({ value: "", validity: true, disabled: true })
		setOFF({ value: "", validity: true, disabled: true })
	}
	if (doneValue !== "ME" && cause.value !== "")
		setCause({ value: cause.value, validity: selectChoiceIsDone(cause.value), disabled: false })
	else if (cause.value !== "") setCause({ value: "Choix...", validity: true, disabled: true })
}
export const manageDuration = (
	start: control,
	end: control,
	jAero: string,
	nAero: string,
	done: string
): { jour: number; nuit: number } => {
	if (done !== "CNL" && start.validity && end.validity) {
		const duration = returnDayNightDuration(start.value, end.value, jAero, nAero)
		return { jour: duration.jour, nuit: duration.nuit }
	} else return { jour: 0, nuit: 0 }
}
