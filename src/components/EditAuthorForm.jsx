/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';

import { ALL_AUTHORS, EDIT_BORN } from '../queries';

const EditAuthorForm = (props) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  const [changeAuthor, result] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    console.log('update author...');

    changeAuthor({ variables: { name, setBornTo: parseInt(born) } });

    setName('');
    setBorn('');
  };

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      props.setError('author not found');
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default EditAuthorForm;
