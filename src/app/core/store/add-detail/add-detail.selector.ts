import { AddDetail } from './add-detail.state';
import { createFeatureSelector } from '@ngrx/store';
import { createSelector} from '@ngrx/store';
export const feature_addDetail = createFeatureSelector<AddDetail>("feature_addDetail");
export const pendingDetailSelection = createSelector(feature_addDetail, (state) => state.addDetail)
