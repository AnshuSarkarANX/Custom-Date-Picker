'use client'
import DatePickerComponent from "../components/DatePickerComponent";
import "./page.css"
const Home: React.FC = () => {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4">Custom Date Picker</h1>
      <div className="date-picker-container space-y-6">
        <DatePickerComponent />
      </div>
    </div>
  );
};

export default Home;
