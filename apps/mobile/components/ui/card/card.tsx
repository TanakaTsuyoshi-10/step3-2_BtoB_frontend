import React from "react";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props}/>; }
export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props}/>; }
export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) { return <h3 {...props}/>; }
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props}/>; }

export const Section = CardContent; // 互換のためのエイリアス
export const Title = CardTitle;     // 互換のためのエイリアス

export default Card;