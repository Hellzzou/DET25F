import React, { useState } from "react"
import { ConflictsRowProps } from "../types/Articles"
import info from "../images/conflicts.png"
import Modal from "react-bootstrap/esm/Modal"
import { Button } from "../BasicComponents/Button"

export const ConflictsRow = (props: ConflictsRowProps): JSX.Element => {
	const [show, setShow] = useState(false)
	return (
		<>
			<Modal show={show} onHide={() => setShow(false)} backdrop='static' keyboard={false}>
				<Modal.Header className='card-body-color'>
					<Modal.Title>{`Liste des conflits du ${props.day} ${new Date(
						props.date
					).toLocaleDateString()}`}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{Object.entries(props.conflicts)
						.filter((member) => member[1].length !== 0)
						.map((member) => (
							<div
								key={Object.entries(props.conflicts)
									.filter((member) => member[1].length !== 0)
									.indexOf(member)}
								className='row'>
								<div className='col-md-2 text-center fw-bold my-2'>{`${member[0]} : `}</div>
								<div className='col-md-10 my-2'>
									{member[1].map((conflict) => (
										<div className='row' key={member[1].indexOf(conflict)}>
											{` - ${conflict}`}
										</div>
									))}
								</div>
							</div>
						))}
				</Modal.Body>
				<Modal.Footer className='card-body-color'>
					<Button size={2} buttonColor='primary' buttonContent='OK' onClick={() => setShow(false)} />
				</Modal.Footer>
			</Modal>
			{Object.entries(props.conflicts).filter((member) => member[1].length !== 0).length > 0 && (
				<img src={info} className='pointer' onClick={() => setShow(true)} />
			)}
		</>
	)
}
