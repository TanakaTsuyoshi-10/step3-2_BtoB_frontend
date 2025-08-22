import React from "react";

export default function MobileHome() {
  return (
    <section className="readable-over-bg relative">
      <div
        className="absolute inset-0 -z-10 bg-cover  bg-center readable-over-bg"
        style={{ backgroundImage: "url('/mobile/hero.jpg')" }}
      />
      <div className="px-4 pt-10 pb-8">
        <h1 className="text-on-img text-2xl font-bold tracking-tight">ようこそ</h1>
        <p className="text-on-img mt-2 text-sm opacity-95">
          あなたの電気・ガス使用量、CO₂削減状況を一目で確認。
        </p>
      </div>
    </section>
  );
}