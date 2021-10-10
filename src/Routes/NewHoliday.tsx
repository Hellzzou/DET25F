import React, { useState } from "react"
import { RouteComponentProps, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { Input } from "../BasicComponents/input"
import { Label } from "../BasicComponents/Label"
import { Legend } from "../BasicComponents/Legend"
import { Select } from "../BasicComponents/Select"
import { TextArea } from "../BasicComponents/TextArea"
import { UnvalidateSelect } from "../BasicComponents/UnvalidateSelect"
import { INITIAL_FALSE_CONTROL, INITIAL_FALSE_SELECT } from "../Datas/initialObjects"
import { holidayDateFinder, holidayDelete, holidayIDFinder, memberURL, saveHolidayURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { NewEventNavBar } from "../Sections/NewEventNavBar"
import { getFetchRequest, postFetchRequest, putFetchRequest } from "../tools/fetch"
import { fullfillHoliday } from "../tools/fullfillForms"
import { dateIsCorrect, selectChoiceIsDone, textIsNotNull } from "../tools/validators"
import { ControlArray, CrewMember, Holiday } from "../types/Objects"

export const NewHoliday = ({ match }: RouteComponentProps<{ id: string; week: string }>): JSX.Element => {
	const history = useHistory()
	const [date, setDate] = useState(INITIAL_FALSE_CONTROL)
	const [allMembers, setAllMembers] = useState<CrewMember[]>([])
	const [permType, setPermType] = useState(INITIAL_FALSE_SELECT)
	const [addableMembers, setAddableMembers] = useState<string[]>([])
	const [addSelect, setAddSelect] = useState(INITIAL_FALSE_SELECT)
	const [members, setMembers] = useState<ControlArray>({ value: [], validity: false, disabled: false })
	const [deleteSelect, setDeleteSelect] = useState(INITIAL_FALSE_SELECT)
	const [holiday, setHoliday] = useState<Holiday>()
	const [exists, setExists] = useState(false)
	const addMember = () => {
		setMembers({ value: [...members.value, addSelect.value], validity: false, disabled: false })
		setAddableMembers(addableMembers.filter((member) => member !== addSelect.value))
		setAddSelect(INITIAL_FALSE_SELECT)
		setDeleteSelect(INITIAL_FALSE_SELECT)
	}
	const deleteMember = () => {
		setMembers({
			value: members.value.filter((member) => member !== deleteSelect.value),
			validity: false,
			disabled: false,
		})
		setAddableMembers([...addableMembers, deleteSelect.value])
		setAddSelect(INITIAL_FALSE_SELECT)
		setDeleteSelect(INITIAL_FALSE_SELECT)
	}
	const addHoliday = async () => {
		const saved = await postFetchRequest<string>(saveHolidayURL, {
			holiday: { date: date.value, type: permType.value, members: members.value, status: "inProgress" },
		})
		if (saved === "success") history.push(`/activities/newPerm/${match.params.week}`)
	}
	const modifyHoliday = async () => {
		if (holiday?.status === "inProgress") {
			const deleted = await postFetchRequest<string>(holidayDelete, { id: match.params.id })
			if (deleted === "success") {
				const saved = await postFetchRequest<string>(saveHolidayURL, {
					holiday: { date: date.value, type: permType.value, members: members.value, status: "inProgress" },
				})
				if (saved === "success") history.push(`/activities/modifyPerm/${match.params.week}`)
			}
		} else {
			let type = "perm"
			let perm = 0.5
			if (holiday?.type === "Recup AM" || holiday?.type === "Recup PM" || holiday?.type === "Recup journée")
				type = "recup"
			if (holiday?.type === "Perm journée" || holiday?.type === "Recup journée") perm = 1
			allMembers
				.filter(({ trigram }) => holiday?.members.includes(trigram))
				.map(async (member) => {
					await putFetchRequest(memberURL, {
						_id: member._id,
						firstName: member.firstName,
						surName: member.surName,
						rank: member.rank,
						crew: member.crew,
						onBoardFunction: member.onBoardFunction,
						groundFunction: member.groundFunction,
						trigram: member.trigram,
						tel: member.tel,
						registration: member.registration,
						holidays: type === "perm" ? (member.holidays += perm) : member.holidays,
						recoveries: type === "recup" ? (member.recoveries += perm) : member.recoveries,
					})
				})
			validateHoliday()
		}
	}
	const validateHoliday = async () => {
		const deleted = await postFetchRequest<string>(holidayDelete, { id: match.params.id })
		if (deleted === "success") {
			const saved = await postFetchRequest<string>(saveHolidayURL, {
				holiday: { date: date.value, type: permType.value, members: members.value, status: "validated" },
			})
			if (saved === "success") {
				let type = "perm"
				let perm = 0.5
				if (holiday?.type === "Recup AM" || holiday?.type === "Recup PM" || holiday?.type === "Recup journée")
					type = "recup"
				if (holiday?.type === "Perm journée" || holiday?.type === "Recup journée") perm = 1
				allMembers
					.filter(({ trigram }) => members.value.includes(trigram))
					.map(async (member) => {
						await putFetchRequest(memberURL, {
							_id: member._id,
							firstName: member.firstName,
							surName: member.surName,
							rank: member.rank,
							crew: member.crew,
							onBoardFunction: member.onBoardFunction,
							groundFunction: member.groundFunction,
							trigram: member.trigram,
							tel: member.tel,
							registration: member.registration,
							holidays: type === "perm" ? (member.holidays -= perm) : member.holidays,
							recoveries: type === "recup" ? (member.recoveries -= perm) : member.recoveries,
						})
					})

				history.push(`/activities/debriefPerm/${match.params.week}`)
			}
		}
	}
	const deleteHoliday = async () => {
		if (holiday?.status === "validated") {
			let type = "perm"
			let perm = 0.5
			if (holiday?.type === "Recup AM" || holiday?.type === "Recup PM" || holiday?.type === "Recup journée")
				type = "recup"
			if (holiday?.type === "Perm journée" || holiday?.type === "Recup journée") perm = 1
			allMembers
				.filter(({ trigram }) => holiday.members.includes(trigram))
				.map(async (member) => {
					await putFetchRequest(memberURL, {
						_id: member._id,
						firstName: member.firstName,
						surName: member.surName,
						rank: member.rank,
						crew: member.crew,
						onBoardFunction: member.onBoardFunction,
						groundFunction: member.groundFunction,
						trigram: member.trigram,
						tel: member.tel,
						registration: member.registration,
						holidays: type === "perm" ? (member.holidays += perm) : member.holidays,
						recoveries: type === "recup" ? (member.recoveries += perm) : member.recoveries,
					})
				})
		}
		const deleted = await postFetchRequest<string>(holidayDelete, { id: match.params.id })
		if (deleted === "success") history.push(`/activities/deletePerm/${match.params.week}`)
	}
	const disabling = (): boolean =>
		(match.params.id === "newOne" && !(date.validity && permType.validity && members.validity)) ||
		holiday?.status === "validated"
	useAsyncEffect(async () => {
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		if (typeof members !== "string") {
			setAllMembers(members)
			setAddableMembers(members.map(({ trigram }) => trigram))
		}
		if (match.params.id !== "newOne") {
			const holiday = await postFetchRequest<Holiday[]>(holidayIDFinder, { id: match.params.id })
			if (typeof holiday !== "string" && typeof members !== "string") {
				fullfillHoliday(holiday[0], setDate, setPermType, setAddableMembers, setMembers, members)
				setHoliday(holiday[0])
			}
		}
	}, [])
	useAsyncEffect(async () => {
		const holidays = await postFetchRequest<Holiday[]>(holidayDateFinder, { startDate: date.value })
		if (typeof holidays !== "string" && date.value !== "" && permType.value !== "")
			setExists(
				holidays.filter(({ type }) => type === permType.value).length !== 0 && match.params.id === "newOne"
			)
	}, [date.value, permType.value])
	return (
		<>
			<MainNavBar />
			<NewEventNavBar date={parseInt(match.params.week)} />
			<form className='bg-white rounded text-dark row justify-content-center' style={{ width: "100%" }}>
				<Legend title='Nouvelle permission' />
				<fieldset className='p-2 col-md-6 card-body-color rounded'>
					<Legend title='Personnel en permission' />
					<div className='row my-2'>
						<Label title='Date :' size={4} />
						<Input
							size={8}
							backgroundColor='dark'
							textColor='white'
							control={date}
							setControl={setDate}
							validator={dateIsCorrect}
							type='date'
							min={0}
							max={0}
						/>
					</div>
					<div className='row my-2'>
						<Label title='Type de perms :' size={4} />
						<Select
							size={8}
							backgroundColor='dark'
							textColor='white'
							control={permType}
							setControl={setPermType}
							options={["Perm AM", "Perm PM", "Perm journée", "Recup AM", "Recup PM", "Recup journée"]}
							validator={selectChoiceIsDone}
						/>
					</div>
					<div className='row'>
						<div className='col-md-5'></div>
						{exists && (
							<small className='col-md-7 text-danger'>Il existe déjà une perm de ce genre ce jour</small>
						)}
					</div>
					<div className='form-group row m-1'>
						<Label size={4} title='' />
						<UnvalidateSelect
							size={4}
							backgroundColor='dark'
							textColor='white'
							control={addSelect}
							setControl={setAddSelect}
							options={addableMembers.sort()}
							validator={selectChoiceIsDone}
						/>
						<Button
							size={4}
							buttonContent='Ajouter un personnel'
							buttonColor='primary'
							onClick={addMember}
							disabled={!addSelect.validity}
						/>
					</div>
					<div className='form-group row m-1'>
						<Label size={4} title='Personnel(s) en perm' />
						<TextArea
							size={8}
							backgroundColor='dark'
							textColor='white'
							control={members}
							validator={textIsNotNull}
						/>
					</div>
					<div className='form-group row m-1'>
						<Label size={4} title='' />
						<UnvalidateSelect
							size={4}
							backgroundColor='dark'
							textColor='white'
							control={deleteSelect}
							setControl={setDeleteSelect}
							options={members.value}
							validator={selectChoiceIsDone}
						/>
						<Button
							size={4}
							buttonContent='Retirer un personnel'
							buttonColor='danger'
							onClick={deleteMember}
							disabled={!deleteSelect.validity}
						/>
					</div>
				</fieldset>
				<div className='row justify-content-center'>
					<div className='col-md-6 justify-content-center my-2'>
						<div className='row justify-content-center'>
							<Button
								size={2}
								buttonColor='primary'
								buttonContent={match.params.id === "newOne" ? "Ajouter" : "Modifier"}
								onClick={match.params.id === "newOne" ? addHoliday : modifyHoliday}
								disabled={
									!(date.validity && permType.validity && members.value.length !== 0) ||
									(match.params.id === "newOne" && exists)
								}
							/>
							<div className='col-md-1'></div>
							<Button
								size={2}
								buttonColor='primary'
								buttonContent='Valider'
								onClick={validateHoliday}
								disabled={disabling()}
							/>
							<div className='col-md-1'></div>
							<Button size={2} buttonColor='danger' buttonContent='Supprimer' onClick={deleteHoliday} />
							<div className='col-md-1'></div>
							<Button
								size={2}
								buttonColor='danger'
								buttonContent='Annuler'
								onClick={() => history.push(`/activities/null/${match.params.week}`)}
							/>
						</div>
					</div>
				</div>
			</form>
		</>
	)
}
