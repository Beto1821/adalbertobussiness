import Script from "next/script";

export function Analytics() {
  const gtagId = process.env.NEXT_PUBLIC_GTAG_ID;
  if (!gtagId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(gtagId)});
        `}
      </Script>
    </>
  );
}
