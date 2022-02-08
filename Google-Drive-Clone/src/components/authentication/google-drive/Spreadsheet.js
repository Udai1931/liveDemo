import React,{useState} from 'react'
import {  Button, Form, Modal,Dropdown } from 'react-bootstrap';
import {useAuth} from '../../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileExcel} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import {database} from './../../../firebase'
export default function Docs({currentFolder}) {
    const {currentUser }=useAuth();
    const [open,setOpen] =useState(false);
    const [name,setName] =useState('')
    const openModal = ()=>{
        setOpen(true)
    }
    const closeModal =()=>{
        setName('');
        setOpen(false);
    }
    const token = localStorage.getItem('token');
    const handle =async (e)=>{
        e.preventDefault();
        let config = {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                ContentType :'application/json'
            }
          }
          let data = {
            "properties": {
              "title": `${name}`
            }
          }
        axios.post('https://sheets.googleapis.com/v4/spreadsheets',data,config).then(res=>{
            console.log(res);
            const url = res.data.spreadsheetUrl;
            console.log(url);
            database.files.add({
                url:url,
                name:`${name}.xls`,
                createdAt:database.getCurrentTimeStamp(),
                folderId:currentFolder.id,
                userId:currentUser.uid
            })
        }).catch(err=>{
            console.log(err);
           
        })
        closeModal();
    }
    return (
        <>
        <Dropdown.Item onClick={openModal} variant="outline-success" >
            <FontAwesomeIcon icon={faFileExcel} /> Google Spreadsheet
        </Dropdown.Item>
        <Modal show={open} onHide={closeModal}>
            <Form onSubmit={handle}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Spreadsheet Name</Form.Label>
                        <Form.Control type="text" required value={name} onChange={e=>{
                            setName(e.target.value)
                        }} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant='success' type='submit'>
                        Add Spreadsheet
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    </>
        
    )
}
