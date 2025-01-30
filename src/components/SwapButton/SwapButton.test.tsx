import { fireEvent, render } from "@testing-library/react";
import { SwapButton } from "./SwapButton";

describe("Counter", () => {
  it("should trigger the onClick method", () => {
    const mockOnClick = jest.fn();

    const { getByRole } = render(<SwapButton onClick={mockOnClick} />);

    fireEvent.click(getByRole("button"));

    expect(mockOnClick).toHaveBeenCalled();
  });
});
