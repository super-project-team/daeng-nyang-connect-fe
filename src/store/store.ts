import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import communityReducer from '../slice/communitySlice';
import chatReducer from '../slice/chatSlice';
import reviewReducer from '../slice/reviewSlice';

const rootReducer = combineReducers({
	user: userReducer,
	community: communityReducer,
	chat: chatReducer,
	reviews: reviewReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
