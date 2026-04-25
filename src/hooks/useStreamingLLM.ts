import { useState, useCallback } from 'react';

export interface StreamingState {
  isStreaming: boolean;
  streamedText: string;
  error: Error | null;
}

export function useStreamingLLM() {
  const [state, setState] = useState<StreamingState>({
    isStreaming: false,
    streamedText: '',
    error: null,
  });

  const startStreaming = useCallback(() => {
    setState({
      isStreaming: true,
      streamedText: '',
      error: null,
    });
  }, []);

  const appendToken = useCallback((token: string) => {
    setState((prev) => ({
      ...prev,
      streamedText: prev.streamedText + token,
    }));
  }, []);

  const completeStreaming = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isStreaming: false,
    }));
  }, []);

  const setError = useCallback((error: Error) => {
    setState((prev) => ({
      ...prev,
      isStreaming: false,
      error,
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      isStreaming: false,
      streamedText: '',
      error: null,
    });
  }, []);

  return {
    ...state,
    startStreaming,
    appendToken,
    completeStreaming,
    setError,
    reset,
  };
}
