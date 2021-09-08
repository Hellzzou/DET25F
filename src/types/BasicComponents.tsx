import {
	control,
	controlArray,
	newAlert,
	newEvent,
	flight,
	pilotDateTPA,
	mecboDateTPA,
	radioDateTPA,
	denaeDateTPA,
} from "./Objects"

export type NavButtonProps = {
	content: string
	link: string
}
export type ButtonProps = {
	size: number
	buttonColor: string
	buttonContent: string
	onClick: () => void
	disabled?: boolean
}
export type FDVButtonProps = {
	date: Date
	size: number
	buttonColor: string
	buttonContent: string
	onClick: (arg: Date) => void
	disabled?: boolean
}
export type weekNavBarProps = {
	previousClick: () => void
	nextClick: () => void
	nowClick: () => void
	newEventClick: () => void
	firstDay: number
}
export type flightRowProps = {
	events: Array<flight>
	jAero: string
	nAero: string
}
export type alertRowProps = {
	events: Array<newAlert>
}
export type otherEventProps = {
	events: Array<newEvent>
}
export type labelProps = {
	title: string
	size: number
}
export type inputProps = {
	size: number
	backgroundColor: string
	textColor: string
	type: string
	min: number
	max: number
	placeholder?: string
	control: control
	setControl: React.Dispatch<React.SetStateAction<control>>
	validator: (arg0: string) => boolean
	disabled?: boolean
}
export type legendProps = {
	title: string
}
export type selectProps = {
	size: number
	backgroundColor: string
	textColor: string
	control: control
	setControl: React.Dispatch<React.SetStateAction<control>>
	options: Array<string>
	validator: (arg0: string) => boolean
}
export type textAreaProps = {
	size: number
	backgroundColor: string
	textColor: string
	control: controlArray
	setControl: React.Dispatch<React.SetStateAction<controlArray>>
	validator: (arg0: string) => boolean
}
export type flightCellProps = {
	events: Array<flight>
	event: flight
	jAero: string
	nAero: string
}
export type switchProps = {
	control: { name: string; value: boolean }
	size: number
	handleChange: (arg0: { name: string; value: boolean }) => void
}
export type unvalidateInputProps = {
	size: number
	backgroundColor: string
	textColor: string
	type: string
	placeholder?: string
	control: { name: string; value: string; validity?: boolean }
	handleChange: (e: React.ChangeEvent<HTMLInputElement>, arg1: { name: string; value: string }) => void
}
export type CrewTPACardProps = {
	member: {
		name: string
		TPA: pilotDateTPA | mecboDateTPA | radioDateTPA | denaeDateTPA
	}
	date: number
}
