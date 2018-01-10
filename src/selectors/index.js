import { createSelector } from "reselect";
import _ from "lodash";

const getPlatformRegistrationForm = (state) => state.form.PlatformRegistrationForm;
const getInfoModelRegistrationForm = (state) => state.form.InformationModelRegistrationForm;

const checkForm =  (form) => {
    const { syncErrors, anyTouched } = form;
    const noErrors = _.filter(syncErrors, (error) => {
        // Filtering the nulls
        return error;
    }).length;
    return !noErrors && anyTouched;
};

export const getPlatformRegistrationValidity = createSelector(
    [ getPlatformRegistrationForm ], checkForm
);

export const getInfoModelRegistrationValidity = createSelector(
    [ getInfoModelRegistrationForm ], checkForm
);