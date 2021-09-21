import React, { useState } from "react"
import { Modal } from "react-bootstrap"
import useAsyncEffect from "use-async-effect"
import { Button } from "../BasicComponents/Button"
import { Label } from "../BasicComponents/Label"
import { INITIAL_USER } from "../Datas/crewMember"
import { checkPassword, getOneUserURL, signupURL, userDeleteURL } from "../Datas/datas"
import { INITIAL_FALSE_CONTROL } from "../Datas/initialHooks"
import { deleteFetchRequest, getFetchRequest, postFetchRequest } from "../tools/fetch"
import { passwordCheck } from "../tools/validators"
import { passwordChangeModalProps } from "../types/Articles"
import { user } from "../types/Objects"

export const PasswordChangeModal = (props: passwordChangeModalProps): JSX.Element => {
	const [ancientPassword, setAncientPassword] = useState(INITIAL_FALSE_CONTROL)
	const [newPassword1, setNewPassword1] = useState(INITIAL_FALSE_CONTROL)
	const [info1, setInfo1] = useState({
		value: "Entre 8 et 15 caractères, une majuscule, un chiffre, et un caractère spécial",
		color: "danger",
	})
	const [info2, setInfo2] = useState({
		value: "Entre 8 et 15 caractères, une majuscule, un chiffre, et un caractère spécial",
		color: "danger",
	})
	const [newPassword2, setNewPassword2] = useState(INITIAL_FALSE_CONTROL)
	const [user, setUser] = useState<user>(INITIAL_USER)
	const handleClose = () => {
		setAncientPassword(INITIAL_FALSE_CONTROL)
		setNewPassword1(INITIAL_FALSE_CONTROL)
		setNewPassword2(INITIAL_FALSE_CONTROL)
		setInfo1({
			value: "Entre 8 et 15 caractères, une majuscule, un chiffre, et un caractère spécial",
			color: "danger",
		})
		setInfo2({
			value: "Entre 8 et 15 caractères, une majuscule, un chiffre, et un caractère spécial",
			color: "danger",
		})
		props.onHide()
	}
	const checkAncientPasswordValidity = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setAncientPassword({ value: e.target.value, validity: ancientPassword.validity, disabled: false })
		const check = await postFetchRequest(checkPassword, { login: user.login, password: e.target.value })
		if (check === "correct")
			setAncientPassword({ value: e.target.value, validity: check === "correct", disabled: false })
	}
	const checkPAssword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
		let validity = passwordCheck(e.target.value)
		if (validity) {
			setInfo1({ value: "Les mots de passe doivent être les mêmes", color: "danger" })
			setInfo2({ value: "Les mots de passe doivent être les mêmes", color: "danger" })
			validity = validity && e.target.value === newPassword2.value
			if (validity) {
				setInfo1({ value: "mots de passe corrects", color: "success" })
				setInfo2({ value: "mots de passe corrects", color: "success" })
			}
		}
		setNewPassword1({ value: e.target.value, validity, disabled: false })
		setNewPassword2({ value: newPassword2.value, validity, disabled: false })
	}
	const checkPAssword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
		let validity = passwordCheck(e.target.value)
		if (validity) {
			setInfo2({ value: "Les mots de passe doivent être les mêmes", color: "danger" })
			setInfo1({ value: "Les mots de passe doivent être les mêmes", color: "danger" })
			validity = validity && e.target.value === newPassword1.value
			if (validity) {
				setInfo2({ value: "mots de passe corrects", color: "success" })
				setInfo1({ value: "mots de passe corrects", color: "success" })
			}
		}
		setNewPassword2({ value: e.target.value, validity, disabled: false })
		setNewPassword1({ value: newPassword1.value, validity, disabled: false })
	}
	const createNewUser = async () => {
		const deleted = await deleteFetchRequest(userDeleteURL, { name: user.name })
		if (deleted === "success") {
			const newUser = {
				rank: user.rank,
				name: user.name,
				responsability: user.responsability,
				email: user.email,
				login: user.login,
				password: newPassword1.value,
			}
			const saved = await postFetchRequest(signupURL, newUser)
			if (saved === "Utilisateur crée") {
				handleClose()
				props.setAddUserShow(true)
			}
		}
	}
	useAsyncEffect(async () => {
		const user = await getFetchRequest<user>(getOneUserURL)
		if (typeof user !== "string") setUser(user)
	}, [])
	return (
		<Modal show={props.show} onHide={handleClose} backdrop='static' keyboard={false} size='lg'>
			<Modal.Header>
				<Modal.Title>Changer mon mot de passe</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='row my-3'>
					<Label size={4} title='Ancien mot de passe : ' />
					<div className='col-md-8'>
						<input
							className={`form-control bg-dark
                    text-center text-white
                    ${ancientPassword.validity ? "is-valid" : "is-invalid"}`}
							type='password'
							onChange={(e) => checkAncientPasswordValidity(e)}
							value={ancientPassword.value}
							disabled={false}
						/>
					</div>
				</div>
				<div className='row my-3'>
					<Label size={4} title='Nouveau mot de passe : ' />
					<div className='col-md-8'>
						<input
							className={`form-control bg-dark
                    text-center text-white
                    ${newPassword1.validity ? "is-valid" : "is-invalid"}`}
							type='password'
							onChange={(e) => checkPAssword1(e)}
							value={newPassword1.value}
							disabled={false}
						/>
						<small className={`col-md-8 text-${info1.color}`}>{info1.value}</small>
					</div>
				</div>
				<div className='row my-3'>
					<Label size={4} title='Confirmer le mot de passe : ' />
					<div className='col-md-8'>
						<input
							className={`form-control bg-dark
                    text-center text-white
                    ${newPassword2.validity ? "is-valid" : "is-invalid"}`}
							type='password'
							onChange={(e) => checkPAssword2(e)}
							value={newPassword2.value}
							disabled={false}
						/>
						<small className={`text-${info2.color}`}>{info2.value}</small>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size={5}
					buttonColor='primary'
					buttonContent='Changer mon mot de passe'
					onClick={createNewUser}
					disabled={!(newPassword1.validity && newPassword2.validity && ancientPassword.validity)}
				/>
				<Button size={2} buttonColor='danger' buttonContent='Annuler' onClick={handleClose} />
			</Modal.Footer>
		</Modal>
	)
}
