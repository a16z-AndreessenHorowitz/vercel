// permissons 
const tablePermission=document.querySelector("[table-permission]")
if(tablePermission){
  const buttonSubmit=document.querySelector("[button-subbmit]")

  buttonSubmit.addEventListener("click",()=>{
    let permissions=[]
    
    const rows=tablePermission.querySelectorAll("[data-name]")
    rows.forEach(row=>{
      const name=row.getAttribute("data-name")
      const inputs=row.querySelectorAll("input")
      if(name=="id"){

        inputs.forEach(input=>{
          const id=input.value
           permissions.push({
            id:id,
            permissions:[]
          })
        })
      }else{
        inputs.forEach((input,index)=>{
          const checked=input.checked

          if(checked){
            permissions[index].permissions.push(name)
          }
        })
      }

    })

    if(permissions.length>0){
      const formChangePermission=document.querySelector("#form-change-permissions")
      const inputPermission=formChangePermission.querySelector("input[name='permissions']")
      inputPermission.value=JSON.stringify(permissions)//nhận chuỗi JSON
      formChangePermission.submit()
    }
  })
}
// permissons 

// permissons  data default
const dataRecords=document.querySelector("[data-records]")
if(dataRecords){
  const records=JSON.parse(dataRecords.getAttribute("data-records"))
  const tablePermission=document.querySelector("[table-permission]")

  records.forEach((record,index)=>{
    const permissions=record.permissons;
    permissions.forEach(permission=>{
      const row=tablePermission.querySelector(`[data-name="${permission}"]`)
      const input=row.querySelectorAll("input")[index]


      input.checked=true;
    })
132
  })
}
// permissons  data default