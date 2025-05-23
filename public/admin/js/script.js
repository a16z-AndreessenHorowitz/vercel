// Button Status
const buttonStatus=document.querySelectorAll("[btn-status]")//[] là những thuộc tính tự định nghĩa
if(buttonStatus.length>0){
  let url=new URL(window.location.href);


    buttonStatus.forEach(button=>{
      button.addEventListener("click",()=>{
        const status=button.getAttribute("btn-status");
        
        if(status){
          url.searchParams.set("status", status)
        }
        else{
          url.searchParams.delete("status")
        }
        
        window.location.href=url.href
      })
    })
}
// Button Status


// Form Search 
const formsearch=document.querySelector("#form-search")
if(formsearch){
  let url=new URL(window.location.href)
  formsearch.addEventListener("submit",(e)=>{
    
    e.preventDefault()
    const keyword=e.target.elements.keyword.value
    

    if(keyword){
      url.searchParams.set("keyword", keyword)
    }
    else{
      url.searchParams.delete("keyword")
    }
    window.location.href=url.href
  })
}

// Form Search 

//Pagination
const buttonsPagiantion=document.querySelectorAll("[button-pagination]")
if(buttonsPagiantion){
  let url=new URL(window.location.href)
  buttonsPagiantion.forEach(button=>{
    button.addEventListener("click",()=>{
      const page=button.getAttribute("button-pagination")

      url.searchParams.set("page",page)
      window.location.href=url.href;
    }
  )})
}

//End Pagiantion

// Checkbox
const checkboxMulti=document.querySelector("[checkbox-multi]")
if(checkboxMulti){
  const inputCheckAll=checkboxMulti.querySelector("input[name='checkall']")
  const inputsId=checkboxMulti.querySelectorAll("input[name='id']")
  
  inputCheckAll.addEventListener("click",()=>{
    if(inputCheckAll.checked){
      inputsId.forEach(input=>{
        input.checked=true
      })
    }else{
      inputsId.forEach(input=>{
        input.checked=false
      })
    } 
  })

  inputsId.forEach(input=>{
    input.addEventListener("click",()=>{
      const countChecked=checkboxMulti.querySelectorAll("input[name='id']:checked").length//lấy ra độ dài cuả ô input có checked
 
      if(countChecked== inputsId.length){
        inputCheckAll.checked=true
      }else{
        inputCheckAll.checked=false
      }
    })
  })

}

// Checkbox


// Form Change Multi 
const formChangeMulti=document.querySelector("[form-change-multi]")
if(formChangeMulti){
  formChangeMulti.addEventListener("submit",(e)=>{
    e.preventDefault()
    
    const checkboxMulti=document.querySelector("[checkbox-multi]")

    const inputsChecked=checkboxMulti.querySelectorAll("input[name='id']:checked")//lấy ra một mảng
    
    //delete
    const typeChange=e.target.elements.type.value;
    if(typeChange== "delete-all"){
      const isConfirm=confirm("Bạn có chắc muốn xoá không")
      if(!isConfirm){
        return ;
        // niếu return sẽ không chạy đoạn code phía dưới.
      }
    }
    //end delte


    if(inputsChecked.length>0){
      let ids=[];
      //Lấy ra input form
      const inputIds=formChangeMulti.querySelector("input[name='ids']")


      //Lấy ra input dc check thêm vào mảng
      inputsChecked.forEach(input=>{
        const id=input.getAttribute("value")//hoặc .value là dc 
        
          //Thay đổi vị trí
            if(typeChange=="change-position"){
              
            //Hiện tại đang đứng ở các ô input, muốn lấy ra ô position thì nó phải ra ngoài bảng như kiểu ../input-position( có cha là thẻ tr)
            const position=input.closest("tr").querySelector("input[name='position']").value//value update ngầm 
            //closest() được dùng để tìm phần tử tổ tiên gần nhất (ancestor) của phần tử hiện tại khớp với bộ chọn CSS được cung cấp.
            ids.push(`${id}-${position}`)
            

            }else{
              ids.push(id)// không phải thì push vào như thường lệ
            }
          //end thay đổi vị trí

        // ids.push(id)
      })

      //gán giá trị cho ô input form 
      inputIds.value=ids.join(", ")

      //console.log(ids.join(", "))// input không lưu được dạng mảng phải convert sang text, mặc định là dấu ,

      //submit form 
      formChangeMulti.submit()
    }else{
      alert("Vui lòng chọn ít nhất 1 bản ghi")
    }



  })
}

// Form Change Multi 


//Flash
const showAlert=document.querySelector("[show-alert]")
if(showAlert){
  const time=parseInt(showAlert.getAttribute("data-time"))
  const closeAlert=showAlert.querySelector("[close-alert]")
  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, time);
  closeAlert.addEventListener("click",()=>{
    showAlert.classList.add("alert-hidden")
  })
}
//end flash


//Upload Image
const uploadImage=document.querySelector("[upload-image]")
if(uploadImage){
  const uploadImageInput=document.querySelector("[upload-image-input]")
  const uploadImageReview=document.querySelector("[upload-image-review]")

  const buttonCloseImage=document.querySelector("[button-close-image]")
  uploadImageInput.addEventListener("change",(e)=>{
    const file=e.target.files[0]
    
    if(file){
      buttonCloseImage.classList.remove("hidden")
      uploadImageReview.src=URL.createObjectURL(file)

      buttonCloseImage.addEventListener("click",()=>{
        uploadImageInput.value=""
        uploadImageReview.src=""
        buttonCloseImage.classList.add("hidden")
      })
    }
  }) 

}
//Upload Image



//Sort
const sort=document.querySelector("[sort]")
if(sort){
  let url=new URL(window.location.href)
  const sortSelect =sort.querySelector("[sort-select]")
  const sortClear=sort.querySelector("[sort-clear]")

  sortSelect.addEventListener("change",(e)=>{
    const value=e.target.value
    const [sortKey,sortValue]=value.split("-")

    url.searchParams.set("sortKey", sortKey)
    url.searchParams.set("sortValue",sortValue)
    window.location.href=url.href
  })

  //xoá sắp xếp
  sortClear.addEventListener("click",()=>{
    url.searchParams.delete("sortKey")
    url.searchParams.delete("sortValue")

    window.location.href=url.href
  })

  //Thêm selected cho option
  //làm riêng vì niếu để trong hai hàm kia thì window.location.href sẽ load lại và không lấy dc giá trị
  const sortKey=url.searchParams.get("sortKey")
  const sortValue=url.searchParams.get("sortValue")  
  if(sortKey && sortValue){
    const stringSort=`${sortKey}-${sortValue}`
    const optionSelected= sortSelect.querySelector(`option[value='${stringSort}']`)
    optionSelected.selected=true;
  }
  
}
//end sort