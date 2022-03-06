import React,{useState,useCallback, useRef} from 'react'
import {  Button,
  Icon,
  Modal,
  Form,
  ControlLabel,
  FormControl,
  FormGroup,
  Schema,
  Alert, } from 'rsuite'
import { useModalState } from '../../misc/custom-hooks';
import firebase from 'firebase/app';
import { database } from '../../misc/firebase';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Chat name is Required"),
  description: StringType().isRequired("Description is Required")
});

const INITIAL_FORM={
  name:" ",
  description:" "
}

const CreateRoomBtnModal = () => {

  const {isOpen,open,close}=useModalState();
  const[formValue,setFormValue]=useState(INITIAL_FORM);
  const[isLoading,setIsLoading]=useState(false);
  const formRef=useRef();

  const onFormChange= useCallback( value=>
  {
    setFormValue(value);
  },[]);


  const onSubmit= async ()=>
  {

    if(!formRef.current.check())
    {
      return;
    }

    setIsLoading(true);

    const newRoomdata =
    {
      ...formValue,
      createdAt:firebase.database.ServerValue.TIMESTAMP,
    }

    try {

      await database.ref('rooms').push(newRoomdata);
      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
      Alert.info(`${formValue.name} has been created`,4000);
      
    } 
      catch (err) 
      {
      setIsLoading(false)
      Alert.error(err.message,4000);
      
    }

  }
  return (
    <div className='mt-2'>
      <Button block color="green" onClick={open}>
        <Icon icon='creative'/> Create new chat room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New Chat room </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid 
          onChange={onFormChange} 
          formValue={formValue} 
          Modal={model}
          ref={formRef}
          >
            <FormGroup>
              
              <ControlLabel>
                Room name
              </ControlLabel>

              <FormControl name="name" placeholder="Enter a chat room name...."/>
            </FormGroup>
 

             <FormGroup>
             <ControlLabel>description</ControlLabel>
              <FormControl componentClass="textarea" rows={5} name="description" placeholder="Enter Room description...."/>
             </FormGroup>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance='primary' onClick={onSubmit} disabled={isLoading} >
            Create New Chat room 
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateRoomBtnModal
