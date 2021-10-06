import React, { useState } from "react"
import { Redirect, RouteComponentProps, useHistory } from "react-router-dom"
import useAsyncEffect from "use-async-effect"
import { Legend } from "../BasicComponents/Legend"
import { eventDelete, eventIDFinder, memberURL, saveEventURL } from "../Datas/urls"
import { INITIAL_FALSE_CONTROL, INITIAL_FALSE_SELECT } from "../Datas/initialObjects"
import { AddOrReturnButtons } from "../Sections/AddOrReturnButtons"
import { EventFieldset } from "../Sections/EventFieldset"
import { MainNavBar } from "../Sections/MainNavbar"
import { NewEventNavBar } from "../Sections/NewEventNavBar"
import { TimingFieldset } from "../Sections/TimingFieldset"
import { getFetchRequest, postFetchRequest } from "../tools/fetch"
import { fullfillEvent } from "../tools/fullfillForms"
import { buildNewEvent } from "../tools/buildEvents"
import { tokenCheck } from "../tools/user"
import { formValidity, selectChoiceIsDone, textIsNotNull } from "../tools/validators"
import { ControlArray, CrewMember, Event } from "../types/Objects"
import { Label } from "../BasicComponents/Label"
import { UnvalidateSelect } from "../BasicComponents/UnvalidateSelect"
import { TextArea } from "../BasicComponents/TextArea"
import { Button } from "../BasicComponents/Button"

