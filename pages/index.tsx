import Head from 'next/head'
import styles from '@/pages/index.module.css'
import { USER_DATA } from 'data/user-data'
import { useEffect, useState } from 'react'

type userData = {
  name: string,
  title: string,
  desk: number,
  date: {
    day: number,
    month: number,
    year: number
  }
}

type userListProps = {
  userData: userData[]
}

const UserList = ({userData}: userListProps) => <ul className={styles.userList} aria-labelledby='results' aria-label='results'>
  {userData.map((item, idx) => <li key={idx}>
    <ul className={styles.user}>
      <li className={styles.userItem}>
        <span>Name:</span>
        <span>{item.name}</span>
      </li>
      <li className={styles.userItem}>
        <span>Title:</span>
        <span>{item.title}</span>
      </li>
      <li className={styles.userItem}>
        <span>Desk number:</span>
        <span>{item.desk}</span>
      </li>
      <li className={styles.userItem}>
        <span>Reservation date:</span>
        <span>{`${item.date.day}.${item.date.month}.${item.date.year}`}</span>
      </li>
    </ul>
  </li>)}
</ul>

const useSearch = () => {
  const [userData, setUserData] = useState<userData[] | null>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<userData[] | null>(null)
  const [error, setError] = useState('')

  useEffect(()=> {
    setUserData(USER_DATA)
  }, [])

  const performSearch = () => {
    if (query && query.length <=2) {
      return setError('Please enter at least 3 characters')
    }
    if (userData && query && query.length > 2) {
      setError('')
      const searchResults = userData.filter(item => item.name.toLowerCase().includes(query.toLowerCase()) || item.title.toLowerCase().includes(query.toLowerCase()))
      setTimeout(()=> {
        setResults(searchResults)
      }, 2000)

      setQuery('')
    }
  }

  return {query, setQuery, results, performSearch, error}
}

export default function Home() {

  const { query, setQuery, results, performSearch, error } = useSearch()
  
  const checkSubmitSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch()
    }  
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>See who is in the office!</title>
      </Head>

      <main>
        <h1>See who is in the office this week!</h1>
        <div className={styles.searchBox}>
          <label htmlFor="name">Type a person's name or title</label>
          <input onChange={(e)=>{setQuery(e.target.value)}} onKeyUp={checkSubmitSearch} type="text" name="name" value={query}></input>
          {error && <span className={styles.error}>{error}</span>}
          <button onClick={performSearch}>Search</button>
        </div>
        {results && results.length ? 
        <UserList userData={results} /> :
        results && results.length === 0 ?
        <p>No results found</p>
        : ''} 
      </main>
    </div>
  )
}
