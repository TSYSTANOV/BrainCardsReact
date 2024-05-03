
const API_URL = 'https://feather-zealous-grapple.glitch.me'


export const fetchCategories = async () => {
    try{
        const response = await fetch(`${API_URL}/api/category`)
        if(response.status === 200 || response.status === 201){
            const categories = await response.json()
            return categories
        }
        else{
            const error = await response.json()
            return error
        }
        
    }
    catch(error){
        return error
    }
}



export const fetchCards = async (id) => {
    try{
        const response = await fetch(`${API_URL}/api/category/${id}`)
        if(response.status === 200 || response.status === 201){
            const cards = await response.json()
            return cards
        }
        else{
            const error = await response.json()
            return error
        }
        
    }
    catch(error){
        return error
    }
}

async function fetchEditCategory(id, data){
    try{
        const response = await fetch(`${API_URL}/api/category/${id}`,{
            method:'PATCH',
            body:JSON.stringify(data)
        })
        if(response.status === 200 || response.status === 201){
            const categories = await response.json()
            return categories
        }
        else{
            const error = await response.json()
            return error
        }
        
    }
    catch(error){
        return error
    }
}

async function fetchCreateCategory(data){
    try{
        const response = await fetch(`${API_URL}/api/category`,{
            method:'POST',
            body:JSON.stringify(data)
        })
        if(response.status === 200 || response.status === 201){
            const categories = await response.json()
            return categories
        }
        else{
            const error = await response.json()
            return error
        }
        
    }
    catch(error){
        return error
    }
}

async function fetchDeleteCategory(id){
    try{
        const response = await fetch(`${API_URL}/api/category/${id}`,{
            method:'DELETE'
        })
        if(response.status === 200 || response.status === 201){
            const categories = await response.json()
            return categories
        }
        else{
            const error = await response.json()
            return error
        }
        
    }
    catch(error){
        return error
    }
}

export { fetchCreateCategory, fetchEditCategory, fetchDeleteCategory}