export const NewEventForm = ({ match }: RouteComponentProps<{ id: string; week: string }>): JSX.Element => {
	const history = useHistory()
	const [token, setToken] = useState(true)
	const [departureDate, setDepartureDate] = useState(INITIAL_FALSE_CONTROL)
	const [departureTime, setDepartureTime] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalDate, setArrivalDate] = useState(INITIAL_FALSE_CONTROL)
	const [arrivalTime, setArrivalTime] = useState(INITIAL_FALSE_CONTROL)
	const [event, setEvent] = useState(INITIAL_FALSE_CONTROL)
	const [eventType, setEventType] = useState(INITIAL_FALSE_SELECT)
	const [allMembers, setAllMembers] = useState<CrewMember[]>([])
	const [addMemberSelect, setAddMemberSelect] = useState(INITIAL_FALSE_SELECT)
	const [addableMembers, setAddableMembers] = useState<string[]>([])
	const [members, setMembers] = useState<ControlArray>({ value: [], validity: false, disabled: false })
	const [deleteMemberSelect, setDeleteMemberSelect] = useState(INITIAL_FALSE_SELECT)
	const hooks = [departureDate, departureTime, arrivalDate, arrivalTime, event, eventType]
	const setters = [setDepartureDate, setDepartureTime, setArrivalDate, setArrivalTime, setEvent, setEventType]
	async function addEventClick() {
		const newEvent = buildNewEvent(hooks, members)
		const saved = await postFetchRequest<string>(saveEventURL, { newEvent })
		if (saved === "success") history.push(`/activities/newEvent/${match.params.week}`)
	}
	async function modifyEventClick() {
		const newEvent = buildNewEvent(hooks, members)
		const deleted = await postFetchRequest<string>(eventDelete, { id: match.params.id })
		if (deleted === "success") {
			const res = await postFetchRequest<string>(saveEventURL, { newEvent })
			if (res === "success") history.push(`/activities/modifyEvent/${match.params.week}`)
		}
	}
	async function deleteClick() {
		const deleted = await postFetchRequest<string>(eventDelete, { id: match.params.id })
		if (deleted === "success") history.push(`/activities/deleteEvent/${match.params.week}`)
	}
	const addMember = () => {
		setMembers({ value: [...members.value, addMemberSelect.value], validity: false, disabled: false })
		setAddableMembers(addableMembers.filter((member) => member !== addMemberSelect.value))
		setAddMemberSelect(INITIAL_FALSE_SELECT)
		setDeleteMemberSelect(INITIAL_FALSE_SELECT)
	}
	const deleteMember = () => {
		setMembers({
			value: members.value.filter((member) => member !== deleteMemberSelect.value),
			validity: false,
			disabled: false,
		})
		setAddableMembers([...addableMembers, deleteMemberSelect.value])
		setAddMemberSelect(INITIAL_FALSE_SELECT)
		setDeleteMemberSelect(INITIAL_FALSE_SELECT)
	}
	const addAll = () => {
		const all = addableMembers.reduce((acc, member) => [...acc, member], members.value)
		setMembers({ value: all, validity: false, disabled: false })
		setAddableMembers([])
		setAddMemberSelect(INITIAL_FALSE_SELECT)
		setDeleteMemberSelect(INITIAL_FALSE_SELECT)
	}
	const deleteAll = () => {
		setMembers({ value: [], validity: false, disabled: false })
		setAddableMembers(allMembers.map(({ trigram }) => trigram))
		setAddMemberSelect(INITIAL_FALSE_SELECT)
		setDeleteMemberSelect(INITIAL_FALSE_SELECT)
	}
	useAsyncEffect(async () => {
		const token = await tokenCheck()
		setToken(token)
		if (match.params.id !== "newOne") {
			const event = await postFetchRequest<Event[]>(eventIDFinder, { id: match.params.id })
			if (typeof event !== "string") fullfillEvent(event[0], setters, setAddableMembers, setMembers, allMembers)
		}
		const members = await getFetchRequest<CrewMember[]>(memberURL)
		if (typeof members !== "string") {
			setAllMembers(members)
			setAddableMembers(members.map(({ trigram }) => trigram))
		}
	}, [])
	return !token ? (
		<Redirect to='/' />
	) : (
		<div className='alegreya'>
			<MainNavBar />
			<NewEventNavBar date={parseInt(match.params.week)} />
			<form className='bg-white m-1 rounded text-dark row justify-content-center'>
				<Legend title='Nouvel évènement' />
				<div className='col-md-6 m-1 justify-content-center'>
					<TimingFieldset
						startDate={departureDate}
						setStartDate={setDepartureDate}
						startTime={departureTime}
						setStartTime={setDepartureTime}
						endDate={arrivalDate}
						setEndDate={setArrivalDate}
						endTime={arrivalTime}
						setEndTime={setArrivalTime}
					/>
				</div>
				<div className='col-md-6 m-1 justify-content-center'>
					<EventFieldset
						event={event}
						setEvent={setEvent}
						eventType={eventType}
						setEventType={setEventType}
					/>
				</div>
				<div className='col-md-6 m-1 justify-content-center'>
					<fieldset className=' card-body-color rounded'>
						<Legend title='Personnel' />
						<div className='form-group row m-1'>
							<Button
								size={4}
								buttonColor='primary'
								buttonContent='Ajouter tout le personnel'
								onClick={addAll}
							/>
							<UnvalidateSelect
								size={4}
								backgroundColor='dark'
								textColor='white'
								control={addMemberSelect}
								setControl={setAddMemberSelect}
								options={addableMembers.sort()}
								validator={selectChoiceIsDone}
							/>
							<Button
								size={4}
								buttonContent='Ajouter un personnel'
								buttonColor='primary'
								onClick={addMember}
								disabled={!addMemberSelect.validity}
							/>
						</div>
						<div className='form-group row m-1'>
							<Label size={4} title='Personnel(s) :' />
							<TextArea
								size={8}
								backgroundColor='dark'
								textColor='white'
								control={members}
								validator={textIsNotNull}
							/>
						</div>
						<div className='form-group row m-1'>
							<Button
								size={4}
								buttonColor='danger'
								buttonContent='Retirer tout le personnel'
								onClick={deleteAll}
							/>
							<UnvalidateSelect
								size={4}
								backgroundColor='dark'
								textColor='white'
								control={deleteMemberSelect}
								setControl={setDeleteMemberSelect}
								options={members.value}
								validator={selectChoiceIsDone}
							/>
							<Button
								size={4}
								buttonContent='Retirer un personnel'
								buttonColor='danger'
								onClick={deleteMember}
								disabled={!deleteMemberSelect.validity}
							/>
						</div>
					</fieldset>
				</div>
			</form>
			<AddOrReturnButtons
				validity={formValidity(hooks)}
				addContent={match.params.id !== "newOne" ? "Modifier" : "Ajouter"}
				addClick={match.params.id !== "newOne" ? modifyEventClick : addEventClick}
				deleteClick={deleteClick}
				disableDelete={match.params.id === "newOne"}
				returnClick={() => history.push(`/activities/null/${match.params.week}`)}
			/>
		</div>
	)
}
