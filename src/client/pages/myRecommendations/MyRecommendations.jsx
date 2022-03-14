import { React } from 'react';
import '../../styles/myRecommendations.css';

const recommendedBooks = [
    {
        id: 1,
        title: 'First Term at Malory Towers',
        isbn: '114dsa2334',
        description: 'Darrel is cool',
        cover: 'https://toppsta.com/images/covers/4/0/3/1/9781405224031.webp',
        authors: [
            'Enid Blyton'
        ],
        genres: [
            'coming of age',
            'slice of life'
        ],
        tags: [
            'sweet',
            'heartwarming',
            'enjoyable'
        ]
    },
    {
        id: 2,
        title: 'Harry Potter and the Philosopher\'s Stone',
        isbn: '923198dopk0i321',
        description: 'When mysterious letters start arriving on his doorstep, Harry Potter has never heard of Hogwarts School of Witchcraft and Wizardry. They are swiftly confiscated by his aunt and uncle. Then, on Harry\'s eleventh birthday, a strange man bursts in with some important news: Harry Potter is a wizard and has been awarded a place to study at Hogwarts. And so the first of the Harry Potter adventures is set to begin.',
        cover: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg',
        authors: [
            'J.K. Rowling'
        ],
        genres: [
            'wizard',
            'fiction'
        ],
        tags: [
            'stones',
            'magic',
            'harry potter :o',
            'snape'
        ]
    },
    {
        id: 3,
        title: 'The Maze Runner',
        isbn: '9dsa90udfadwk',
        description: 'A teen wakes up in a clearing in the center of a gigantic maze with no memory of his past, finding himself a resident in community of boys who have built a village in the glade and who sends two of its strongest and fittest runners into the maze every morning to find a way out.',
        cover: 'https://toppsta.com/images/covers/9/4/0/0/9781909489400.jpg',
        authors: [
            'James Dashner'
        ],
        genres: [
            'spooky',
            'fiction'
        ],
        tags: [
            'maze',
            'running'
        ]
    }
]

const recommendedAuthors = [
    'J.K. Rowling',
    'J.R.R. Tolkien',
    'Stephen King',
    'Margaret Atwood',
    'Lena Jones'
]

const recommendedTags = [
    'Stones',
    'Magic',
    'Slice of Life',
    'Cool',
    'Nice'
]

const MyRecommendations = () => {
    return (
        <div className='recommended'>
            <div className='top-container'>
                <h2>Your Top Items</h2>
                <div className='tags-container'>
                    <h3>Top Tags</h3>
                    {recommendedTags &&
                        recommendedTags.map((tag, index) => {
                            return (
                                <div className='tag' key={index}>
                                    <p>{tag}</p>
                                    <button>Remove</button>
                                </div>
                            )
                        })}
                </div>
                <div className='authors-container'>
                    <h3>Top Authors</h3>
                    {recommendedAuthors &&
                        recommendedAuthors.map((author, index) => {
                            return (
                                <div className='author' key={index}>
                                    <p>{author}</p>
                                    <button>Remove</button>
                                </div>
                            )
                        })}
                </div>
            </div>
            <div className='books-container'>
                <h2>Your Saved Books</h2>
                {recommendedBooks &&
                    recommendedBooks.map((book, index) => {
                        return (
                            <div className='book' key={index}>
                                <div className='main-book-area'>
                                    <img src={book.cover} alt="Cover" />
                                    <div className='book-info'>
                                        <p>{book.title}</p>
                                        <p>{book.description}</p>
                                        <p>By:</p>
                                        {book.authors &&
                                            book.authors.map((author, index) => {
                                                return (
                                                    <p key={index}>{author}</p>
                                                )
                                            })}
                                    </div>
                                </div>
                                <div className='book-tags'>
                                    {book.genres &&
                                        book.genres.map((genre, index) => {
                                            return (
                                                <div key={index}>
                                                    <p>{genre}</p>
                                                </div>
                                            )
                                        })}
                                    {book.tags &&
                                        book.tags.map((tag, index) => {
                                            return (
                                                <div key={index}>
                                                    <p>{tag}</p>
                                                </div>
                                            )
                                        })}
                                </div>
                            </div>
                        )

                    })}
            </div>
        </div>
    )
}

export default MyRecommendations;