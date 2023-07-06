import "focus-visible";
import "@/styles/tailwind.css";
import "@/styles/main.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function pageView(
  { title, location, path, sendPageView, userId } = {},
  measurementId
) {
  const gaMeasurementId = measurementId;

  if (!gaMeasurementId || !window.gtag) {
    return;
  }

  const pageViewOptions = {};

  if (title !== undefined) {
    pageViewOptions.page_title = title;
  }

  if (location !== undefined) {
    pageViewOptions.page_location = location;
  }

  if (path !== undefined) {
    pageViewOptions.page_path = path;
  }

  if (sendPageView !== undefined) {
    pageViewOptions.send_page_view = sendPageView;
  }

  if (userId !== undefined) {
    pageViewOptions.user_id = userId;
  }

  window.gtag("config", gaMeasurementId, pageViewOptions);
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      const _gaMeasurementId = "UA-78521065-2";

      pageView({ path: url.toString() }, _gaMeasurementId);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
}
