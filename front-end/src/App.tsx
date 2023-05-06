import { useState } from 'react'
import './App.css'
import { Products } from './data'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>SuperStore</header>
      <main>
        <ul>
          {Products.map((product) => (
            <li key={product.slug}>
              <img
                className='imgP'
                src={product.image}
                alt={product.name}
              />

              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </li>

          ))}
        </ul>
      </main>
      <footer>All right reserved.</footer>
    </>
  )
}

export default App
