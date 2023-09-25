import { useState, useEffect } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'

const Card = () => {
  const [pokemon, setPokemon] = useState()
  const [id, setId] = useState(1)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => {
        console.error('Error al cargar los datos:', error)
      })
  }, [id])

  const handleSiguiente = () => {
    setId(id + 1)
  }

  const handleAnterior = () => {
    id > 0 && setId(id - 1)
  }

  return (
    <div className='relative  sm:rounded-2xl lg:h-[40.313rem] lg:w-[70.188rem]  sm:w-4/5 h-full text-white bg-gradient-to-b from-[#242424] to-black w-full sm:h-[812px] font-bold flex flex-col justify-center items-center gap-4'>

      {pokemon && (
        <div className='flex flex-col items-center justify-between w-full h-full bg-right bg-no-repeat lg:flex-row bg-mobile lg:bg-[url(src/assets/img/image1.png)] lg:bg-center' key={pokemon.id}>
          <div className='flex flex-col items-center justify-start w-full h-full pt-5 lg:justify-around lg:w-1/2'>
            <div className='block w-full px-9 h-[4.375rem]'>
              <h1 className='text-4xl first-letter:uppercase'>{pokemon.name}</h1>
              <div className='flex gap-2'>
                {pokemon.types.map((type) => (
                  <span
                    className={`px-2 text-white rounded-lg first-letter:uppercase text-xl ${type.type.name}`}
                    key={type.type.name}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
            <img
              className='w-[17.25rem] lg:w-3/5 mx-4 lg:mx-auto object-contain'
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
            />
          </div>
          <div className='flex flex-col lg:justify-center  items-center w-full lg:w-1/2 lg:h-full gap-1 py-4 sm:rounded-b-2xl rounded-t-2xl backdrop-blur-md h-[22.438rem] lg:rounded-r-2xl lg:rounded-l-none bg-black/40'>

            <span className='text-2xl '>{pokemon.id}</span>

            <div className='flex flex-col w-full gap-4 text-xl px-9 lg:px-20 '>
              {pokemon.stats.map((stat, index) => {
                return (
                  <div key={index} className='flex justify-between w-full gap-1 '>
                    <span className='first-letter:uppercase'>{stat.stat.name}</span>
                    <span>{stat.base_stat}</span>
                  </div>
                )
              }
              )}
            </div>
          </div>
        </div>
      )}
      <div className='absolute flex justify-between w-full p-4 text-5xl -translate-y-1/2 top-1/2'>
        {id > 1
          ? <button className='rounded-full bg-white/30' onClick={handleAnterior}> <RiArrowLeftSLine /></button>
          : <button className='bg-gray-400' disabled />}
        {id &&
          <button className='rounded-full bg-white/30' onClick={handleSiguiente}> <RiArrowRightSLine /></button>}
      </div>
    </div>
  )
}

export default Card
