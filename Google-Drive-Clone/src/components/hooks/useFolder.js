import {useReducer,useEffect} from 'react';
import {database} from '../../firebase';
import {useAuth} from '../../contexts/AuthContext'
const Actions={
    SELECT_FOLDER:"select-folder",
    UPDATE_FOLDER:"update-folder",
    SET_CHILD_FOLDERS:'set-child-folders',
    SET_CHILD_FILES:'set-child-files',
}

export const ROOT_FOLDER={name:'Root',id:null,path:[]}

const reducer = (state,{type,payload})=>{
 switch(type)
 {
     case Actions.SELECT_FOLDER:
         return {
             folderId:payload.folderId,
             folder:payload.folder,
             childfiles:[],
             childFolders:[]
         }
         case Actions.UPDATE_FOLDER:
             return {
                 ...state,
                 folder:payload.folder
             }
             case Actions.SET_CHILD_FOLDERS:
                return {
                    ...state,
                    childFolders:payload.childFolders
                }
                case Actions.SET_CHILD_FILES:
                    return {
                        ...state,
                        childFiles:payload.childFiles
                    }
         default:
             return state
 }
}
export function useFolder(folderId=null,folder=null)
{
    //firebase doesn't work very well with undefined
    // UseReducer takes in 2 parameters a reducer function and an initial state

    
    const {currentUser} = useAuth();
    // console.log(currentUser)
    const [state,dispatch] = useReducer(reducer,{
        folderId,
        folder,
        childFolders:[],
        childfiles:[]
    });
//the above variables are representative of the current folder


//the use case of this Use Effect is still unknown
    useEffect(()=>{
     
        dispatch({type:Actions.SELECT_FOLDER,payload:{folderId,folder}})
    },[folderId,folder])

    //the use of this useEffect is to give the root folder if no folderId is passed to it
    //and if folderId is passed to it then it set the state with the folder details of that folderId.
    useEffect(()=>{
      
        if(folderId==null)
        {
            return dispatch({
                type:Actions.UPDATE_FOLDER,payload:{folder:ROOT_FOLDER}
            })
        }
        database.folders.doc(folderId).get().then(doc=>{

            dispatch({
                type:Actions.UPDATE_FOLDER,payload:{folder:database.formatDoc(doc)}
            })
        }).catch(()=>{
            dispatch({
                type:Actions.UPDATE_FOLDER,payload:{folder:ROOT_FOLDER}
            })
        })
    },[folderId])
    useEffect(()=>{
        
      const cleanUp=  database.folders.where("parentId",'==',folderId)
        .where('userId','==',currentUser.uid)
        .orderBy('createdAt')
        .onSnapshot(snapshot=>{
            dispatch({
                type:Actions.SET_CHILD_FOLDERS,
                payload:{childFolders:snapshot.docs.map(doc=>database.formatDoc(doc))}
            })
        })
       return ()=> cleanUp();
    },[folderId,currentUser])

    useEffect(()=>{
        
        const cleanUp=  database.files.where("folderId",'==',folderId)
          .where('userId','==',currentUser.uid)
          .orderBy('createdAt')
          .onSnapshot(snapshot=>{
              dispatch({
                  type:Actions.SET_CHILD_FILES,
                  payload:{childFiles:snapshot.docs.map(doc=>database.formatDoc(doc))}
              })
          })
         return ()=> cleanUp();
      },[folderId,currentUser])
    return state
}
