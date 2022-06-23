import React, { useState } from 'react';
import classNames from 'classnames';
import MeaningsList from '../components/meanings-list';
import { IError, IMeaningList } from '../interfaces';
import arrangeMeanings from './utilities/arrageMeanings';
import './styles.scss';
import LoadIcon from '../../assets/gif/spinner.gif';

const API_URL = process.env.REACT_APP_SERVER_BASE_URL;

function Search() {
  const [word, setWord] = useState<string>('');
  const [error, setError] = useState<IError | undefined>();
  const [meaningsList, setMeaningsList] = useState<IMeaningList[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  // GET API For search data
  const searchDefination = async (event: any) => {
    event.preventDefault();
    if (!word) {
      setError({
        title: 'Please enter a valid text to search',
      });
      return false;
    }

    try {
      setLoading(true);
      const data = await fetch(
        `${API_URL}${word}`,
      );
      const meaningsData = await data.json();
      if (data.status === 200) {
        const meanings = arrangeMeanings(meaningsData);
        setMeaningsList(meanings);
        setError(void 0);
      } else {
        setMeaningsList(void 0);
        setError({
          title: 'Somthing went wrong, please try after sometime',
          ...meaningsData,
        });
      }
    } catch (errorDetails) {
      setError({
        title: 'Somthing went wrong, please try after sometime',
      });
    }
    setLoading(false);
  };

  // Handle input state update
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  return (
    <div className="dictionary">
      <div className="dictionary__top">
        <h1 className="dictionary__top__head">MINI DICTIONARY</h1>
        <form onSubmit={searchDefination} className="dictionary__top__form">
          <input
            className="dictionary__top__form__text"
            placeholder="Search here.."
            onChange={handleInputChange}
          />
          <button type="submit" className={loading ? classNames('dictionary__top__form__btn', 'loading') : classNames('dictionary__top__form__btn')} disabled={loading} data-testid="search">
            {loading ? <img src={LoadIcon} alt="Loading..." /> : 'Search'}
          </button>
        </form>
      </div>
      <div className="dictionary__bottom">

        {
          Boolean(error) && (
            <div className="dictionary__bottom__alert">
              {error?.message ? error.message : error?.title || ''}
            </div>
          )
        }

        {
          meaningsList && (
            <MeaningsList meanings={meaningsList} />
          )
        }
      </div>
    </div>
  );
}

export default Search;
