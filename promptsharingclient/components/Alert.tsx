import React, { useEffect } from 'react'

interface AlertProps {
    type: 'alert-error' | 'alert-warning' | 'alert-success' | string;
    title: string;
    content: string;
    duration?: number;
    onDismiss: () => void; // Callback to notify parent when the alert disappears
}

export const Alert: React.FC<AlertProps> = ({ type, title, content, duration = 5000, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(); // Notify the parent to hide the alert
        }, duration);

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [duration, onDismiss]);

    if (type === 'alert-error') {
        return <AlertError title={title} content={content} />;
    } else if (type === 'alert-warning') {
        return <AlertWarning title={title} content={content} />;
    } else if (type === 'alert-success') {
        return <AlertSuccess title={title} content={content} />;
    }

    return null;
};

const AlertSuccess = ({ title, content }: { title: string, content: string }) => {
    return (
        <div className="alert alert-success">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM18.58 32.58L11.4 25.4C10.62 24.62 10.62 23.36 11.4 22.58C12.18 21.8 13.44 21.8 14.22 22.58L20 28.34L33.76 14.58C34.54 13.8 35.8 13.8 36.58 14.58C37.36 15.36 37.36 16.62 36.58 17.4L21.4 32.58C20.64 33.36 19.36 33.36 18.58 32.58Z" fill="#00BA34" />
            </svg>
            <div className="flex flex-col">
                <span>{title}</span>
                <span className="text-content2">{content}</span>
            </div>
        </div>
    )
}


const AlertWarning = ({ title, content }: { title: string, content: string }) => {
    return (
        <div className="alert alert-warning">
            <svg width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.94024 35.0004H35.0602C38.1402 35.0004 40.0602 31.6604 38.5202 29.0004L23.4602 2.98035C21.9202 0.320352 18.0802 0.320352 16.5402 2.98035L1.48024 29.0004C-0.0597576 31.6604 1.86024 35.0004 4.94024 35.0004ZM20.0002 21.0004C18.9002 21.0004 18.0002 20.1004 18.0002 19.0004V15.0004C18.0002 13.9004 18.9002 13.0004 20.0002 13.0004C21.1002 13.0004 22.0002 13.9004 22.0002 15.0004V19.0004C22.0002 20.1004 21.1002 21.0004 20.0002 21.0004ZM22.0002 29.0004H18.0002V25.0004H22.0002V29.0004Z" fill="#F98600" />
            </svg>
            <div className="flex flex-col">
                <span>{title}</span>
                <span className="text-content2">{content}</span>
            </div>
        </div>
    )
}

const AlertError = ({ title, content }: { title: string, content: string }) => {
    return (
        <div className="alert alert-error">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM24 26C22.9 26 22 25.1 22 24V16C22 14.9 22.9 14 24 14C25.1 14 26 14.9 26 16V24C26 25.1 25.1 26 24 26ZM26 34H22V30H26V34Z" fill="#E92C2C" />
            </svg>
            <div className="flex flex-col">
                <span>{title}</span>
                <span className="text-content2">{content}</span>
            </div>
        </div>
    )
}