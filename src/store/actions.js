import * as types from "./mutation-types";
import bridge from "../bridge";
export const getToken = async function({ commit, state }) {
  // 如果state里面已经有token，则直接返回token
  if (state.token) {
    return Promise.resolve(state.token);
  }
  let tokenData = await bridge.call("getToken");
  console.log("tokendata", tokenData);
  if (tokenData.token) {
    commit(types.SET_TOKEN, tokenData.token);
    return Promise.resolve(tokenData.token);
  }
  return Promise.resolve("");
};
