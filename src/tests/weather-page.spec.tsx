import { render, screen, waitFor } from '@testing-library/react'
import { CityWeather } from '../pages/weather-page'

describe('WeatherPage', () => {
  it('Should render properly', () => {
    waitFor(() => {render(<CityWeather />)})

    waitFor(() => {expect(screen.getByTestId('main-content')).toBeInTheDocument()})
    waitFor(() => {expect(screen.getByTestId('wind-speed')).toBeInTheDocument()})
    waitFor(() => {expect(screen.getByTestId('sunrise')).toBeInTheDocument()})
    waitFor(() => {expect(screen.getByTestId('sunset')).toBeInTheDocument()})
    waitFor(() => {expect(screen.getByTestId('humidity')).toBeInTheDocument()})
  })
})