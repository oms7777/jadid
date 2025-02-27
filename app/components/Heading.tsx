'use client';

import React from "react";

interface HeadingProps {
    title: string;
    subtitle?: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
    return (
        <div className={`w-full ${center ? 'text-center' : 'text-start'}`}>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                {title}
            </h2>
            {subtitle && (
                <p className="text-neutral-500 text-sm md:text-base mt-2">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default Heading;
