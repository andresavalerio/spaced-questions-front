import { describe, it, expect } from "vitest";
import ConfirmModal from "./ConfirmModal";
import { render, screen } from "@testing-library/react";

describe("ForgotPassword", () => {
  it("should render", () => {
    render(
      <ConfirmModal
        isOpen={true}
        name="Exemplo"
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );
  });

  it("should have the name displayed", () => {
    render(
      <ConfirmModal
        isOpen={true}
        name="Exemplo"
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    const nameLabel = screen.getByText("Exemplo");

    expect(nameLabel).toBeVisible();
  });

  it("should not display anything when is not open", () => {
    render(
      <ConfirmModal
        isOpen={false}
        name="Exemplo"
        onCancel={() => {}}
        onConfirm={() => {}}
      />
    );

    expect(() => {
      screen.getByText("Exemplo");
    }).toThrowError();
  });

  it("should call onCancel function", () => {
    const onCancel = vi.fn();

    render(
      <ConfirmModal
        isOpen={true}
        name="Exemplo"
        onCancel={onCancel}
        onConfirm={() => {}}
      />
    );

    const cancelButton = screen.getByTestId("cancel-button");

    cancelButton.click();

    expect(onCancel).toBeCalledTimes(1);
  });

  it("should call onConfirm function", () => {
    const onConfirm = vi.fn();

    render(
      <ConfirmModal
        isOpen={true}
        name="Exemplo"
        onCancel={() => {}}
        onConfirm={onConfirm}
      />
    );

    const confirmButton = screen.getByTestId("confirm-button");

    confirmButton.click();

    expect(onConfirm).toBeCalledTimes(1);
  });
});
