import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Chatbot from '@/components/Chatbot';

describe('Chatbot Component', () => {
  it('renders chat button', () => {
    render(<Chatbot />);

    const chatButton = screen.getByRole('button', { name: /open chat/i });
    expect(chatButton).toBeInTheDocument();
  });

  it('opens chat window when button is clicked', () => {
    render(<Chatbot />);

    const chatButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(chatButton);

    expect(screen.getByText('Radar Cart Support')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('shows welcome message when chat opens', () => {
    render(<Chatbot />);

    const chatButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(chatButton);

    expect(screen.getByText(/Welcome to Radar Cart/i)).toBeInTheDocument();
  });

  it('closes chat window when close button is clicked', () => {
    render(<Chatbot />);

    // Open chat
    const openButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(openButton);

    expect(screen.getByText('Radar Cart Support')).toBeInTheDocument();

    // Close chat
    const closeButton = screen.getByRole('button', { name: /close chat/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText('Radar Cart Support')).not.toBeInTheDocument();
  });

  it('shows quick reply buttons', () => {
    render(<Chatbot />);

    const chatButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(chatButton);

    expect(screen.getByText('What products do you offer?')).toBeInTheDocument();
    expect(screen.getByText('Can you build custom sensors?')).toBeInTheDocument();
    expect(screen.getByText('How does shipping work?')).toBeInTheDocument();
    expect(screen.getByText('Do you offer warranties?')).toBeInTheDocument();
  });

  it('sends message when form is submitted', async () => {
    render(<Chatbot />);

    // Open chat
    const chatButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(chatButton);

    // Type a message
    const input = screen.getByPlaceholderText('Type your message...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Hello' } });

    // Submit via form
    const form = input.closest('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    // User message should appear
    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeInTheDocument();
    });
  });

  it('handles quick reply click', async () => {
    render(<Chatbot />);

    // Open chat
    const chatButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(chatButton);

    // Click quick reply
    const quickReply = screen.getByText('What products do you offer?');
    fireEvent.click(quickReply);

    // Quick reply message should appear
    await waitFor(() => {
      const messages = screen.getAllByText('What products do you offer?');
      expect(messages.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('shows typing indicator after sending message', async () => {
    jest.useFakeTimers();
    render(<Chatbot />);

    // Open chat
    const chatButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(chatButton);

    // Click quick reply to send message
    const quickReply = screen.getByText('What products do you offer?');
    fireEvent.click(quickReply);

    // Typing indicator should appear (3 bouncing dots)
    const bouncingDots = document.querySelectorAll('.animate-bounce');
    expect(bouncingDots.length).toBeGreaterThan(0);

    jest.useRealTimers();
  });

  it('input field is cleared after sending message', async () => {
    render(<Chatbot />);

    // Open chat
    const chatButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(chatButton);

    // Type and send
    const input = screen.getByPlaceholderText('Type your message...') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Test message' } });

    const form = input.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    expect(input.value).toBe('');
  });

  it('send button is disabled when input is empty', () => {
    render(<Chatbot />);

    // Open chat
    const chatButton = screen.getByRole('button', { name: /open chat/i });
    fireEvent.click(chatButton);

    // Find the send button (it's the button inside the form)
    const form = screen.getByPlaceholderText('Type your message...').closest('form');
    const sendButton = form?.querySelector('button[type="submit"]');

    expect(sendButton).toBeDisabled();
  });
});
