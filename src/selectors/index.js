import { createSelector } from 'reselect';
import _ from 'lodash';

const getPlatformRegistrationFormErrors = (state) => state.form.PlatformRegistrationForm.syncErrors;

export const getPlatformRegistrationValidity = createSelector(
    [ getPlatformRegistrationFormErrors ],
    (errors) => {
        const noErrors = _.filter(errors, (error) => {
            return error;
        }).length;
        return !noErrors;
    }
);