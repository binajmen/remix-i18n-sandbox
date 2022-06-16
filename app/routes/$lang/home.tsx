import { LoaderFunction, json } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import i18next from "~/i18next.server";
import { useTranslation } from "react-i18next";

type LoaderData = { locale: string };

export let loader: LoaderFunction = async ({ request }) => {
  let locale = await i18next.getLocale(request);
  return json<LoaderData>({ locale });
};

export default function Index() {
  let { t } = useTranslation();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>{t("greeting")}</h1>
      <div className="flex flex-col gap-2">
        <Link to="book-1">Book 1</Link>
        <Link to="book-2">Book 2</Link>
      </div>
      <Outlet />
    </div>
  );
}
