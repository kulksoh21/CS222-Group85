import { fireEvent, render, screen } from '@testing-library/react';
import CalendarPage from './calendar';

// Test the Calendar UI component
describe("Calendar Page Rendering",  () => {
  it ("Title Renders", () => {
    render(<CalendarPage />);
    // Verify we are on the right page via title
    const title = screen.getByText("Calendar");
    expect(title).toBeInTheDocument();
  });

  it ("Renders events correctly", () => {
    render(<CalendarPage />);
    // Verifying that both events render on page
    const event1 = screen.getByText("Event1");
    expect(event1).toBeInTheDocument();

    const event2 = screen.getByText("Event2");
    expect(event2).toBeInTheDocument(); 
  });
  
  it ("Can swtich to week view", () => {
    render(<CalendarPage />);
    // Finding button to switch view mode
    const button = screen.getByText("Week");
    // Simulation button click
    fireEvent(button, new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }));
    // Verify the button was clicked
    expect(button).toHaveClass("rbc-active");

    // Makes sure events still render
    const event1 = screen.getByText("Event1");
    expect(event1).toBeInTheDocument();

    const event2 = screen.getByText("Event2");
    expect(event2).toBeInTheDocument();
  })
});