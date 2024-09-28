import React from "react";
import Calendar from "react-calendar";
import useRecurringDateStore from "./StateStore";
import "react-calendar/dist/Calendar.css";
import RecurrenceOptions from "./RecurrenceOptions";

import {
  addDays,
  addWeeks,
  addMonths,
  addYears,
  format,
  getDay,
  startOfMonth,
  endOfMonth,
  isSameDay,
} from "date-fns";

// Define week and day constants for monthly recurrence
const weeksOfMonth = ["First", "Second", "Third", "Fourth", "Last"];
const daysOfWeekOptions = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const DatePickerComponent: React.FC = () => {
  const {
    startDate,
    setStartDate,
    endDate,
    recurrence,
    interval,
    daysOfWeek,
    nthDayOfMonth,
  } = useRecurringDateStore();

  const generateRecurringDates = (): Date[] => {
    let dates: Date[] = [];
    let nextDate = startDate;

    while (nextDate <= (endDate || addYears(startDate, 3))) {
      switch (recurrence) {
        case "daily":
          nextDate = addDays(nextDate, interval);
          if (nextDate <= (endDate || addYears(startDate, 3))) {
            dates.push(nextDate);
          }
          break;

        case "weekly":
          const matchedCurrentWeekDays = daysOfWeek.map((day) => {
            let dayOffset = day - getDay(nextDate);
            return addDays(nextDate, dayOffset); // Get the correct day in the current week
          });

          matchedCurrentWeekDays.forEach((matchedDate) => {
            if (
              matchedDate >= startDate &&
              matchedDate <= (endDate || addYears(startDate, 3))
            ) {
              dates.push(matchedDate);
            }
          });

          nextDate = addWeeks(nextDate, interval);
          break;

        case "monthly":
          if (nthDayOfMonth) {
            const { nth, dayOfWeek } = nthDayOfMonth;

            // Ensure nth and dayOfWeek have valid values to prevent infinite loops
            if (nth && dayOfWeek) {
              const monthStart = startOfMonth(nextDate);
              const monthEnd = endOfMonth(nextDate);
              let currentDay = monthStart;
              let occurrence = 0;

              while (currentDay <= monthEnd) {
                if (daysOfWeekOptions[getDay(currentDay)] === dayOfWeek) {
                  occurrence++;
                  if (
                    (nth === "Last" && currentDay === monthEnd) ||
                    nth === weeksOfMonth[occurrence-1]
                  ) {
                    dates.push(currentDay);
                    break;
                  }
                }
                currentDay = addDays(currentDay, 1);
              }
            }

            nextDate = addMonths(nextDate, interval);
          } else {
            nextDate = addMonths(nextDate, interval);
            dates.push(nextDate);
          }
          break;

        case "yearly":
          nextDate = addYears(nextDate, interval);
          if (nextDate <= (endDate || addYears(startDate, 3))) {
            dates.push(nextDate);
          }
          break;

        default:
          return [];
      }
    }

    return dates;
  };

  const recurringDates = generateRecurringDates();

  function tileClassName({ date, view }: { date: Date; view: string }) {
    if (view === "month") {
      if (recurringDates.some((recDate) => isSameDay(recDate, date))) {
        return "recurringDaysClass"; // Class for recurring dates styling
      }
    }
    return "";
  }

  const handleDate = (date: Date) => {
    const day = date.getDate();
    const month = format(date, "MMM");
    const year =
      date.getFullYear() === new Date().getFullYear()
        ? ""
        : `, ${date.getFullYear()}`;

    return (
      <>
        <span>{month} </span>
        <span>{day}</span>
        <span>{year}</span>
      </>
    );
  };

  return (
    <div>
      <div className="date-picker w-[270px] border-slate-900 border-solid border-2">
        <p>
          <span>Date: </span>
          <span>{startDate ? handleDate(startDate) : "Select a date"}</span>
        </p>
        <Calendar
          onChange={setStartDate}
          value={startDate}
          className="border-solid border-2 border-slate-700"
          tileClassName={tileClassName}
          minDetail="year"
          prev2Label={null}
          next2Label = {null}
        />
        <RecurrenceOptions />
      </div>
    </div>
  );
};

export default DatePickerComponent;
