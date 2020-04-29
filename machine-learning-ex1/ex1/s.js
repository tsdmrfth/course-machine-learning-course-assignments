export async function configureStore() {
    let initialState = {};
    const token = storageManager.get('token');

    function makeRequest() {
        return new Promise(async resolve => {
            if (token) {
                const res = await fetch(`${process.env.EB_BASE_URL}/auth/me/validate`, {
                    method: 'post',
                    body: JSON.stringify({}),
                    headers: new Headers({
                        'Authorization': `Bearer ${token}`,
                        'EB-Client-Type': `${process.env.EB_CLIENT_TYPE}`,
                        'Content-Type': 'application/json'
                    })
                })
                resolve({auth: {...res.response}})
            }
            resolve({})
        })
    }

    initialState = await makeRequest()

    console.log(initialState)
    createStoreWithEnhancers(createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunk, localStorageManager)
        )
    ));
    return getStore();
}