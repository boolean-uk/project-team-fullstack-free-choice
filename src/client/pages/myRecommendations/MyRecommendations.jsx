import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { GET_RECOMMENDATION } from '../../config';
import '../../styles/myRecommendations.css';

const MyRecommendations = (props) => {
    const { userId } = props;
    
    const sliceStart = 0;
    const sliceEnd = 5;

    const [savedBooks, setSavedBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [tags, setTags] = useState([]);
    const [displayConfirm, setDisplayConfirm] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        getSavedBooks();
    }, []);

    const getAuthors = (books) => {
        const foundAuthors = [];
        books.map(saved => {
            saved.book.authors.map(author => {
                if(!foundAuthors.includes(author.name)){
                    foundAuthors.push(author.name);
                }
            })
        });

        setAuthors(foundAuthors);
    }

    const getTags = (books) => {
        const foundTags = [];
        books.map(saved => {
            saved.book.tags.map(tag => {
                if(!foundTags.includes(tag.name)){
                    foundTags.push(tag.name);
                }
            })
        });

        setTags(foundTags);
    }
    
    const getSavedBooks = async() =>{
        const res = await fetch(GET_RECOMMENDATION + userId);

        const savedBooks =  await res.json();

        console.log('recommendedData', savedBooks.data);

        getAuthors(savedBooks.data);
        getTags(savedBooks.data);

        setSavedBooks(savedBooks.data);
    }



    const remove = (item, list) => {
        const removeIndex = list.indexOf(item);
        const deleteCount = 1;
        const newList = [...list];
        newList.splice(removeIndex, deleteCount);
        return newList;
    }

    const removeTag = (e) => {
        e.preventDefault();
        const removeItem = e.target.className;
        const newList = remove(removeItem, tags);
        setTags(newList);
    }

    const removeAuthor = (e) => {
        e.preventDefault();
        const removeItem = e.target.className;
        const newList = remove(removeItem, authors);
        setAuthors(newList);
    }

    const confirmRemoveBook = (e) => {
        e.preventDefault();
        const selectedTitle = e.target.className;
        const selectedBookIndex = savedBooks.findIndex(x => x.title === selectedTitle);
        setSelectedBook(selectedBookIndex);
        setDisplayConfirm(true);
    }

    const closeConfirm = () => {
        setDisplayConfirm(false);
        setSelectedBook(null);
    }

    const removeBook = () => {
        const newBooks = [...savedBooks];
        const deleteCount = 1;
        newBooks.splice(selectedBook, deleteCount);
        setSavedBooks(newBooks);
        setDisplayConfirm(false);
    }

    return (
        <>
            <div className='recommended'>
                <div className='top-container'>
                    <h2>Your Top Items</h2>
                    <div className='tags-and-authors'>
                        <div className='tags-container'>
                            <h3>Top Tags</h3>
                            {tags &&
                                tags.slice(sliceStart, sliceEnd).map((tag, index) => {
                                    return (
                                        <div className='top-tag' key={index}>
                                            <p>{tag}</p>
                                            <button className={tag} onClick={e => removeTag(e)}>Remove</button>
                                        </div>
                                    )
                                })}
                        </div>
                        <div className='authors-container'>
                            <h3>Top Authors</h3>
                            {authors &&
                                authors.slice(sliceStart, sliceEnd).map((author, index) => {
                                    return (
                                        <div className='author' key={index}>
                                            <p>{author}</p>
                                            <button className={author} onClick={e => removeAuthor(e)}>Remove</button>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
                <div className='books-container'>
                    <h2>Your Saved Books</h2>
                    {savedBooks &&
                        savedBooks.map((saved, index) => {
                            return (
                                <div className='book' key={index}>
                                    <div className='main-book-area'>
                                        <img src={saved.book.cover} alt="Cover" />
                                        <div className='book-info'>
                                            <p>{saved.book.title}</p>
                                            <p>{saved.book.description}</p>
                                            <p>By:</p>
                                            {saved.book.authors &&
                                                saved.book.authors.map((author, index) => {
                                                    return (
                                                        <p key={index}>{author.name}</p>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                    <div className='book-tags'>
                                        {saved.book.tags &&
                                            saved.book.tags.map((tag, index) => {
                                                return (
                                                <div key={index} className='book-tag'>
                                                    <p className='b-tag'>{tag.name}</p>
                                                </div>
                                                )
                                            })
                                        }
                                        <button className={saved.title} onClick={e => confirmRemoveBook(e)}>Remove</button>
                                    </div>
                                </div>
                            )

                        })}
                </div>
            </div>
            {displayConfirm &&
                <div className='delete-popup' id='delete-popup'>
                    <h2>Are you sure you want to remove this book?</h2>
                    <button className='delete-yes' id='delete-yes' onClick={e => removeBook(e)}>Delete</button>
                    <button className='delete-no' id='delete-no' onClick={e => closeConfirm(e)}>Cancel</button>
                </div>
            }
        </>
    )
}

MyRecommendations.propTypes = {
    userId: PropTypes.string.isRequired
}

export default MyRecommendations;