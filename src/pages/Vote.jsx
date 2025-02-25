import React from 'react'

const Vote = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">🚫 Access Denied</h1>
                <p className="text-gray-700 text-lg mb-6">
                    Sorry, you don't have permission to view this page.
                </p>
                <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Go to Home
                </a>
            </div>
        </div>
  )
}

export default Vote