import _ from "lodash";

const getInfoData = (object, array) => {
    return _.pick(object, array);
};

export { getInfoData };
