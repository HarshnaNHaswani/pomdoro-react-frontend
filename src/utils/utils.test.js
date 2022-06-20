import { filterItem } from "filterItem.js";
import { slugify } from "slugify.js";
import { findTask } from "findTask.js";

describe("testing util functions", () => {
  test("slugify", () => expect(slugify("hello 123")).toBe("hello-123"));
  test("findTask", () =>
    expect(
      findTask(
        [
          { _id: "a11", title: "rst" },
          { _id: "a12", title: "xyx" },
        ],
        "a11"
      )
    ).toEqual({ _id: "a11", title: "rst" }));
  test("filterItem", () =>
    expect(
      filterItem(
        [
          { _id: "a11", title: "rst" },
          { _id: "a12", title: "xyx" },
        ],
        "a11"
      )
    ).toEqual([{ _id: "a12", title: "xyx" }]));
});
