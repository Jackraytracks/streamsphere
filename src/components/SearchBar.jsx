import React, { useState } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { BsSearch } from 'react-icons/bs'

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => {
    setValue(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Search for movies..."
        value={value}
        onChange={handleChange}
        style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', borderColor: '#555' }}
      />
      <Button variant="danger">
        <BsSearch />
      </Button>
    </InputGroup>
  )
}

export default SearchBar
