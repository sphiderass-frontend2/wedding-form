/* eslint-disable @typescript-eslint/no-explicit-any */


import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
    title: 'Wedding App',
    description: 'Plan your perfect wedding with our app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}