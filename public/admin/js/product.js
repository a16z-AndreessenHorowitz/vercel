// Change Status 
const buttonsChangeStatus=document.querySelectorAll("[button-change-status]")//[] thuộc tính tự định nghĩa

if(buttonsChangeStatus.length >0){
    const formChangeStatus=document.querySelector("#form-change-status")
    const path=formChangeStatus.getAttribute("data-path")

    buttonsChangeStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const  statusCurrent=button.getAttribute("data-status")
            const  id=button.getAttribute("data-id")

            let statusChange=statusCurrent=="active" ? "inactive" : "active"

            
            const action=path+`/${statusChange}/${id}?_method=PATCH`
            
            formChangeStatus.action=action
            formChangeStatus.submit();
        });
    });
}

// Change Status 


//Delete Item
const buttonDelete=document.querySelectorAll('[button-delete]')
if(buttonDelete.length >0){
    //lấy ra form
    const formDeleteItem=document.querySelector("#form-delete-status")
    const path=formDeleteItem.getAttribute("data-path")

    buttonDelete.forEach(button => {
        button.addEventListener("click",()=>{
            const isConfirm=confirm("Bạn có chắc muốn xoá")

            if(isConfirm==true){
                const id=button.getAttribute("data-id")

                const action=`${path}/${id}?_method=DELETE`
                console.log(action)
                //Truyền action vào form
                formDeleteItem.action=action;

                formDeleteItem.submit();
            }
        })
    });
}

//Delete Item
