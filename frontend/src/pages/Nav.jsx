import React from 'react'

const Nav = ({user}) => {
  return (
    <div>
    <nav className="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
  <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
      
      <div className="text-indigo-500 md:order-1">
      <p className="text-2xl font-semibold whitespace-nowrap">Welcome, {user[0].username}!</p>
      </div>
      <div className="order-2 md:order-3">
          <button className=" px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => dispatch(logout())}>
                      Log out
                    </button>
      </div>
  </div>
</nav>
  </div>
  )
}

export default Nav
