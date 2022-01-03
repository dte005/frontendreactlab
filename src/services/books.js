const url = process.env.REACT_APP_HOST;

export const getBooks = ()=>{
    console.log(url);
    const headers = {
        "Content-type": "application/json"
    }
    return fetch(url, {method: "GET", headers})
    .then(res=>res.json())
    .then(res=>res)
    .catch(error=>error)
}