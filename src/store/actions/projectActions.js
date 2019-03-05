export const createProject = (cource) => {
    return (dispatch, getState, {getFirestore}) => {
        // make async call to database
        const firestore = getFirestore();
        firestore.collection('cources').add({
            ...cource
        }).then(() => {
            dispatch({ type: 'CREATE_COURCE_SUCCESS' });
        }).catch(err => {
            dispatch({ type: 'CREATE_COURCE_ERROR' }, err);
        });
    }
};