import React from 'react';
import {getBooks} from './services/books';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

function App() {

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


  return (
    <div>
      <h1>Gerar lista de livros mais legais!! Vai mannn... vascao campeao</h1>
      <button onClick={createPdf}>Criar pdf</button>
    </div>
  );
}

export default App;
