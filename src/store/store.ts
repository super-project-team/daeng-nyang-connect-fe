import { combineReducers, createStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from '../slice/userSlice';
import communityReducer from '../slice/communitySlice';
import chatReducer from '../slice/chatSlice';
import reviewReducer from '../slice/ReviewSlice';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({
	user: userReducer,
	community: communityReducer,
	chat: chatReducer,
	reviews: reviewReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default persistor;
