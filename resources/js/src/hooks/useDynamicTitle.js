import { useEffect } from 'react';

const useDynamicTitle = (title) => {
    useEffect(() => {
        if(title) {
            document.title = `${title} | ScolioLife™`;
        }
    }, [title]);
};

export default useDynamicTitle;