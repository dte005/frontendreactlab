import React, {useState} from 'react';
import {getBooks, postBooks, deleteBook} from './services/books';
import Books from './Books';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [refreshList, setRefreshList] = useState(false);

  function createPdf(){
    const resportTitle=[
      {
        text: 'Clientes',
        fontSize: 15,
        bold: true,
        margin: [15, 20, 0, 45]
      }
    ];

    const footer=(currentPage, pageCount)=>{
      return [
        {
          text: `${currentPage}/${pageCount}`,
          fontSize: 10,
          alignment: 'right',
          margin:[0,10,20,0]
        }
      ]
    }

    const details=[
      {
        style: 'tableExample',
        table: {
          heights: 40,
          body: []
        }
      },
    ];

    getBooks()
    .then(res=>{
      if(res && res.books){
        res.books.forEach((book, index, array)=>{
          details[0].table.body.push([`${index}`, book.titulo])
        })
        const docDefinitions = {
          pageSize: 'A4',
          pageMargins: [15,50,15,40],
          header: [resportTitle],
          content:[details],
          footer: footer
        }
    
        pdfMake.createPdf(docDefinitions).open();
      }else{
        console.log("Nao e possivel gerar PDF sem livros cara!!")
      }

    })
    .catch(error=>{
      console.log(error);
    })
  }

  async function sendForm(e){
    e.preventDefault();
    const response = await postBooks({titulo: title});
    console.log(response);
    setMessage(response.message);
    if(!response.error){
      setRefreshList(!refreshList);
    }
  }

  function handleChange(e){
    setTitle(e.target.value);
  }

  async function handleDelete(index){
    const response = await deleteBook(index);
    console.log(response);
    if(!response.error){
      setRefreshList(!refreshList);
    }
  }


  return (
    <div>
      <h1>Gerar lista de livros mais legais!! Vai mannn... vascao campeao</h1>
      <button onClick={createPdf}>Criar pdf</button>
      <div style={{marginTop: '50px'}}>
        <h4>Adicione um livro na lista</h4>
        <form>
          <input type="text" value={title} onChange={handleChange} />
          <button type="submit" onClick={sendForm}>Enviar</button>
          <br />
          <span>{message}</span>
        </form>
      </div>
      <div>
        <Books refresh={refreshList} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default App;
