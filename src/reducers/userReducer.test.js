import { userReducer } from "./userReducer";

describe("testing user reducer", () => {
  test("should set user data", () => {
    const initialState = {
      user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        createdAt: "",
        updatedAt: "",
      },
      error: "",
      loading: "",
    };
    const action = {
      type: "SET_USER",
      payload: {
        userData: {
          _id: "1",
          firstName: "Percy",
          lastName: "Jack",
          email: "percy@abc.com",
          password: "12345678",
          createdAt: "12-07-2021",
          updatedAt: "12-07-2021",
        },
      },
    };
    const expectedState = {
      user: {
        _id: "1",
        firstName: "Percy",
        lastName: "Jack",
        email: "percy@abc.com",
        password: "12345678",
        createdAt: "12-07-2021",
        updatedAt: "12-07-2021",
      },
      error: "",
      loading: "",
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
  test("should change password", () => {
    const initialState = {
      user: {
        _id: "1",
        firstName: "Percy",
        lastName: "Jack",
        email: "percy@abc.com",
        password: "12345678",
        createdAt: "12-07-2021",
        updatedAt: "12-07-2021",
      },
      error: "",
      loading: "",
    };
    const action = {
      type: "CHANGE_PASSWORD",
      payload: {
        newPassword: "abcd1234",
        updatedAt: "14-08-2021",
      },
    };
    const expectedState = {
      user: {
        _id: "1",
        firstName: "Percy",
        lastName: "Jack",
        email: "percy@abc.com",
        password: "abcd1234",
        createdAt: "12-07-2021",
        updatedAt: "14-08-2021",
      },
      error: "",
      loading: "",
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
  test("should set loading", () => {
    const initialState = {
      user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        createdAt: "",
        updatedAt: "",
      },
      error: "",
      loading: "",
    };
    const action = {
      type: "SET_LOADING",
      payload: {
        loadMsg: "processing changes...",
      },
    };
    const expectedState = {
      user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        createdAt: "",
        updatedAt: "",
      },
      error: "",
      loading: "processing changes...",
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
  test("should set error", () => {
    const initialState = {
      user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        createdAt: "",
        updatedAt: "",
      },
      error: "",
      loading: "processing data...",
    };
    const action = {
      type: "SET_ERROR",
      payload: {
        error: "500 Server Error! Please try later",
      },
    };
    const expectedState = {
      user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        createdAt: "",
        updatedAt: "",
      },
      error: "500 Server Error! Please try later",
      loading: "",
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
