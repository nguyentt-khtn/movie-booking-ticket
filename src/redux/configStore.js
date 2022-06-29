import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { BookingTicketReducer } from './reducers/BookingTicketReducer'
import { CarouselReducer } from './reducers/CarouselReducer'
import { CinemaReducer } from './reducers/CinemaReducer'
import { FilmReducer } from './reducers/FilmReducer'
import { LoadingReducer } from './reducers/LoadingReducer'
import { UserReducer } from './reducers/UserReducer'

const rootReducer = combineReducers({
    CarouselReducer,
    FilmReducer,
    CinemaReducer,
    UserReducer,
    BookingTicketReducer,
    LoadingReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))