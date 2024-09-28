import React from "react";
import useRecurringDateStore from "./StateStore";

// Options for weeks of the month and days of the week
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

const RecurrenceOptions: React.FC = () => {
  const {
    recurrence,
    setRecurrence,
    interval,
    setInterval,
    daysOfWeek,
    setDaysOfWeek,
    nthDayOfMonth,
    setNthDayOfMonth,
  } = useRecurringDateStore();

  const handleDaySelection = (day: number) => {
    if (daysOfWeek.includes(day)) {
      setDaysOfWeek(daysOfWeek.filter((d: number) => d !== day));
    } else {
      setDaysOfWeek([...daysOfWeek, day]);
    }
  };

  const handleNthDayOfMonthChange = (week: string, day: string) => {
    setNthDayOfMonth({ nth: week, dayOfWeek: day });
  };

  return (
    <div className="m-2 space-y-4">
      <div>
        <select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
          className="border border-gray-300 p-2 rounded w-[inherit]"
        >
          <option value="none" disabled>
            Repeat
          </option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {recurrence !== "none" && (
        <>
          <div>
            <label className="block">Repeat Every</label>
            <input
              type="number"
              value={interval}
              onChange={(e) => Number(e.target.value)>0 ? setInterval((Number(e.target.value)))
              :""}
              className="border border-gray-300 p-2 rounded"
              min="1"
            />
          </div>

          {recurrence === "weekly" && (
            <div>
              <label className="block">Days of the Week</label>
              <div className="flex space-x-2">
                {["S", "M", "Tu", "W", "Th", "F", "S"].map((day, index) => (
                  <button
                    key={index}
                    className={`p-2 rounded ${
                      daysOfWeek.includes(index)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-blue-500"
                    }`}
                    onClick={() => handleDaySelection(index)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {recurrence === "monthly" && (
            <div>
              <label className="block mb-2">
                Select Week and Day of the Month
              </label>
              <div className="flex space-x-4">
                {/* Week number dropdown */}
                <select
                  value={nthDayOfMonth?.nth || ""}
                  onChange={(e) =>
                    handleNthDayOfMonthChange(
                      e.target.value,
                      nthDayOfMonth?.dayOfWeek || "Sunday"
                    )
                  }
                  className="border border-gray-300 p-2 rounded"
                >
                  <option value="" disabled>Select Week</option>
                  {weeksOfMonth.map((week, index) => (
                    <option key={index} value={week}>
                      {week}
                    </option>
                  ))}
                </select>

                {/* Day of the week dropdown */}
                <select
                  value={nthDayOfMonth?.dayOfWeek || ""}
                  onChange={(e) =>
                    handleNthDayOfMonthChange(
                      nthDayOfMonth?.nth || "First",
                      e.target.value
                    )
                  }
                  className="border border-gray-300 p-2 rounded"
                >
                  <option value="" disabled>Select Day</option>
                  {daysOfWeekOptions.map((day, index) => (
                    <option key={index} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RecurrenceOptions;
