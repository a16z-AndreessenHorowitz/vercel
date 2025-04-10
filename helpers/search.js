module.exports=(query)=>{
    let keyword="";
    let objectSearch={
        keyword:"",
    }
	if(query.keyword){
        //Niếu có mới cập nhật regax
		objectSearch.keyword=query.keyword

		const regax=new RegExp(objectSearch.keyword, "i")//i khong phân biệt hoa, thường
		objectSearch.regax=regax
	}
    return objectSearch
}