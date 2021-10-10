import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import { Button } from "../BasicComponents/Button"
import { Label } from "../BasicComponents/Label"
import { SimpleSelect } from "../BasicComponents/SimpleSelect"
import { CreditHolidayModalProps } from "../types/Articles"

export const CreditHolidayModal = (props: CreditHolidayModalProps): JSX.Element => {
	const [holidayType, setHolidayType] = useState("")
	const [holidayValue, setHolidayValue] = useState("")
	const [holidayReason, setHolidayReason] = useState("")
	const save = (type: string, number: string, reason: string) => {
		props.creditHoliday(type, number, reason)
		setHolidayType("")
		setHolidayValue("")
		setHolidayReason("")
	}
	const reset = () => {
		props.handleClose()
		setHolidayType("")
		setHolidayValue("")
		setHolidayReason("")
	}
	return (
		<Modal show={props.show} onHide={props.handleClose} backdrop='static' keyboard={false} size='lg'>
			<Modal.Header>
				<Modal.Title>{`Créditer une perm/recup au ${props.member}`}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='row my-2'>
					<Label title='Type :' size={4} />
					<SimpleSelect
						size={8}
						backgroundColor='dark'
						textColor='white'
						value={holidayType}
						options={["Perm", "Recup"]}
						handleChange={(e) => setHolidayType(e.target.value)}
					/>
				</div>
				<div className='row my-2'>
					<Label title='Nombre à créditer:' size={4} />
					<div className='col-md-8'>
						<input
							className='bg-dark text-white form-control text-center'
							type='number'
							value={holidayValue}
							onChange={(e) => setHolidayValue(e.target.value)}
						/>
					</div>
				</div>
				<div className='row my-2'>
					<Label title='Raison :' size={4} />
					<div className='col-md-8'>
						<textarea
							className='form-control bg-dark color-white'
							style={{ color: "white" }}
							rows={2}
							value={holidayReason}
							onChange={(e) => setHolidayReason(e.target.value)}
						/>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size={5}
					buttonColor='primary'
					buttonContent='Créditer'
					onClick={() => save(holidayType, holidayValue, holidayReason)}
					disabled={holidayValue === "" || holidayType === "" || holidayReason === ""}
				/>
				<Button size={2} buttonColor='danger' buttonContent='Annuler' onClick={reset} />
			</Modal.Footer>
		</Modal>
	)
}
