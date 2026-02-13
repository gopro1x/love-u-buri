import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                    <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-white/20 shadow-2xl text-center max-w-md">
                        <h2 className="text-3xl font-bold text-white mb-4 font-serif">
                            Oops! 💔
                        </h2>
                        <p className="text-white/80 mb-6">
                            Something went wrong. Please refresh the page and try again.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold rounded-full shadow-xl hover:shadow-pink-500/50 transition-all"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
