import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'
import user from '@testing-library/user-event'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /see who is in the office this week!/i,
    })

    expect(heading).toBeInTheDocument()
  })
  it('renders an empty, active text input field', () => {
    render(<Home />)

    const textInput = screen.getByRole('textbox')

    expect(textInput).toBeInTheDocument()
    expect(textInput).toHaveValue('')
    expect(textInput.getAttribute('disabled')).toBeNull()
  })
  it('renders a search button', () => {
    render(<Home />)
    const searchButton = screen.getByRole('button', {name: 
    'Search'})
    expect(searchButton).toBeInTheDocument()
  })
  it('renders a search result after typing in a corrent name and clicking the button', async () => {
    user.setup()
    render(<Home />)
    const searchButton = screen.getByRole('button', {name: 'Search'})
    const textInput = screen.getByRole('textbox')

    await user.type(textInput, 'Ewa')
    await user.click(searchButton)
    const resultsList = await screen.findByRole('list', {name: /results/i}, {timeout: 2250})
    expect(resultsList).toBeInTheDocument()
  
    
  })
  it('renders an error message after typing in a name that is not found and clicking the button', async () => {
    user.setup()
    render(<Home />)
    const searchButton = screen.getByRole('button', {name: 'Search'})
    const textInput = screen.getByRole('textbox')

    await user.type(textInput, 'Baltazar')
    await user.click(searchButton)
    const resultsList = screen.queryByRole('list', {name: /results/i})
    const errorMessage = screen.getByText('No results found')
    expect(resultsList).not.toBeInTheDocument()
    expect(errorMessage).toBeInTheDocument()
  
  })

})
