import React,{useRef,useState} from 'react'
import {Navbar,Nav,FormControl,Button,Alert} from 'react-bootstrap'
import {Link,withRouter} from 'react-router-dom';
import {database} from '../../../firebase';
import './navbar.css';  
import Drive from '../../../assets/drive.png'
import {useAuth} from '../../../contexts/AuthContext'
const NavbarComponent= function(props) {
    const [show, setShow] = useState(false);
    const searchRef = useRef();
    const {currentUser} = useAuth();
    const  handleSearch=async()=>{
        let err = true;
        let str = searchRef.current.value;
       

               let p1= database.folders.where('name','==',str)
                  .where('userId','==',currentUser.uid).orderBy('createdAt')
                  .get()
                 

                let p2 =  database.files.where('name','==',str)
                .where('userId','==',currentUser.uid).orderBy('createdAt')
                .get()
              
            Promise.all([p1,p2]).then(res=>{
                // console.log(res)
                let flag = false;
                for(let i=0;i<2;i++)
                {
                    let querySnapshot = res[i];
                    if(querySnapshot.docs[0]!=undefined)
                    {
                        if(i==0)
                        {
                            let folderData = querySnapshot.docs[0].data();
                            let pid = folderData.parentId;
                            if(pid==null)
                            {
                                props.history.push('/');
                            }
                            else
                            {
                                props.history.push(`/folder/${pid}`)
                            }
                        }
                        if(i==1)
                        {
                            let fileData = querySnapshot.docs[0].data();
                            let pid = fileData.folderId;
                            if(pid==null)
                            {
                                props.history.push('/');
                            }
                            else
                            {
                                props.history.push(`/folder/${pid}`)
                            }
                           
                        }
                        flag = true;
                    
                    }

                }
                if(flag ==false)
                {
                    setShow(true);
                    setTimeout(()=>{
                        setShow(false);
                    },1000)
                }
            })
                

    }
    return (
        <>
        {show? <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          No file or Folder with the given name exists. 
        </p>
      </Alert>:<></>}
<Navbar bg="light" expand="lg" className='navbar_styles'>
    <Navbar.Brand as={Link} to="/"><img className='imgst' src={Drive} alt="Logo"/>PEP Drive</Navbar.Brand> 
    
    <FormControl size="md" ref={searchRef} type="text" placeholder="Search" />
      <Button variant="outline-success"  onClick={handleSearch}>Search</Button>
    <Nav>
        <Nav.Link as={Link} to="/user">
            Profile
        </Nav.Link>
    </Nav>
</Navbar>
</>
    )
}
export default withRouter(NavbarComponent)