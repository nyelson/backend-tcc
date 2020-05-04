import axios from "axios";

const firstPage = 1;
const defaultItemsPerPage = 10;

export const state = {
  items: [],
  page: firstPage,
  itemsPerPage: defaultItemsPerPage,
  customFilter: {},
  sort: {},
  totalItems: 0,
};

export const namespaced = true;

export const mutations = {
  SET_ITEMS_PAGINATED(state, { paginatedItems, totalItems }) {
    state.items = paginatedItems;
    state.totalItems = totalItems;
  },
  SET_FILTER(state, { page, itemsPerPage, customFilter, sort }) {
    state.page = page;
    state.itemsPerPage = itemsPerPage;
    state.customFilter = customFilter;
    state.sort = sort;
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
        commit("SET_FILTER", { page, itemsPerPage, customFilter, sort });
        commit("SET_ITEMS_PAGINATED", { paginatedItems, totalItems });
      })
      .catch((err) => {
        throw err.response;
      });
  },
  addItem({ state, dispatch }, item) {
    const { page, itemsPerPage, customFilter, sort } = state;
    return axios
      .post("http://localhost:3330/items", item)
      .then(() => {
        dispatch("fetchItems", { page, itemsPerPage, customFilter, sort });
        return;
      })
      .catch((err) => {
        throw err.response;
      });
  },
};
