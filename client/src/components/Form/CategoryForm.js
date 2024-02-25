import React from 'react'

const CategoryForm = ({handleSubmit, setName, name}) => {
  return (
    <>
       <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input text="text" className="form-control" placeholder= "Enter New Category" onChange={(event)=>setName(event.target.value)} value={name}/>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    </>
  )
}

export default CategoryForm