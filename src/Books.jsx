import React, {useEffect, useState} from 'react';
import {getBooks} from './services/books';

export default function Books({refresh, handleDelete}) {
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        let isSub = true;
        getBooks()
        .then(res=>{
            console.log(res.books);
            if(res && res.books && isSub){
                setBooks(res.books);
            }
        })
        .catch(error=>{
            console.log(error);
            setBooks([]);
        });

        return ()=>isSub=false
    }, [refresh]);

    return (
        <div>
            <ul>
                {books.length > 0 && books.map((b, index)=>{
                    return (
                        <div key={index}>
                        <li>{b.titulo}</li><button onClick={(e)=>handleDelete(index)}>del</button>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}
