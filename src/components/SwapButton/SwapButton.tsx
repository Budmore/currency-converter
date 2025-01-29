import "./SwapButton.css";

interface SwapButtonProps {
  onClick: () => void;
}

export function SwapButton({ onClick }: SwapButtonProps) {
  return (
    <button type="button" className="swap-button" onClick={onClick}>
      ⇆
    </button>
  );
}
