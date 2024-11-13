// cartStore.ts
import { create } from 'zustand';

export const useTaskStore = create(set => ({
  tasksGeral: null,

  setTasksGeral: tasks => set({ tasksGeral: tasks }),
}));
