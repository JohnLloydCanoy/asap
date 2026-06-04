import React from "react";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
    <div className="marketing-wrapper">
      {/* Landing page navbar can go here later */}
        {children}
    </div>
    ) ;
}