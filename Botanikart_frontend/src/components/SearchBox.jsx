import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate('/')
        }
    }

    return (
        <form onSubmit={submitHandler} className="flex items-center">
            <div className="flex flex-wrap items-center">
                <input
                    type="text"
                    name="q"
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search..."
                    className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 md:mr-2 md:ml-5 w-full md:w-auto"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-r-md hover:bg-green-600 transition-colors duration-200 mt-2 md:mt-0 w-full md:w-auto"
                >
                    Search
                </button>
            </div>
        </form>
    )
}

export default SearchBox