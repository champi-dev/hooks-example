import React from 'react';
import { useHttp } from '../hooks/http'

import Summary from './Summary';

const Character = ({ selectedChar }) => {
  const { isLoading, fetchedData } = useHttp({ url: `https://swapi.co/api/people/${selectedChar}`, dependencies: [selectedChar] });

  const loadedCharacter = fetchedData ? {
    id: selectedChar,
    name: fetchedData.count,
    height: fetchedData.height,
    colors: {
      hair: fetchedData.hair_color,
      skin: fetchedData.skin_color
    },
    gender: fetchedData.gender,
    movieCount: fetchedData.films ? fetchedData.films.length : 0
  } : {};

  return markup();

  function markup() {
    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter.id) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }

    return content;
  };
}

export default Character;
