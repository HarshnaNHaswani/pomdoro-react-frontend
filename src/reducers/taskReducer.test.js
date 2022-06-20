import dayjs from "dayjs";
import { taskReducer } from "./taskReducer";

jest.createMockFromModule("dayjs");

const initialState = {
  tasks: [
    {
      _id: 1,
      title: "Math Homework",
      description: "Lorem Ipsum",
      isPinned: true,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
    {
      _id: 2,
      title: "Science Homework",
      description: "Lorem Ipsum",
      isPinned: false,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
  ],
  completedTaskStats: [],
  archivedTasks: [],
  trash: [],
};

const initialState2 = {
  tasks: [
    {
      _id: 2,
      title: "Science Homework",
      description: "Lorem Ipsum",
      isPinned: false,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
  ],
  completedTaskStats: [],
  archivedTasks: [
    {
      _id: 1,
      title: "Math Homework",
      description: "Lorem Ipsum",
      isPinned: true,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
  ],
  trash: [
    {
      _id: 3,
      title: "History Homework",
      description: "Lorem Ipsum",
      isPinned: true,
      duration: { hours: 0, minutes: 5, seconds: 0 },
      tags: ["school", "homework"],
      completed: false,
      taskPriority: "5",
    },
  ],
};

describe("testing task reducer", () => {
  test("should set initial data", () => {
    const action = {
      type: "SET_INITIAL_DATA",
      payload: {
        tasks: [
          {
            _id: 2,
            title: "Science Homework",
            description: "Lorem Ipsum",
            isPinned: false,
            duration: { hours: 0, minutes: 5, seconds: 0 },
            tags: ["school", "homework"],
            completed: false,
            taskPriority: "5",
          },
        ],
        completedTaskStats: [],
        archivedTasks: [
          {
            _id: 1,
            title: "Math Homework",
            description: "Lorem Ipsum",
            isPinned: true,
            duration: { hours: 0, minutes: 5, seconds: 0 },
            tags: ["school", "homework"],
            completed: false,
            taskPriority: "5",
          },
        ],
        trash: [
          {
            _id: 3,
            title: "History Homework",
            description: "Lorem Ipsum",
            isPinned: true,
            duration: { hours: 0, minutes: 5, seconds: 0 },
            tags: ["school", "homework"],
            completed: false,
            taskPriority: "5",
          },
        ],
      },
    }
    const initialState = {
      tasks: [],
      completedTaskStats: [],
      archivedTasks: [],
      trash: [],
    };
    let state = taskReducer(initialState, action);
    let expectedState = {
      tasks: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      trash: [
        {
          _id: 3,
          title: "History Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
    };
    expect(state).toEqual(expectedState);
  });
  test("should add tasks", () => {
    const action = {
      type: "ADD_TASK",
      payload: {
        task: {
          _id: 3,
          title: "History Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      },
    };

    let state = taskReducer(initialState, action);
    let expectedState = {
      tasks: [
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
        {
          _id: 3,
          title: "History Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [],
      trash: [],
    };
    expect(state).toEqual(expectedState);
  });
  test("should complete task and trash it - new day", () => {
    const action = {
      type: "COMPLETE_TASK",
      payload: {
        taskId: 2,
      },
    };

    const state = taskReducer(initialState, action);
    let expectedState = {
      tasks: [
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [
        {
          date: dayjs().format("YYYY-MM-DD"),
          taskIds: [2],
        },
      ],
      archivedTasks: [],
      trash: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: true,
          taskPriority: "5",
        },
      ],
    };

    expect(state).toEqual(expectedState);
  });
  test("should complete task and trash it - existing day", () => {
    const action = {
      type: "COMPLETE_TASK",
      payload: {
        taskId: 1,
      },
    };

    const initialState = {
      tasks: [
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [
        {
          date: dayjs().format("YYYY-MM-DD"),
          taskIds: [2],
        },
      ],
      archivedTasks: [],
      trash: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: true,
          taskPriority: "5",
        },
      ],
    };
    const state = taskReducer(initialState, action);
    let expectedState = {
      tasks: [],
      completedTaskStats: [
        {
          date: dayjs().format("YYYY-MM-DD"),
          taskIds: [2, 1],
        },
      ],
      archivedTasks: [],
      trash: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: true,
          taskPriority: "5",
        },
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: true,
          taskPriority: "5",
        },
      ],
    };

    expect(state).toEqual(expectedState);
  });
  test("should delete task", () => {
    let action = {
      type: "DELETE_TASK",
      payload: {
        taskId: 1,
      },
    };

    let state = taskReducer(initialState, action);
    let expectedState = {
      tasks: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [],
      trash: [
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
    };
    expect(state).toEqual(expectedState);
  });
  test("should restore task", () => {
    const action = {
      type: "RESTORE_TASK",
      payload: {
        taskId: 3,
      },
    };
    const state = taskReducer(initialState2, action);
    const expectedState = {
      tasks: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
        {
          _id: 3,
          title: "History Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      trash: [],
    };
    expect(state).toEqual(expectedState);
  });
  test("should permanently delete task", () => {
    const action = {
      type: "DELETE_FROM_TRASH",
      payload: {
        taskId: 3,
      },
    };
    const state = taskReducer(initialState2, action);
    const expectedState = {
      tasks: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      trash: [],
    };
    expect(state).toEqual(expectedState);
  });
  test("should update task", () => {
    const action = {
      type: "UPDATE_TASK",
      payload: {
        task: {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum updated",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      },
    };
    const state = taskReducer(initialState, action);
    const expectedState = {
      tasks: [
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum updated",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [],
      trash: [],
    };

    expect(state).toEqual(expectedState);
  });
  test("should archive task", () => {
    const action = {
      type: "ARCHIVE_TASK",
      payload: {
        taskId: 1,
      },
    };
    const state = taskReducer(initialState, action);
    const expectedState = {
      tasks: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      trash: [],
    };
    expect(state).toEqual(expectedState);
  });
  test("should unarchive task", () => {
    const action = {
      type: "UNARCHIVE_TASK",
      payload: {
        taskId: 1,
      },
    };
    const state = taskReducer(initialState2, action);
    const expectedState = {
      tasks: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [],
      trash: [
        {
          _id: 3,
          title: "History Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
    };
    expect(state).toEqual(expectedState);
  });
  test("should delete task from archive ", () => {
    const action = {
      type: "DELETE_FROM_ARCHIVE",
      payload: {
        taskId: 1,
      },
    };
    const state = taskReducer(initialState2, action);
    const expectedState = {
      tasks: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [],
      trash: [
        {
          _id: 3,
          title: "History Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
    };
    expect(state).toEqual(expectedState);
  });
  test("should clear pending", () => {
    let action = {
      type: "CLEAR_PENDING",
      payload: {
      },
    };

    let state = taskReducer(initialState, action);
    let expectedState = {
      tasks: [],
      completedTaskStats: [],
      archivedTasks: [],
      trash: [],
    };
    expect(state).toEqual(expectedState);
  });
  test("should clear archive ", () => {
    const action = {
      type: "CLEAR_ARCHIVE",
      payload: {
     },
    };
    const state = taskReducer(initialState2, action);
    const expectedState = {
      tasks: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [],
      trash: [
        {
          _id: 3,
          title: "History Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
    };
    expect(state).toEqual(expectedState);
  });
  test("should clear trash ", () => {
    const action = {
      type: "CLEAR_TRASH",
      payload: {
     },
    };
    const state = taskReducer(initialState2, action);
    const expectedState = {
      tasks: [
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [    {
        _id: 1,
        title: "Math Homework",
        description: "Lorem Ipsum",
        isPinned: true,
        duration: { hours: 0, minutes: 5, seconds: 0 },
        tags: ["school", "homework"],
        completed: false,
        taskPriority: "5",
      },],
      trash: [],
    };
    expect(state).toEqual(expectedState);
  });
  test("should update priority", () => {
    const action = {
      type: "UPDATE_PRIORITY",
      payload: {
        taskId: 1,
        taskPriority: "3"
      },
    };
    const state = taskReducer(initialState, action);
    const expectedState ={
      tasks: [
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: true,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "3",
        },
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [],
      trash: [],
    };
    expect(state).toEqual(expectedState);
  });
  test("should toggle pinned", () => {
    const action = {
      type: "TOGGLE_TASK_PIN",
      payload: {
        taskId: 1,
      },
    };
    const state = taskReducer(initialState, action);
    const expectedState = {
      tasks: [
        {
          _id: 1,
          title: "Math Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
        {
          _id: 2,
          title: "Science Homework",
          description: "Lorem Ipsum",
          isPinned: false,
          duration: { hours: 0, minutes: 5, seconds: 0 },
          tags: ["school", "homework"],
          completed: false,
          taskPriority: "5",
        },
      ],
      completedTaskStats: [],
      archivedTasks: [],
      trash: [],
    };
    expect(state).toEqual(expectedState);
  });
});
