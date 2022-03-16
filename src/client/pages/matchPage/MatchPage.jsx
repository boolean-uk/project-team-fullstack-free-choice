import React from 'react';
import { useState, useEffect } from 'react';
import { GET_BOOKS_URL } from '../../config';
import { generateRandomInt } from '../../utils';

import Footer from '../../components/Footer'

import '../../styles/match.css'

const MatchPage = (props) => {
    const { user } = props;

    const [library, setLibrary] = useState({});
    const [book, setBook] = useState({});
    const [displayMatchCard, setDisplayMatchCard] = useState(true);
    const [recommendations, setRecommendations] = useState([]);

    const pickRandomBook = (library) => {
        const generatedIndex = generateRandomInt(library.length - 1);
        
        return library[generatedIndex];
    }

    const pickGroupFromDifferentGroup = (unwantedGroupId) => {
        let bookToMatch;

        do{
            bookToMatch = pickRandomBook(library);
        } while (bookToMatch.groupId === unwantedGroupId);

        return bookToMatch;
    }

    useEffect(() => {
        const getLibraryFromDB = async () => {
            const res = await fetch(GET_BOOKS_URL);
            const fetchedLibrary = await res.json();
            
            setLibrary(fetchedLibrary.data);

            if(fetchedLibrary.data.length && !book.title){
                const bookToMatch = pickRandomBook(fetchedLibrary.data);

                setBook(bookToMatch);
            }
        }

        if(!library.length){
            getLibraryFromDB();
        }

    }, [book]);

    const handleClick = event => {
        if(event.target.id === 'like'){
            const groupBooks = library.filter(libraryBook => libraryBook.groupId === book.groupId && libraryBook.id !== book.id);

            setRecommendations(groupBooks);

            setDisplayMatchCard(false);
        }

        if(event.target.id === 'cross'){
            const bookToMatch = pickGroupFromDifferentGroup(book.groupId);

            setBook(bookToMatch);
        }
    }  

    const addSavedBookToUser = async () => {
      //save to user
      //get user id from user.id (state) to send in the url
    }

    const handleSaveClick = async (event) => {
      const recommendedBook = library.filter(libraryBook => libraryBook.id === Number(event.target.id))[0];

      await addSavedBookToUser(recommendedBook);
    }
    
    return(
          <>
            <div className='match-page' style={ {height: displayMatchCard? '90vh' : '0vh'} }>
              {displayMatchCard && book && <div className='match-page-container'>
                <button onClick={handleClick} id='cross'>&#10006;</button>
                <div className="match-card-container">
                  <div className='match-card-wrapper'>
                    <div className='match-card'>
                      <div className='card-image'>
                        <img 
                          className='card-image'
                          src={book.cover} 
                          alt='book cover' 
                        />
                      </div>
                      <div className='details'>
                        <h2 className='title'>{book.title}</h2>
                        <h4 className='book-description'>{book.description}</h4>
                        <div className='tags'>
                          {book.tags && book.tags.map((tag, index) => {
                              return <div className='tag' key={index}>{tag.name}</div>}
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={handleClick} id='like'>&#x2764;</button>
              </div>}
            </div>
            {!displayMatchCard && recommendations && recommendations.map((recommendation, index) => {
                return (<div className='recommendation' key={index}>
                  <img className='recommendation-img' src={recommendation.cover} alt="book cover" />
                  <div className="recommendation-header">
                    <h3>{recommendation.title}</h3>
                    <p>by {recommendation.authors.map((author, index) => {
                      return <span key={index}>{author.name}</span>
                    })}</p>
                    <p>{recommendation.description.substring(0,220)}</p>
                    <button className='save-btn' onClick={handleSaveClick} id={recommendation.id}>Save</button>
                  </div>
                  
                </div>)
            })}
            <Footer />
          </>
    )
}

export default MatchPage;