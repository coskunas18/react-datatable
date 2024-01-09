import React, { useState,useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { IoMdSearch } from "react-icons/io";

export default function Product() {

  const columns = [
    {
      name:"Serial No",
      selector:(row) => row.id
    },
    {
      name:"Title",
      selector:(row) => row.title
    },
    {
      name:"Category",
      selector:(row) => row.category
    },
    {
      name:"Price",
      selector:(row) => row.price
    },
    {
      name:"Image",
      selector:(row)=><img  height ={70} width={80} src={row.image}/>,
   },
   {
    name:"Action",
    cell:(row)=>(
      <button className='bg-red-500 rounded-md text-white p-2 text-xl
      hover:bg-red-600'
      onClick={()=> handleDelete(row.id)}
      >Delete</button>
    ) 
   }]

  const [data,setData] = useState([]);
  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("");

  const getProduct = async () => {
    try {
      const req= await fetch("https://fakestoreapi.com/products");
      const res= await req.json();
      setData(res);
      setFilter(res);
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = (val) => {
    const newData = data.filter(item => item.id !== val)
    setFilter(newData)
  }

  useEffect(() => {
    getProduct()
    console.log("calisti")
  }, []);


  useEffect(()=>{
    const result= data.filter((item)=>{
     return item.title.toLowerCase().match(search.toLocaleLowerCase());
    });
    setFilter(result);
     },[search]);



  return (
    <div className='m-10 p-2 '>
       <p className='text-2xl text-center italic'>Product List</p>
       <DataTable columns={columns} data={filter}
       pagination
       highlightOnHover
       responsive
       actions={
        <button className='bg-green-600 text-white rounded-md p-2 text-sm'>Export Pdf</button>
       }
       subHeader
       subHeaderComponent={
        <div className='w-full flex items-center'>
          <input type='text'
          placeholder='Search...'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className='border border-gray-400 rounded px-8 py-1 text-gray-500 opacity-90 relative outline-none' /> 
          <IoMdSearch size={25} className='text-gray-500 opacity-50 absolute mx-2'/>
        </div>
       }
       />
    </div>
  )
}
