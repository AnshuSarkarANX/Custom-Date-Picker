import {create} from "zustand";

// Define the shape of nthDayOfMonth with week number and day of the week
interface NthDayOfMonth {
  nth: string; // e.g., "First", "Second", "Last"
  dayOfWeek: string; // e.g., "Sunday", "Monday", "Tuesday"
}

// Define the shape of the store
interface RecurringDateStore {
  startDate: Date;
  endDate: Date | null;
  recurrence: string;
  interval: number;
  daysOfWeek: number[];
  nthDayOfMonth: NthDayOfMonth | null;
  reminderDates: Date[];

  setStartDate: (date: Date) => void;
  setEndDate: (date: Date | null) => void;
  setRecurrence: (recurrence: string) => void;
  setInterval: (interval: number) => void;
  setDaysOfWeek: (days: number[]) => void;
  setNthDayOfMonth: (nthDay: NthDayOfMonth | null) => void;
  setReminderDates: (dates: Date[]) => void;
}

// Initialize the store using Zustand
const useRecurringDateStore = create<RecurringDateStore>((set) => ({
  startDate: new Date(),
  endDate: null,
  recurrence: "none",
  interval: 1,
  daysOfWeek: [],
  nthDayOfMonth: null, // Initialize as null
  reminderDates: [],

  // Actions to update state
  setStartDate: (date: Date) => set(() => ({ startDate: date })),
  setEndDate: (date: Date | null) => set(() => ({ endDate: date })),
  setRecurrence: (recurrence: string) => set(() => ({ recurrence })),
  setInterval: (interval: number) => set(() => ({ interval })),
  setDaysOfWeek: (days: number[]) => set(() => ({ daysOfWeek: days })),
  setNthDayOfMonth: (nthDay: NthDayOfMonth | null) =>
    set(() => ({ nthDayOfMonth: nthDay })),
  setReminderDates: (dates: Date[]) => set(() => ({ reminderDates: dates })),
}));

export default useRecurringDateStore;
