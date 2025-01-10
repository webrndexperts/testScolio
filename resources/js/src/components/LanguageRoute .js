import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLanguage } from '../reducers/languageSlice';

const LanguageRoute = ({ path, element, ...rest }) => {
  const currentLanguage = useSelector(selectLanguage);

  const getPath = () => {
    if (currentLanguage === 'en_US') {
      return path.replace('/:lang', '');
    }
    return path;
  };

  return <Route path={getPath()} element={element} {...rest} />;
};

export default LanguageRoute;