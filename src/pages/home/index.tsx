import { Earth } from "lucide-react"
import { Link } from "react-router-dom"

export const Home = () => {

  const cities = ["Dallol", "Fairbanks", "London", "Recife", "Vancouver", "Yakutsk"]

  return (
    <div className="flex flex-col items-center h-screen justify-center gap-8 font-extralight text-zinc-50 bg-zinc-900">
      <div className="flex flex-col items-center justify-center gap-1"> 
        <h1 className="text-5xl">Weather</h1>
        <h2 className="text-lg">select a city</h2>
      </div>

      <div className="flex justify-center">
        <Earth 
          className="size-40"
          strokeWidth={.5} 
        />
      </div>

      <ul className="grid grid-cols-2 gap-2 text-xl w-4/5 text-center xs:grid-cols-3 md:max-w-80 lg:max-w-96">
        {cities.map(city => {
          return(
            <li className="duration-300 hover:scale-125" key={city}>
              <Link to={`/weather/${city}`}>{city}</Link>
            </li>
          )
        })}
      </ul>

    </div>
  )
}