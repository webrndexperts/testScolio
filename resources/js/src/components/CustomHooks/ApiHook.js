import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDynamicLanguage } from '../../i18n';
import { selectLanguage, setLanguage, setUrlLanguage, selectUrlLanguage } from '../../reducers/languageSlice';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ApiHook = () => {
  useDynamicLanguage();
  const { lang } = useParams();
  const { i18n } = useTranslation();
  const currentLanguage = useSelector(selectLanguage);
  const urlLanguage = useSelector(selectUrlLanguage);   
  const dispatch = useDispatch(); 

  useEffect(() => {
    // Check if the language has changed
    if (lang !== currentLanguage) {
      // If the language has changed, update the Redux state
      dispatch(setUrlLanguage(i18n.language));
      dispatch(setLanguage(i18n.language));
      // navigateToArticles();
    } else {
    }
  }, [i18n.language, currentLanguage, dispatch, lang]);

  // Return both currentLanguage and dispatch
  return [currentLanguage, urlLanguage, dispatch];
}

export default ApiHook;
