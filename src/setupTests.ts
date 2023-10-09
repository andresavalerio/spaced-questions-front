// src/setup-vitest.ts
import "@testing-library/jest-dom";

vi.mock("zustand"); // to make it works like Jest (auto-mocking)
