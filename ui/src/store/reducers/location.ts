import _ from 'lodash';
import { Action, createAction } from '@reduxjs/toolkit';
import {LocationUpdate, UrlQueryMap,urlUtil} from 'src/packages/datav-core';
import {   setParamToUrl } from 'src/core/library/utils/url';
 
export interface LocationState {
    url: string;
    path: string;
    query: UrlQueryMap;
    routeParams: UrlQueryMap;
    replace: boolean;
    lastUpdated: number;
  }

export const initialState: LocationState = {
  url: '',
  path: '',
  query: {},
  routeParams: {},
  replace: false,
  lastUpdated: 0,
};

export const updateLocation = createAction<LocationUpdate>('location/updateLocation');

// Redux Toolkit uses ImmerJs as part of their solution to ensure that state objects are not mutated.
// ImmerJs has an autoFreeze option that freezes objects from change which means this reducer can't be migrated to createSlice
// because the state would become frozen and during run time we would get errors because Angular would try to mutate
// the frozen state.
// https://github.com/reduxjs/redux-toolkit/issues/242
export const locationReducer = (state: LocationState = initialState, action: Action<unknown>) => {
  if (updateLocation.match(action)) {
    const payload: LocationUpdate = action.payload;
    const { path, routeParams, replace } = payload;
    let query = payload.query || state.query;

    if (payload.partial) {
      query = _.defaults(query, state.query);
      query = _.omitBy(query, _.isNull);
    }

    // // if query changed,update url in browser
    if (!payload.keepUrl && query != state.query) {
        setParamToUrl(query)
    }
    return {
      url: urlUtil.renderUrl(path || state.path, query),
      path: path || state.path,
      query: { ...query },
      routeParams: routeParams || state.routeParams,
      replace: replace === true,
      lastUpdated: new Date().getTime(),
    };
  }

  return state;
};


export default {
    location: locationReducer,
};