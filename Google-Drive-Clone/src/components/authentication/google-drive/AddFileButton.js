import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState,useEffect} from 'react'
import {faFileUpload} from '@fortawesome/free-solid-svg-icons'
import {useAuth} from '../../../contexts/AuthContext';
import {database, storage} from './../../../firebase'
import {ROOT_FOLDER} from '../../hooks/useFolder'
import { uuid } from 'uuidv4';
import ReactDom from 'react-dom';
import { ProgressBar, Toast,Dropdown } from 'react-bootstrap';
import './AddFileButton.css'
export default function AddFileButton({ currentFolder}) {
    const [uploadingFiles,setUploadingFiles]= useState([])
    const {currentUser }=useAuth();
    function handleUpload(e)
    {
        
      const file =  e?.target?.files[0] ;

      if(currentFolder==null || file==null)
      {
          return 
      }  
      const id = uuid()
      setUploadingFiles(prevUploadingFiles=>[
          ...prevUploadingFiles,
          {id:id,name:file.name,progress:0,error:false}
      ])
      
     let path = '';
     if(currentFolder.path.length>0)
     {
         for(let i=0;i<currentFolder.path.length;i++)
         {
             let folder = currentFolder.path[i].name;
            //  console.log(folder);
             path=`${path}${folder}/`
         }
     }
    //  console.log(path);
      const filePath= currentFolder==ROOT_FOLDER ? `${path}/${file.name}` : `${path}/${currentFolder.name}/${file.name}`
      console.log(filePath);
      const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file)
      uploadTask.on('state_changed',snapshot=>{
          const progress = snapshot.bytesTransferred/snapshot.totalBytes;
          setUploadingFiles(prevUploadingFiles=>{
              return prevUploadingFiles.map(uploadFile=>{
                  if(uploadFile.id===id)
                  {
                      return {...uploadFile,progress:progress}

                    }
                    return uploadFile
              })
          })
      },()=>{
        setUploadingFiles(prevUploadingFiles=>{
            return prevUploadingFiles.map(uploadFile=>{
                if(uploadFile.id===id)
                {
                    return {...uploadFile,error:true}

                  }
                  return uploadFile
            })
        })
      },()=>{
          setUploadingFiles(prevUploadingFiles=>{
              return prevUploadingFiles.filter(uploadFile=>{
                  return uploadFile.id!==id
              })
          })
          uploadTask.snapshot.ref.getDownloadURL().then(url=>{
            database.files.where ("name",'==',file.name).where("userId",'==',currentUser.uid)
            .where('folderId','==',currentFolder.id)
            .get().then(existingFiles=>{
                const existingFile = existingFiles.docs[0]
                if(existingFile)
                {
                    existingFile.ref.update({url:url})
                }
                else{
                    database.files.add({
                        url:url,
                        name:file.name,
                        createdAt:database.getCurrentTimeStamp(),
                        folderId:currentFolder.id,
                        userId:currentUser.uid
                    })
                }
            })
           
          })
      })
    }
    return (
        <>
        <Dropdown.Item as='label' className='btn btn-outline-success btn-md m-0'>
            <FontAwesomeIcon icon={faFileUpload}/> New File
            <input type="file" onChange={handleUpload} style={{opacity:0 , position:'absolute',left:'-999px'}}/>
        </Dropdown.Item>
        {uploadingFiles.length>0 && ReactDom.createPortal(
            <div
                style={{
                    position:'absolute',
                    bottom:'1rem',
                    rigth:'1rem',
                    maxWidth:'250px'
                }}
                >
                    {uploadingFiles.map(file=>(
                        <Toast key={file.id} onClose={()=>{
                            setUploadingFiles(prevUploadingFiles=>{
                                return prevUploadingFiles.filter(uploadFile=>{
                                    return uploadFile.id!== file.id;
                                })
                            })
                        }}>
                            <Toast.Header closeButton={file.error} className='text-truncate w-100 d-block'>
                                {file.name}
                            </Toast.Header>
                            <Toast.Body> 
                                <ProgressBar animated={!file.error}
                                variant={file.error?'danger':'primary'}
                                now={file.error ?100:file.progress * 100}
                                label={
                                    file.error?'Error' : `${Math.round(file.progress * 100 )}%` 
                                }
                                />
                            </Toast.Body>
                        </Toast>
                    ))}
            </div>,document.body
        )}
        </>
    )
}
