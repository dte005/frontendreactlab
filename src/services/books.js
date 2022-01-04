const url = process.env.REACT_APP_HOST;

export const getBooks = ()=>{
    const headers = {
        "Content-type": "application/json"
    }
    return fetch(url, {method: "GET", headers})
    .then(res=>res.json())
    .then(res=>res)
    .catch(error=>error)
}

export const postBooks = (body)=>{
    const headers = {
        "Content-type": "application/json"
    }
    return fetch(`${url}/new`, {method: "POST", headers, body: JSON.stringify(body)})
    .then(res=>res.json())
    .then(res=>res)
    .catch(error=>error)
}

export const deleteBook = (index)=>{
    console.log(index);
    const headers = {
        "Content-type": "application/json"
    }
    return fetch(`${url}/${index}`, {method: "DELETE", headers})
    .then(res=>res.json())
    .then(res=>res)
    .catch(error=>{
        console.log(error)
        return error;
    })
}