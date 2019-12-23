import axios from "axios";

export const getAllMixes = (url, mixes, resolve, reject) => {
    axios
        .get(url)
        .then(response => {
            const retrivedMixes = mixes.concat(response.data.data);
            if (response.data.paging.next) {
                getAllMixes(
                    response.data.paging.next,
                    retrivedMixes,
                    resolve,
                    reject
                );
            } else {
                resolve(retrivedMixes);
            }
        })
        .catch(error => {
            console.log(error);
            reject("Something wrong. Please refresh the page and try again.");
        });
};
