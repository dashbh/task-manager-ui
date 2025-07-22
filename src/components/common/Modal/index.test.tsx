import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';

import { Modal } from '.';

vi.mock('focus-trap-react', () => ({
  FocusTrap: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Modal', () => {
  it('Modal -> isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Focusable inside modal</div>
      </Modal>,
    );

    expect(container.firstChild).toBeNull();
  });

  it('Modal -> isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        <div autoFocus>Modal Content</div>
      </Modal>,
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  it('Modal -> close button click', () => {
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <div tabIndex={0}>Modal Content</div>
      </Modal>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });
});
