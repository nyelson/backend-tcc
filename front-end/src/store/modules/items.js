import axios from "axios";

const firstPage = 1;
const defaultItemsPerPage = 10;

export const state = {
  items: [],
  totalItems: 0,
};

export const namespaced = true;

export const mutations = {
  SET_ITEMS_PAGINATED(state, { paginatedItems, totalItems }) {
    state.items = paginatedItems;
    state.totalItems = totalItems;
  },
};

export const actions = {
  fetchItems({ commit }, { page, itemsPerPage, customFilter, sort }) {
    return axios
      .get(
        `http://localhost:3330/items/by-user?page=${page ??
          firstPage}&itemsPerPage=${itemsPerPage ?? defaultItemsPerPage}&${
          sort.by != null ? `sortBy=${sort.by}&` : ""
        }${
          sort.order != null ? `sortOrder=${sort.order === true ? 1 : -1}&` : ""
        }${Object.keys(customFilter || {})
          .filter((key) => customFilter[key] != null && customFilter[key] != "")
          .map((key) => `${key}=${customFilter[key]}`)
          .join("&")}`
      )
      .then(({ data: { items: paginatedItems, totalRecords: totalItems } }) => {
        commit("SET_ITEMS_PAGINATED", { paginatedItems, totalItems });
      })
      .catch((err) => {
        throw err.response;
      });
  },
};
