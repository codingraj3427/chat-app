import React,{useState,useRef} from 'react'
import { useProfile } from '../../context/profile.context'; 
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import { database } from '../../misc/firebase';
import { useModalState } from '../../misc/custom-hooks';
import { storage } from '../../misc/firebase';
import ProfileAvatar from '../ProfileAvatar';
import { getUserUpdates } from '../../misc/helper';

const fileInputTypes = '.png, .jpeg, .jpg';

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];

const getBlob=(canvas)=>
{
  return new Promise((resolve,reject)=>
  {
    canvas.toBlob((blob)=>
    {
      if(blob)
      {
        resolve(blob);

      }

      else
      {
        reject(new Error('File process Error'));
      }
    })
  })
}
const isValidFile = file => acceptedFileTypes.includes(file.type);

const AvatarUploadBtn = () => {

  const {isOpen,open,close}=useModalState();
  const {profile}=useProfile()
  const[img,setImg]=useState(null);
  const[isLoading,setIsLoaing]=useState(false)

  const avatarEditorRef=useRef();



  const onFileInputChange=(ev)=>{

     const currFiles=ev.target.files; 
     
     if(currFiles.length === 1)
     {
       const file=currFiles[0];

       if(isValidFile(file))
       {
       
        setImg(file);
        open();
       }

       else{

        Alert.warning(`Wrong file type ${file.type}`,4000);
       }
     }

  }

     const onUploadClick = async () =>
     {

      const canvas=avatarEditorRef.current.getImageScaledToCanvas();
      
      setIsLoaing(true);
      try {

        const blob=await getBlob(canvas);
        const  AvatarFileRef= storage.ref(`/profiles/${profile.uid}`).child('avatar');
        const uploadAvatarResult= await AvatarFileRef.put(blob,
          {
            cacheControl:`public,max-age=${3600* 24 *3}`
          }); 

          const downloadUrl =  await uploadAvatarResult.ref.getDownloadURL();



          const updates= await getUserUpdates(
            profile.uid,
            'avatar',
            downloadUrl,
            database
            );
   
        await database.ref().update(updates);
      
        setIsLoaing(false);

         Alert.info('Avatar has been uploaded',4000);
        
      } catch (err) {
        
        setIsLoaing(false);
        Alert.error(err.message)
        
      }
      

     } 

  return (
    <div className="mt-3 text-center">

      <ProfileAvatar 
      src={profile.avatar} 
      name={profile.name} 
      className="width-200 height-200 img-fullsize font-huge "
      
       />
  

    <div>
     
     <label htmlFor="avatar-upload" className='d-block cursor-pointer padded'>
       Select new Avatar
       <input 
       id="avatar-upload" 
       type="file" 
       className="d-none" 
       accept={fileInputTypes}
       onChange={onFileInputChange}
       />
     </label> 

     <Modal show={isOpen} onHide={close}>

       <Modal.Header>
         <Modal.Title>
           Adjust and upload new Avatar  
         </Modal.Title>
       </Modal.Header>
       <Modal.Body>

         <div className="d-flex justify-content-center align-items-center h-100">

         {img && (  
        
        <AvatarEditor
        ref={avatarEditorRef}
        image={img}
        width={200}
        height={200}
        border={10}
        borderRadius={100}
        />
        
         )}
         </div>
       </Modal.Body>
       <Modal.Footer>
         <Button block appearance="ghost" onClick={onUploadClick} disabled={isLoading}>
           Upload new avatar
         </Button>
       </Modal.Footer>
     </Modal>

    </div>


    </div>
  )
}

export default AvatarUploadBtn;
