import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import LoginForms from "./LoginForms";
import { BrowserRouter } from "react-router-dom";

describe("Validating the rules for Cadastration of new User", () => {
  it("Should render the inputs of the forms", () => {
    render(
      <BrowserRouter>
        <LoginForms />
      </BrowserRouter>
    );

    const nameInput = screen.getByTestId("name-input");

    expect(nameInput).toBeInTheDocument();
  });
});
