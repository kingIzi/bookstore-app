function categoryClicked(category){
    const option = {
        headers:{
            "Content-Type": "application/json"
        },
        method: "GET",
        body: JSON.stringify({
            category: category.textContent
        }),
        redirect: "categories"
    }
    
}