import { useQuery } from '@apollo/client';
import { ALL_AUTHORS } from '../queries';
import EditAuthorForm from './EditAuthorForm';

/* eslint-disable react/prop-types */
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const authors = result?.data?.allAuthors

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <div>loading...</div>;
  }

  if(!authors) {
    return <div>No authors registered</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthorForm authors={authors} show={props.show} />
    </div>
  )
}

export default Authors
