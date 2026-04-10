import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import TickerSelector from "../components/TickerSelector";

test("renders ticker selector options", () => {
  render(
    <TickerSelector
      selected="AAPL"
      onChange={() => {}}
      options={["AAPL", "TSLA", "BTC-USD"]}
    />
  );

  expect(screen.getByRole("combobox")).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "AAPL" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "TSLA" })).toBeInTheDocument();
  expect(screen.getByRole("option", { name: "BTC-USD" })).toBeInTheDocument();
});

test("calls onChange when a different ticker is selected", () => {
  const mockFn = vi.fn();

  render(
    <TickerSelector
      selected="AAPL"
      onChange={mockFn}
      options={["AAPL", "TSLA", "BTC-USD"]}
    />
  );

  fireEvent.change(screen.getByRole("combobox"), {
    target: { value: "TSLA" },
  });

  expect(mockFn).toHaveBeenCalledWith("TSLA");
});