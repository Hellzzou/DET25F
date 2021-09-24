/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react"
import { useHistory } from "react-router"
import useAsyncEffect from "use-async-effect"
import { AlertToast } from "../BasicComponents/AlertToast"
import { Button } from "../BasicComponents/Button"
import { UnvalidateInput } from "../BasicComponents/UnvalidateInput"
import { getAllUserURL, getOneUserURL, signupURL, userDeleteURL, userURL } from "../Datas/urls"
import { MainNavBar } from "../Sections/MainNavbar"
import { deleteFetchRequest, getFetchRequest, postFetchRequest, putFetchRequest } from "../tools/fetch"
import { user } from "../types/Objects"
import { NewUserModal } from "../Articles/NewUserModal"
import { SimpleSelect } from "../BasicComponents/SimpleSelect"
import { access, ranks } from "../Datas/constants"

export const UsersManager = (): JSX.Element => {
	const history = useHistory()
	const [modifyUserShow, setModifyUserShow] = useState(false)
	const [reinitUserShow, setReinitUserShow] = useState(false)
	const [deleteUserShow, setDeleteUserShow] = useState(false)
	const [addUserShow, setAddUserShow] = useState(false)
	const [show, setShow] = useState(false)
	const [users, setUsers] = useState<user[]>([])
	const [currentUser, setCurrentUser] = useState<user>()
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const Delete = async (userTarget: user) => {
		const deleted = await deleteFetchRequest(userDeleteURL, { name: userTarget.name })
		if (deleted === "success") {
			setUsers(users.filter((user) => user !== userTarget))
			setDeleteUserShow(true)
		}
	}
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
		userTarget: user,
		prop: string
	) => {
		const usersMod = users.map((user) => {
			if (user !== userTarget) return user
			else
				return {
					_id: user._id,
					rank: prop === "rank" ? e.target.value : user.rank,
					name: prop === "name" ? e.target.value : user.name,
					responsability: prop === "responsability" ? e.target.value : user.responsability,
					email: prop === "email" ? e.target.value : user.email,
					login: user.login,
					password: user.password,
				}
		})
		setUsers(usersMod)
	}
	const allowDelete = (user: user) => (currentUser?.email === user.email ? true : false)
	const allNonNull = (user: user) =>
		user.rank !== "" && user.name !== "" && user.responsability !== "" && user.email !== ""
	const modifyUser = async (user: user) => {
		const modify = await putFetchRequest(userURL, user)
		if (modify === "success") setModifyUserShow(true)
	}
	const reinitLogins = async (user: user) => {
		const deleted = await deleteFetchRequest(userDeleteURL, { name: user.name })
		if (deleted === "success") {
			const signup = await postFetchRequest(signupURL, {
				rank: user.rank,
				name: user.name,
				responsability: user.responsability,
				email: user.email,
				login: user.email,
				password: "Azerty01!",
			})
			if (signup === "Utilisateur crée") setReinitUserShow(true)
		}
	}
	useAsyncEffect(async () => {
		const users = await getFetchRequest<user[]>(getAllUserURL)
		const user = await getFetchRequest<user>(getOneUserURL)
		if (typeof user !== "string") setCurrentUser(user)
		if (typeof users !== "string") setUsers(users)
	}, [])
	return (
		<>
			<MainNavBar />
			<AlertToast
				color='primary'
				info='Les informations de cet utilsateur ont bien été modifiée'
				show={modifyUserShow}
				onClose={() => setModifyUserShow(false)}
			/>
			<AlertToast
				color='danger'
				info='les accès de cet utilisateur ont bien été réinitialisés'
				show={reinitUserShow}
				onClose={() => setReinitUserShow(false)}
			/>
			<AlertToast
				color='danger'
				info="L'utilisateur a été supprimé de la base de données"
				show={deleteUserShow}
				onClose={() => setDeleteUserShow(false)}
			/>
			<AlertToast
				color='primary'
				info="L'utilisateur a bien été crée"
				show={addUserShow}
				onClose={() => setAddUserShow(false)}
			/>
			<NewUserModal
				show={show}
				setShow={setShow}
				onHide={handleClose}
				onShow={handleShow}
				users={users}
				setUsers={setUsers}
				setAddUserShow={setAddUserShow}
			/>
			<div className='row justify-content-center m-2'>
				<div className='col-md-12 card-body-color rounded text-start'>
					<h5 className='text-decoration-underline m-1'>Informations : </h5>
					<div className='text-danger'>
						- Attention ici chaque clique sur les boutons modifie directement la base de données.
					</div>
					<div>
						- En cliquant sur &apos;Modifier cet utlisateur&apos; vous modifiez les 4 informations présentes
						sur cette page mais pas son login/mot de passe
					</div>
					<div>
						- Si un utilsateur souhaite réinitialiser ses login/mot de passe il suffit de cliquer sur
						&apos;Réinitialiser ses accès&apos;. Son login sera par défaut son email et son mot de passe :
						Azerty01!
					</div>
					<div>
						- En cliquant sur &apos;Ajouter un nouvel utilisateur&apos;, vous allez devoir remplir les 4
						infos présentes sur cette page puis valider, ce qui créera un nouvel utlisateur avec des
						login/mot de passe par défaut.
					</div>
					<div>
						- Le nouvel utilisateur pourrra ensuite modifier ses login/mot de passe via la rubrique :
						&apos;mon compte&apos;.
					</div>
				</div>
			</div>
			<div className='row justify-content-center m-2'>
				<div className='col-md-12 card-body-color rounded'>
					<h4 className='text-center'>Liste des utlisateurs</h4>
					<div className='row'>
						<div className='col-md-1 text-center'>Grade</div>
						<div className='col-md-2 text-center'>Nom</div>
						<div className='col-md-1 text-center'>Accès</div>
						<div className='col-md-2 text-center'>Email</div>
					</div>
					{users &&
						users.map((user) => (
							<div key={users.indexOf(user)} className='row my-1'>
								<SimpleSelect
									size={1}
									backgroundColor='dark'
									textColor='white'
									handleChange={(e) => handleChange(e, user, "rank")}
									value={user.rank}
									options={ranks}
								/>
								<UnvalidateInput
									size={2}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: user.name, value: user.name }}
									handleChange={(e) => handleChange(e, user, "name")}
								/>
								<SimpleSelect
									size={1}
									backgroundColor='dark'
									textColor='white'
									handleChange={(e) => handleChange(e, user, "responsability")}
									value={user.responsability}
									options={access}
								/>
								<UnvalidateInput
									size={2}
									backgroundColor='dark'
									textColor='white'
									type='number'
									control={{ name: user.email, value: user.email }}
									handleChange={(e) => handleChange(e, user, "email")}
								/>
								<div className='col-md-2'>
									<Button
										size={12}
										buttonColor='primary'
										buttonContent='Modifier cet utilisateur'
										onClick={() => modifyUser(user)}
										disabled={!allNonNull(user)}
									/>
								</div>
								<div className='col-md-2'>
									<Button
										size={12}
										buttonColor='danger'
										buttonContent='Réinitialiser ses accès'
										onClick={() => reinitLogins(user)}
										disabled={!allNonNull(user)}
									/>
								</div>
								<div className='col-md-2'>
									<Button
										size={12}
										buttonColor='danger'
										buttonContent='Supprimer cet utilisateur'
										onClick={() => Delete(user)}
										disabled={allowDelete(user)}
									/>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className='row justify-content-center'>
				<Button
					size={2}
					buttonColor={"primary"}
					buttonContent={"Ajouter un nouvel utilisateur"}
					onClick={() => handleShow()}
				/>
				<div className='col-md-1'></div>
				<Button
					size={2}
					buttonColor='danger'
					buttonContent='Retour'
					onClick={() => history.push("/manageDB")}
				/>
			</div>
		</>
	)
}
