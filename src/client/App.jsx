import React from 'react';
import './App.css';
import './styles/match.css'

import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  const MatchPage = () => {

    const handleClick = event => {
      console.log(event.target.id);
    }  
    
    return(
          <>
            <Header />
            <div className='match-page'>
              <div className='match-page-container'>
                <button onClick={handleClick} id='cross'>&#10006;</button>
                <div className="match-card-container">
                  <div className='match-card-wrapper'>
                    <div className='match-card'>
                      <div className='card-image'>
                        <img 
                          className='card-image'
                          src='https://www.penguin.co.uk/content/dam/prh/books/109/1095734/9780099582595.jpg.transform/PRHDesktopWide_small/image.jpg' 
                          //expected source: {book.cover}
                          alt='book cover' 
                        />
                      </div>
                      <div className='details'>
                        <h2 className='title'>{/*Expected: book.title*/}Dracula</h2>
                        <h4 className='book-description'>{/*Expected: book.description*/}Bram Stokers novel became one of the masterpieces of the horror genre, brilliantly evoking a world of vampires and vampire hunters whilst simultaneously exposing the dark corners of Victorian sexuality and frustrated desire.</h4>
                        <div className='tags'>{/*Expected: book.tags*/}Tags Here</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={handleClick} id='like'>&#x2764;</button>
              </div>
            </div>
            <Footer />
          </>
      )
  }

  return (
      <MatchPage />
  );
}

export default App;