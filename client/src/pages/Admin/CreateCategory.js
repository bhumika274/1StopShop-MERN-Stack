import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import {Modal} from "antd"


const CreateCategory = () => {
  const [category,setCategory] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [updatedName, setUpdatedName] = useState("");


  const handleSubmit = async (event) =>{
    event.preventDefault()
    try {
      const {data} = await axios.post(`/api/v1/category/create-category`,{name})
      if(data?.success){
        console.log(data)
        toast.success(`${data?.category.name} was created`)
        setName("")
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong in input form")      
    }
  }
  const getAllCategory = async (req, res) => {
    try {
        const {data} = await axios.get(`/api/v1/category/get-category`)
        if(data.success){
          setCategory(data?.category)
        }
    } catch (error) {
        console.log(error)
        toast.error("something went wrong in getting category")
    }
  }

  useEffect(()=>{
    getAllCategory();

  },[])

  const handleUpdate = async(event) =>{
    event.preventDefault()
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name:updatedName})
      if(data.success){
        toast.success(`${updatedName} was updated`)
        setSelected({})
        setUpdatedName("")
        setVisible(false)
        getAllCategory();
      }else{
        toast.error(data.message)

      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async(id) =>{
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`)
      if(data.success){
        toast.success(`category is deleted`)
        getAllCategory();
      }else{
        toast.error(data.message)

      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout title={"Dashboard - Create Category"}>
        <div className='container-fluid m-3 p-3'>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>    
            <div className="col-md-9">
                <h1>Manage Category</h1>
                <div className="w-50 p-3"> <CategoryForm handleSubmit={handleSubmit} value={name} setName={setName}/></div>
                <div className='w-75'>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody> 
                    
                      {
                        category?.map(item=> {
                          return(
                            <tr key={item._id}>
                            <td > 
                              {item.name}                              
                            </td>
                            <td> <button 
                              className="btn btn-primary ms-2" 
                              onClick={()=>{
                                console.log(item)
                                setVisible(true);
                                setUpdatedName(item.name)
                                setSelected(item)
                              }}
                            >Edit</button>
                            <button className="btn btn-danger ms-2"
                              onClick={ () => {handleDelete(item._id)}}> delete</button></td>
                            </tr>
                          )
                        })
                      }
                    
                  </tbody>
                </table>

                </div>
                <Modal onCancel={()=>setVisible(false)} footer={null} open={visible} >
                  <CategoryForm name={updatedName} setName={setUpdatedName} handleSubmit={handleUpdate}/>
                </Modal>
            </div>    
        </div> 
        </div> 
    </Layout>
  )
}

export default CreateCategory