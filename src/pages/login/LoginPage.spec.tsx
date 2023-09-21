import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginPage from "./LoginPage";
import { BrowserRouter } from "react-router-dom";

describe("LoginPage", () => {
  it("should run", async () => {
    render(<LoginPage />, { wrapper: BrowserRouter });

    expect(screen.getByText("Spaced Questions")).toBeInTheDocument();
  });
});
